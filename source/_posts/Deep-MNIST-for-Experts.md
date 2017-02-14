---
title: Deep MNIST for Experts
date: 2017-01-04 23:30:16
tags: tensorflow
---


```

from tensorflow.examples.tutorials.mnist import input_data
mnist = input_data.read_data_sets('MNIST_data', one_hot=True)

import tensorflow as tf
sess = tf.InteractiveSession()


#None 表示这里可能存在很多个样本, 784=28*28表示共有784个像素点
#y_表示与x对应的label, 由于采用的是one_hot编码的所以是10维
x = tf.placeholder(tf.float32, shape=[None, 784])
y_ = tf.placeholder(tf.float32, shape=[None, 10])


W = tf.Variable(tf.zeros([784,10]))
b = tf.Variable(tf.zeros([10]))


sess.run(tf.global_variables_initializer())
# 假设 有X个样本，那么 (X*784) * (784*10) = (X*10) 
y = tf.matmul(x,W) + b


cross_entropy = tf.reduce_mean(tf.nn.softmax_cross_entropy_with_logits(y, y_))

```
