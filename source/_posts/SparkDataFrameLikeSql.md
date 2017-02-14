---
title: SparkDataFrameLikeSql
date: 2016-12-09 16:11:00
tags: Spark DataFrame
---
The idea of spark Datafame may be inspired from dataframe of pandas which is a package of python for structure data processing. On my opinion, dataframe can by prefered by the people with BI(business intelligence) background for high development efficiency.

DataFrame in Spark could by registered as something which could be considered approximately as a virtual table, therefore anyone who has expierence of SQL could explore the data at quite a low cost of time.

This article will focus on some dataframe processing method without the help of registering a virtual table and executing SQL, however the corresponding SQL operations such as  SELECT, WHERE, GROUPBY, MIN, MAX, COUNT, SUM ,DISTINCT, ORDERBY, DESC/ASC, JOIN and GROUPBY TOP will be supplied for a better understanding of dataframe in spark.

## prepare test data

Firstly we make a DataFrame object a by reading a json file
```
val sc: SparkContext // An existing SparkContext.
val sqlContext = new org.apache.spark.sql.SQLContext(sc)
// this is used to implicitly convert an RDD to a DataFrame.
import sqlContext.implicits._
val a = sqlContext.read.json("people.json")
```
and the content of people.json is as below
```
{"name":"Michael" , "age":23 ,"depart":"A","salary":3000 }
{"name":"Dan"     , "age":23 ,"depart":"A","salary":3500 }
{"name":"Alex"    , "age":23 ,"depart":"A","salary":3600 }
{"name":"Ben"     , "age":23 ,"depart":"A","salary":3700 }
{"name":"Andy"    , "age":30 ,"depart":"B","salary":4000 }
{"name":"Justin"  , "age":19 ,"depart":"A","salary":5000 }
{"name":"Jack"    , "age":19 ,"depart":"B","salary":2000 }
```
let us image a as a Table which is stored in a RDS database such as MySQL.

## desc 

```
desc people;
```
```
scala> a.printSchema
root
|-- age: long (nullable = true)
|-- depart: string (nullable = true)
|-- name: string (nullable = true)
|-- salary: long (nullable = true)
```

## SELECT 
```
select name from people;
```

```
a.select("name").show
a.select($"name").show
a.select(a("name")).show
```
the three methods above are equivelent.

## WHERE
```
select name,age from people where age = 23
```
```
a.select("name", "age").where($"age"===23).show
a.select("name", "age").filter($"age"===23).show
```

## MIN,MAX,SUM,COUNT

```
select min(age), max(age), sum(salary), count(age) from people
```


```
a.select(min("age"),max("age"),sum("salary"),count("age")).show
a.agg(min("age"),max("age"),sum("salary"),count("age")).show
```
and the result is 
```

+--------+--------+-----------+----------+
|min(age)|max(age)|sum(salary)|count(age)|
+--------+--------+-----------+----------+
|      19|      30|      24800|         7|
+--------+--------+-----------+----------+

```

## COUNT DISTINCT

```
select count (distinct age) , count ( distinct name ) from people
```

```
a.select(count("age"),countDistinct("age")).show
a.agg(count("age"), countDistinct("name")).show
```
and the result is 
```
+-------------------+--------------------+
|count(DISTINCT age)|count(DISTINCT name)|
+-------------------+--------------------+
|                  7|                   3|
+-------------------+--------------------+
```


## ORDERBY desc
```
select * from people orderby age desc, name desc

```

```
a.sort($"age".desc,$"name".desc).show
```
```
+---+------+-------+------+
|age|depart|   name|salary|
+---+------+-------+------+
| 30|     B|   Andy|  4000|
| 23|     A|Michael|  3000|
| 23|     A|    Dan|  3500|
| 23|     A|    Ben|  3700|
| 23|     A|   Alex|  3600|
| 19|     A| Justin|  5000|
| 19|     B|   Jack|  2000|
+---+------+-------+------+
```


## inner join, left outer join and convert null to a default value 
first we make another dataframe based on a 
```
val c = a.filter(not ($"age"===23))

scala> c.show
+---+------+------+------+
|age|depart|  name|salary|
+---+------+------+------+
| 30|     B|  Andy|  4000|
| 19|     A|Justin|  5000|
| 19|     B|  Jack|  2000|
+---+------+------+------+

```
now we try to join a and c 

```
    select 
        a.age as a_age,
        if(c.age is null, 0, c.age) as c_age,
        a.depart as a_depart
    from 
        a
    left outer join
        c
    on 
        a.age = c.age
```
the cording dataframe form is 
```

scala> a.join(c,a("age")===c("age"),"left").select(a("age").alias("a_age"),c("age").alias("c_age"),a("depart").alias("a_depart")).na.fill(0,Seq("c_age")).show
+-----+-----+--------+
|a_age|c_age|a_depart|
+-----+-----+--------+
|   23|    0|       A|
|   23|    0|       A|
|   23|    0|       A|
|   23|    0|       A|
|   30|   30|       B|
|   19|   19|       A|
|   19|   19|       A|
|   19|   19|       B|
|   19|   19|       B|
+-----+-----+--------+

```
what if those records whose c.age is null is execluded 
```
select 
    a.age as a_age,
    if(c.age is null, 0, c.age) as c_age,
    a.depart as a_depart
from 
    a
left outer join
    c
on 
    a.age = c.age
where 
    c.age is not null
```
the na.drop method provided this function
```
scala> a.join(c,a("age")===c("age"),"left").select(a("age").alias("a_age"),c("age").alias("c_age"),a("depart").alias("a_depart")).na.drop.show
+-----+-----+--------+
|a_age|c_age|a_depart|
+-----+-----+--------+
|   30|   30|       B|
|   19|   19|       A|
|   19|   19|       A|
|   19|   19|       B|
|   19|   19|       B|
+-----+-----+--------+
```

## Top N for group 
use window operation can help 
```
import org.apache.spark.sql.expressions.Window
val w = Window.partitionBy($"depart")
import org.apache.spark.sql.expressions.Window
val rankAsc = row_number().over(w.orderBy($"salary")).alias("rank_asc")
val rankDesc = row_number().over(w.orderBy($"salary".desc)).alias("rank_desc")
```

```
scala> a.select($"*", rankAsc, rankDesc).filter($"rank_asc"<3 || $"rank_desc" >= 2).show
+---+------+-------+------+--------+---------+
|age|depart|   name|salary|rank_asc|rank_desc|
+---+------+-------+------+--------+---------+
| 30|     B|   Andy|  4000|       2|        1|
| 19|     B|   Jack|  2000|       1|        2|
| 23|     A|    Ben|  3700|       4|        2|
| 23|     A|   Alex|  3600|       3|        3|
| 23|     A|    Dan|  3500|       2|        4|
| 23|     A|Michael|  3000|       1|        5|
+---+------+-------+------+--------+---------+
scala> a.select($"*", rankAsc, rankDesc).filter($"rank_asc"<3 && $"rank_desc" >= 2).show
+---+------+-------+------+--------+---------+
|age|depart|   name|salary|rank_asc|rank_desc|
+---+------+-------+------+--------+---------+
| 19|     B|   Jack|  2000|       1|        2|
| 23|     A|    Dan|  3500|       2|        4|
| 23|     A|Michael|  3000|       1|        5|
+---+------+-------+------+--------+---------+
```
what's more, it is clearly ```select *``` in SQL could by implemented by ```select($"*")```
