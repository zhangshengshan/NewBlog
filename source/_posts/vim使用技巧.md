---
title: vim使用技巧
date: 2016-12-22 00:10:50
tags: VIM
categories: VIM
toc: true
---


## dbext
在命令式中输入如下指令，比如DBCompleteTables可以在vim的dictionary中存储当前数据库的表格名称。
```
DBCompleteTables
DBCompleteProcedures
DBCompleteViews
```
此时在vim中输入表格名称时候可以通过ctrl+x 和 ctrl+k 来实现自动不全表名称的功能。

```
\slc
```
在table_name 上面停留光标然后执行\slc则可以获取到这个表格的各个字段名称, 按p则可粘贴

```
**\sh**
```
查看执行的历史，在ResultBuffer中输入Enter则执行该命令





