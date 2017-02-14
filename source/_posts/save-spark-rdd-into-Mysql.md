---
title: save spark rdd into Mysql
date: 2016-12-05 22:12:19
tags:
---

```
import java.util.Properties
val target_df = targetRdd.toDF()
val prop = new Properties()
prop.put("user", "username")
prop.put("password", "password")
ret_df.write.mode("append").jdbc("jdbc:mysql://host:port/database","table",prop)
```

