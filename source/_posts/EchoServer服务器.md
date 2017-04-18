---
title: EchoServer服务器
date: 2017-02-15 12:03:06
tags: Socket
categories: C/C++
toc: true
---

# EchoServer服务器设计
## 提纲

-   最简单的EchoServer
-   采用兼容API的EchoServer
-   并发服务器设计之多进程模型
-   并发服务器设计之多线程模型
-   并发服务器设计之IO多路复用模型

## 最简单的EchoServer
### socket 
```
#include <sys/socket.h>
int socket(int domain, int type, int protocol);
Returns file descriptor on success, or –1 on error
```

domain 可以是AF_UNIX、AF_INET、AF_INET6中的一种，分别表示通过内核、IPV4连接的主机、IPV6连接的主机进行通讯，Unix域(AF_INET)只能在相同的主机上进行通讯。上面各种域对这样不同的地址结构。
type 可以是SOCK_STREAM、SOCK_DGRAM或者SOCK_RAW中的一种。

### bind

```
#include <sys/socket.h>
int bind(int sockfd, const struct sockaddr *addr, socklen_t addrlen);
Returns 0 on success, or –1 on error
```
sockfd是通过socket调用创建的socket文件描述符， struct sockaddr 是通用地址结构，因为socket()中创建的域类型可能有不同的种类，这里需要能够接受不同的地址类型比如(sockaddr_un,sockaddr_in,sockaddr_in6)。


### listen
流式的SOCKET分为主动被动两种，简单来讲connect操作的SOCKET成为主动的大家，而通过listen操作的SOCKET可以被动的接入。
```
nclude <sys/socket.h>
int listen(int sockfd, int backlog);
Returns 0 on success, or –1 on error
```
backlog 的主要作用是控制内核记录未决连接的数量。**未决连接**是客户端已经发生connect操作，但是服务端因为忙于其他处理而尚未accept操作。

### accept
```
#include <sys/socket.h>
int accept(int sockfd, struct sockaddr *addr, socklen_t *addrlen);
Returns file descriptor on success, or –1 on error
```

accept系统调用会接受一个接入连接，如果在调用accept()时候不存在未决连接，那么则该调用会阻塞到有连接请求为止。


### 最简单EchoServer服务器的示例代码 

```
#include <sys/types.h>
#include <sys/socket.h>
#include <stdio.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <string.h>
#include <stdlib.h>
#include <fcntl.h>
#include <sys/shm.h>

#define MYPORT  8887
#define QUEUE   20
#define BUFFER_SIZE 1024

int main()
{
    ///定义sockfd
    int server_sockfd = socket(AF_INET,SOCK_STREAM, 0);
    ///定义sockaddr_in
    struct sockaddr_in server_sockaddr;
    server_sockaddr.sin_family = AF_INET;
    server_sockaddr.sin_port = htons(MYPORT);
    server_sockaddr.sin_addr.s_addr = htonl(INADDR_ANY);
    ///bind，成功返回0，出错返回-1
    if(bind(server_sockfd,(struct sockaddr *)&server_sockaddr,sizeof(server_sockaddr))==-1)
    {
        perror("bind");
        exit(1);
    }
    ///listen，成功返回0，出错返回-1
    if(listen(server_sockfd,QUEUE) == -1)
    {
        perror("listen");
        exit(1);
    }
    ///客户端套接字
    char buffer[BUFFER_SIZE];
    struct sockaddr_in client_addr;
    socklen_t length = sizeof(client_addr);
    ///成功返回非负描述字，出错返回-1
    int conn = accept(server_sockfd, (struct sockaddr*)&client_addr, &length);
    if(conn<0)
    {
        perror("connect");
        exit(1);
    }
    while(1)
    {
        memset(buffer,0,sizeof(buffer));
        int len = recv(conn, buffer, sizeof(buffer),0);
        if(strcmp(buffer,"exit\n")==0)
            break;
        fputs(buffer, stdout);
        send(conn, buffer, len, 0);
    }
    close(conn);
    close(server_sockfd);
    return 0;
}
```

## 稍微复杂一点的EchoServer

网上大部分的网络编程服务器教程或者文章给出的最简单的示例，基本上都和上面的代码差不多。上面的代码可以进一步完善。这些改进主要是采用名称来替代IP地址和端口号。（下面的代码，来自于《Linux/Unix系统编程手册》）。
```
#define _BSD_SOURCE             /* To get definitions of NI_MAXHOST and NI_MAXSERV from <netdb.h> */
#include <netdb.h>
#include "is_seqnum.h"
#define BACKLOG 50
int main(int argc, char *argv[])
{
    uint32_t seqNum;
    char reqLenStr[INT_LEN];            /* Length of requested sequence */
    char seqNumStr[INT_LEN];            /* Start of granted sequence */
    struct sockaddr_storage claddr;
    int lfd, cfd, optval, reqLen;
    socklen_t addrlen;
    struct addrinfo hints;
    struct addrinfo *result, *rp;
#define ADDRSTRLEN (NI_MAXHOST + NI_MAXSERV + 10)
    char addrStr[ADDRSTRLEN];
    char host[NI_MAXHOST];
    char service[NI_MAXSERV];

    if (argc > 1 && strcmp(argv[1], "--help") == 0)
        usageErr("%s [init-seq-num]\n", argv[0]);

    seqNum = (argc > 1) ? getInt(argv[1], 0, "init-seq-num") : 0;

    /* Ignore the SIGPIPE signal, so that we find out about broken connection errors via a failure from write(). */

    if (signal(SIGPIPE, SIG_IGN) == SIG_ERR)    errExit("signal");

    /* Call getaddrinfo() to obtain a list of addresses that we can try binding to */

    memset(&hints, 0, sizeof(struct addrinfo));
    hints.ai_canonname = NULL;
    hints.ai_addr = NULL;
    hints.ai_next = NULL;
    hints.ai_socktype = SOCK_STREAM;
    hints.ai_family = AF_UNSPEC;        /* Allows IPv4 or IPv6 */
    // 这里指定了AI_PASSIVE 创建的socket会被绑定在通配地址上, 结果就是当服务程序运行在多宿主机的情况下
    // ，服务器可以处理发送到任意一个网络地址的请求。
    hints.ai_flags = AI_PASSIVE | AI_NUMERICSERV;
                        /* Wildcard IP address; service name is numeric */

    if (getaddrinfo(NULL, PORT_NUM, &hints, &result) != 0)
        errExit("getaddrinfo");

    /* Walk through returned list until we find an address structure
       that can be used to successfully create and bind a socket */

    optval = 1;
    for (rp = result; rp != NULL; rp = rp->ai_next) {
        lfd = socket(rp->ai_family, rp->ai_socktype, rp->ai_protocol);
        if (lfd == -1)
            continue;                   /* On error, try next address */

        if (setsockopt(lfd, SOL_SOCKET, SO_REUSEADDR, &optval, sizeof(optval))
                == -1)
             errExit("setsockopt");

        if (bind(lfd, rp->ai_addr, rp->ai_addrlen) == 0)
            break;                      /* Success */

        /* bind() failed: close this socket and try next address */
        close(lfd);
    }

    if (rp == NULL)
        fatal("Could not bind socket to any address");

    if (listen(lfd, BACKLOG) == -1)
        errExit("listen");

    /* freeaddrinfo的作用是释放getaddrinfo为result动态分配的内存 */
    freeaddrinfo(result);

    for (;;) {                  /* Handle clients iteratively */

        /* Accept a client connection, obtaining client's address */

        addrlen = sizeof(struct sockaddr_storage);
        cfd = accept(lfd, (struct sockaddr *) &claddr, &addrlen);
        if (cfd == -1) {
            errMsg("accept");
            continue;
        }

        if (getnameinfo((struct sockaddr *) &claddr, addrlen,
                    host, NI_MAXHOST, service, NI_MAXSERV, 0) == 0)
            snprintf(addrStr, ADDRSTRLEN, "(%s, %s)", host, service);
        else
            snprintf(addrStr, ADDRSTRLEN, "(?UNKNOWN?)");
        printf("Connection from %s\n", addrStr);

        /* Read client request, send sequence number back */

        if (readLine(cfd, reqLenStr, INT_LEN) <= 0) {
            close(cfd);
            continue;                   /* Failed read; skip request */
        }

        reqLen = atoi(reqLenStr);
        if (reqLen <= 0) {              /* Watch for misbehaving clients */
            close(cfd);
            continue;                   /* Bad request; skip it */
        }

        snprintf(seqNumStr, INT_LEN, "%d\n", seqNum);
        if (write(cfd, seqNumStr, strlen(seqNumStr)) != strlen(seqNumStr))
            fprintf(stderr, "Error on write");

        seqNum += reqLen;               /* Update sequence number */

        if (close(cfd) == -1)           /* Close connection */
            errMsg("close");
    }
}
```

### getaddrinfo系统调用解析

```
#include <sys/socket.h>
#include <netdb.h>
int getaddrinfo(const char *host, const char *service,
const struct addrinfo *hints, struct addrinfo **result);
Returns 0 on success, or nonzero on error
```
-   host可以是主机名称或者字符串形式的IP地址
-   service可以是服务名称或者端口号
-   hints参数规定了result参数返回的socket地址的标准。
-   result参数是getaddrinfo自动分配的addrinfo链表。

```
    struct addrinfo {
    int ai_flags; /* Input flags (AI_* constants) */
    int ai_family; /* Address family */
    int ai_socktype; /* Type: SOCK_STREAM, SOCK_DGRAM */
    int ai_protocol; /* Socket protocol */
    size_t ai_addrlen; /* Size of structure pointed to by ai_addr */
    char *ai_canonname; /* Canonical name of host */
    struct sockaddr *ai_addr; /* Pointer to socket address structure */
    struct addrinfo *ai_next; /* Next structure in linked list */
    };
```

hints参数只能设置 ai_flags，ai_family, ai_socktype, ai_protocol四个字段。hints.ai_family可以指定AF_INET或者AF_INET6, 或者设置为AF_UNSPEC. hints.ai_socktype指定socket类型，可以为SOCK_STREAM或者SOCK_DGRAM，如果设置为0则表示可以接受任何类型的socket. hints.ai_flags控制getaddrinfo的行为。AI_PASSIVE表示返回被动方式的地址结构。此时host设置为NULL，通过result返回的socket地址结构将会包含通配IP地址（即INADDR_DAY或者IN6ADDR_ANY_INIT）。如果没有设置AI_PASSIVE则返回的地址结构将会将可以被用为connect() 和sendto()。

SO_REUSEADDR 是TCP服务器一般情况下都要设置这个选项。这里仅仅关注其最简单的一种用途：避免当服务器重启的时候，尝试将套接字关联在当前TCP节点相关联的端口上的时候出现EADDRRINUSE（地址已使用）的错误。







##  并发服务器设计之多进程模型
```

```
##  并发服务器设计之多线程模型
```

```
##  并发服务器设计之其他模型(异步IO/协程模型)
```

```
##  其他
```

```
