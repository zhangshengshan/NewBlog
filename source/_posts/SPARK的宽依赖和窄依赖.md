---
title: SPARK的宽依赖和窄依赖
date: 2016-04-25 23:37:04
tags: Spark
---


spark 的各种不同的transformation操作,可以根据是否依赖父RDDs的所有partision分为‘窄依赖’和‘宽依赖’,简单的说,有shuffle操作的就是宽依赖,而没有shuffle操作的就是窄依赖。
对于窄依赖,spark会尽量将他们划分为同一个stage,而宽依赖则会称为另外的stage。

