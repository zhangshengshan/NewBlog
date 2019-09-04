---
title: FpInScala读书笔记
date: 2019-07-10 12:43:42
tags: Scala
---
- FoldLeft和FoldRight有什么区别？
- 练习3.7怎么解？
- FoldRight 如何通过FoldLeft 来实现？
- 《聊聊什么是函数式》
- 《聊聊尾递归, 是不是所有的递归都可以转化为尾递归， 如果是怎么证明， 如果不是，怎么把可以转化为尾递归的递归操作转化为尾递归》
- 《聊聊Scala的Option》
- append two List
- append List[List]
- 如何把ZipWith 改成尾递归操作
- List hasSubSequence 如何设计
- 《聊聊Scala的型变》
- by name和by value什么区别？
- Scala为啥要定义Stream?
- 如何定义一个fib Stream
- monoid monad functor 有什么作用？
- foldRight By foldMap


## 随记

《Scala函数式编程》这本小红书写的真的是深奥，读起来比较难以理解， 同市面发行的大部分书籍相比（大部分关于Scala的书我几乎都买了一遍，而且阅读过一遍）明显不同。 本书主要关注的函数式思想的本身，对于语言特性几乎省略了笔墨， 显然不适合于初学者阅读， 比较适合有过Scala开发经验，且好于map filter foldLeft 这些算子背后的本源感兴趣的工程师阅读。

目前已经阅读了第一部分（1-6章）， 可以说第一到六章可以给读者建立一个直观的感受， 让读者在脑海里有一个印象， 什么是函数式编程，初步体味一些函数编程的优势， 比如模块化，可复用，避免副作用等。展示了 map flatMap等这种常见的算子背后的实现的方式。 

目前正在阅读第二部分， 第二部分可以看做是通过案例来介绍一下函数式编程的优势，在阅读的过程之中，已经稍微能够感受到点难度，不是很好理解。 

本书循序渐进，带领你抽丝剥茧，真神书也！




2019年 7月25日 星期四 22时11分57秒 CST
至此， 本神书已阅读完前3部分。第四部分暂时不再继续阅读下去， 打算重温一下基础知识。 欲速则不达。 


## Monoid Monad Functor 

-- Functor 就是定义一个可以在容器上进行map操作的接口的标准
-- 


[简练解释Functor Monoid Monad的含义的文章](https://blog.knoldus.com/monads-are-they-really-that-complicated/)
[另一篇参考](https://thedet.wordpress.com/2012/04/28/functors-monads-applicatives-can-be-so-simple/)
[Monad Slide](https://www.slideshare.net/knoldus/functors-applicatives-and-monads-in-scala)
[写给程序员的范畴轮](https://segmentfault.com/a/1190000003882331)
