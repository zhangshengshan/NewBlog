---
title: LearningFlink
date: 2017-01-07 14:07:30
tags: Flink
---
# Flink 

Flink 处理有界和无界数据源需要采用不同的Api, 对应关系见下表格

|DataSource      |ApiType        |
|-------------|-------------|
|bounded source|DataSet Api|
|unbounded source|DataStream Api|


# create sbt project

```
    mvn archetype:generate  -DarchetypeGroupId=org.apache.flink  -DarchetypeArtifactId=flink-quickstart-scala  -DarchetypeVersion=1.1.3
```

## Data Sink 

if Data Sink operation is defined, then env.execute is needed 




