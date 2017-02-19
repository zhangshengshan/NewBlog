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


### source code
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

## 采用兼容API的EchoServer
```

```

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
