---
title: Scala call-by-name call-by-value
date: 2016-07-19 23:30:34
tags: Scala
---
Call-by-value has the advantage that it avoids repeated evaluation of arguments.
Call-by-name has the advantage that it avoids evaluation of arguments when the
parameter is not used at all by the function. Call-by-value is usually more efficient
than call-by-name, but a call-by-value evaluation might loop where a call-by-name
evaluation would terminate. Consider:

Call-by-value 的优势在于避免不断的计算参数。而call-by-name的优势在于如果一个函数根本就不会用到的参数，那么也不会被计算，与call-by-value恰好相反。下面的例子展示了一个Call-by-value会不停循环但是Call-by-name会停止的例子。

```
scala> def loop: Int = loop
loop: Int
scala> def first(x: Int, y: Int) = x
first: (Int,Int)Int
```
Then first(1, loop) reduces with call-by-name to 1, whereas the same term reduces with call-by-value repeatedly to itself, hence evaluation does not terminate.
first(1, loop)
→ first(1, loop)
→ first(1, loop)
→ ...
上面的例子，之所以不停的循环的原因就是,y 被声明为 Call-by-value，因而，按照上面的说法，无论是否这个参数会被用到，该参数都会被计算，所以会不停的循环。

Scala uses call-by-value by default, but it switches to call-by-name evaluation if the
parameter type is preceded by =>.
```
scala> def constOne(x: Int, y: => Int) = 1
constOne: (Int,=> Int)Int
scala> constOne(1, loop)
unnamed0: Int = 1
scala> constOne(loop, 2) // gives an infinite loop.
```


constOne(1,loop) 会停止，y被声明为Call-by-name, 所以当没有用到这个参数的时候,则不会被计算，因此不会陷入无限循环。
constOne(loop,2) 则恰好相反。




本文示例 来自于  《ScalaByExample》,感谢原作者。



