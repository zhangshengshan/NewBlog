---
title: 1-100素数判断pyhon程序
date: 2016-04-21 18:08:04
tags: Python
---


求取1-100的所有素数，采用函数式编程
```python
def issu(x):
    result=map(lambda y:x%y,range(2,x))
    if  len(result)!=0 and 0 not in result:
        return 1
    else:
        return 0


print filter(issu,range(1,101))

```
答案为
**[3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]**
