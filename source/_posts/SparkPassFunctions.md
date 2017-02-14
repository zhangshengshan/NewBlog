---
title: SparkPassFunctions
date: 2016-08-11 15:19:37
tags: Spark
---



```
    class MyClass {
      val field = "Hello"
      def doStuff(rdd: RDD[String]): RDD[String] = {
      val field_ = this.field
      rdd.map(x => field_ + x)}
    }
```
