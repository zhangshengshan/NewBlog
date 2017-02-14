---
title: MergeSort
date: 2016-07-26 20:30:03
tags: Scala
---
归并排序

```
def msort[A](less: (A, A) => Boolean)(xs: List[A]): List[A] = { 
    def merge(xs1: List[A], xs2: List[A]): List[A] =
        if (xs1.isEmpty) xs2
        else if (xs2.isEmpty) xs1
        else if (less(xs1.head, xs2.head)) xs1.head :: merge(xs1.tail, xs2) else xs2.head :: merge(xs1, xs2.tail)
    val n = xs.length/2
    if (n == 0) xs
    else merge(msort(less)(xs take n), msort(less)(xs drop n))
}
```

如果你对python列表的用法比较熟悉的话，可以按照如下的方式理解

```
    xs take n   // xs[0:n+1]
    xs drop n   // xs[n+1:]
```

msort函数应该按照如下方式进行调用
```
msort((x: Int, y: Int) => x < y)(List(5, 7, 1, 3))
```
