---
title: arthas技巧
date: 2020-06-03 22:54:19
tags:
---
如果有一些类比较复杂，那么有可能jad命令反编绎失败。那么后面的mc命令也会失败。

这时，可以在本地修改代码，然后把.class文件上传到服务器上。

有一些服务器的权限比较严格，不允许直接上传文件，那么可以用一些技巧来绕过。比如传用base64命令：

在本地先转换.class文件为base64，再保存为result.txt
base64 < Test.class > result.txt
到服务器上，新建result.txt，复制本地的内容，粘贴再保存

把服务器上的 result.txt还原为.class

base64 -d < result.txt > Test.class
用md5命令计算哈希值，校验是否一致


[arthas能排查启动过慢问题么](https://github.com/alibaba/arthas/issues/1096)
[线程池监控](https://github.com/alibaba/arthas/issues/100)
[需求：watch的输出是否可以加上线程名信息？](https://github.com/alibaba/arthas/issues/466)



