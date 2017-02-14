---
title: Spark 2.0 Introduction
date: 2016-08-19 18:04:07
tags: Spark
---

# Spark 2.0 MLib Introduction #


As of Spark 2.0, the RDD-based APIs in the spark.mllib package have entered maintenance mode. The primary Machine Learning API for Spark is now the DataFrame-based API in the spark.ml package.

Spark2.0 ,在spark.mllib中的基于RDD的机器学习APIs将会进入维护模式。现在机器学习的主要的API基于DataFrame,位于spark.ml中。



What are the implications?

    MLlib will still support the RDD-based API in spark.mllib with bug fixes.
    MLlib will not add new features to the RDD-based API.
    In the Spark 2.x releases, MLlib will add features to the DataFrames-based API to reach feature parity with the RDD-based API.
    After reaching feature parity (roughly estimated for Spark 2.2), the RDD-based API will be deprecated.
    The RDD-based API is expected to be removed in Spark 3.0.


Why is MLlib switching to the DataFrame-based API?

    DataFrames provide a more user-friendly API than RDDs. The many benefits of DataFrames include Spark Datasources, SQL/DataFrame queries, Tungsten and Catalyst optimizations, and uniform APIs across languages.
    The DataFrame-based API for MLlib provides a uniform API across ML algorithms and across multiple languages.
    DataFrames facilitate practical ML Pipelines, particularly feature transformations. See the Pipelines guide for details.




