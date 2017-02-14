---
title: vim使用技巧
date: 2016-12-22 00:10:50
tags: VIM
---


## dbext
在命令式中输入如下指令，比如DBCompleteTables可以在vim的dictionary中存储当前数据库的表格名称。
```
DBCompleteTables
DBCompleteProcedures
DBCompleteViews
```
此时在vim中输入表格名称时候可以通过ctrl+x 和 ctrl+k 来实现自动不全表名称的功能。

