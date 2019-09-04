---
title: JVMGC
date: 2018-07-25 20:40:48
tags: JVM,GC
---
# JVM GC 
## OopMap 数据结构的作用是什么？
HotSpot 采用OopMap 来记录引用位置，在OopMap 的帮助下，HotSpot 可以快速的完成GC Roots枚举。

## safePoint 是什么？
safePoint 是修改OopMap 的位置。GC线程设置标志，各个线程执行时候轮训这个标志，发现这个标志的时候，就自行挂起。 

## 各种收集器
-   Serial GC 默认方案，适合单CPU场景。 
-   Serial OLD 是CMS方案的Failure备用方案。
-   parNew GC 适合多CPU机器以及和CMS 老年代回收配合使用。
-   CMS 目的是短回收停顿。
-   Parallel Scavenge 关注新生代的吞吐量
-   Parallel OLD 配合Parallel Scavenge一起使用, 关注吞吐量。 

## CMS 四个阶段
- 初始标记 标记一下GC ROOTS直接关联的对象 在此阶段会进行STW。
- 并发标记 在初始标记的基础之上 进行并发地Tracing。
- 重新标记 修正在并发标记阶段用户程序继续进行阶段导致的变动的对象的记录 在此阶段将会进行STW。
- 并发清除 基于标记-清除算法进行回收。 

## CMS垃圾收集的特点
CPU敏感
Concurrent Mode Failure 
每隔一段时间会一次Full GC  整理内存的碎片。 

## Concurrent Mode Failure 是什么？
CMS有可能有垃圾在垃圾标记阶段产生或者在垃圾清理阶段产生，因此正常情况下这部分垃圾会留待下一次的GC过程清理掉。 如果此时不能为这部分垃圾分配空间，那么可能将会产生该Concurrent Mode Failure, 此时将会弃用Serial OLD收集器来进行垃圾回收。 

## G1 垃圾回收特点
- 充分利用并发，虽然也有STW
- 仍然分代，但是以Region为单位，物理不连续。 
- 整体上是标记整理，局部上看是复制算法。 
- 停顿可预测。避免每次回收堆的整体的空间，可以每一个Region的垃圾回收价值的大小。 


## Remember Set 作用
每一个Region  对应一个Remember Set. 在对Reference 类型的数据进行读写的时候， JVM会中断写操作， 在被应用对象的Region 的对象的RSet中记录上和他有关系的其他的Region信息。 这样在GCroots标记的时候，避免整个堆的扫描。


## 类加载器泄露导致OutOfMemory异常
- 如果一个类加载器内存泄露了，那么它会占用它加载的所有类和它们所有的静态域。静态域通常含有缓存、单例对象和不同的配置以及应用程序状态。即使你的应用程序没有一些大的静态缓存，这也不意味着你使用的框架不占用着它们（如Log4J是一种常见的罪魁祸首,因为它通常是放在服务器类路径中)。这就说明了为什么加载器泄露的代价会很大。


