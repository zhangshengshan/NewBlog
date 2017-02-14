---
title: ScalaList
date: 2016-07-26 13:11:12
tags: Scala
---
Lists are not built in in Scala; they are defined by an abstract class List, **which comes with two subclasses for :: and Nil.**
List 并不是Scala的内置类型。List被定义为抽象类。

```
    package scala
    abstract class List[+A] {
```
List is an abstract class, so one cannot define elements by calling the empty List constructor (e.g. by new List). The class has a type parameter a. It is co-variant in this parameter,which means thatList[S] <: List[T] for all types S and T such thatS <: T.The class is situated in the package scala.This is a package containing the most important standard classes of Scala. List defines a number of methods, which are explained in the following.
List 是抽象类，所以没有办法通过空的List构造器来定义元素。List存在一个类型参数A。该参数是协变类型, 对于任意类型S和T，如果S<:T, 则 List[S]<:List[T]。该类的定义在scala package中。这个包是Scala中最重要的标准calsses。
