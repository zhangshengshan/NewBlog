---
title: Save DataFrame into a partitioned table of HIVE
date: 2016-08-19 17:15:15
tags: Spark
---


# How to save a spark DataFrame as a patitioned hive table #
## utilise saveAsTable method ##

```
    val conf = new SparkConf().setAppName("Simple Application").setMaster("local")
    val sc = new SparkContext(conf)
    val sqlContext = new org.apache.spark.sql.SQLContext(sc)
    import sqlContext.implicits._
    val hiveContext = new org.apache.spark.sql.hive.HiveContext(sc)
    hiveContext.sql("use database")

    val cmd =
      """
         select
          col1,
          col2
         from
          table
      """.stripMargin
    val yourDf = hiveContext.sql(cmd)
    yourDf.printSchema()
    yourDf.write.partitionBy("col2").saveAsTable("partitionTableName")
```




