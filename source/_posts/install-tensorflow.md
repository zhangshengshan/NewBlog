---
title: install tensorflow
date: 2016-12-28 15:04:08
tags: tensorflow
---

anaconda 提供了python科学计算的环境，为各种python软件包安装和管理提供了遍历，按照官方文档的方式即可以安装tensorflow. 

## 创建tensorflow的虚拟环境
```
conda create -n tensorflow python=3.5
```

## 安装tensorflow 
```
$ source activate tensorflow
(tensorflow)$  # Your prompt should change

# Linux/Mac OS X, Python 2.7/3.4/3.5, CPU only:
(tensorflow)$ conda install -c conda-forge tensorflow
```

如果网络状况不好，那么可以采用pip安装。

```
$ source activate tensorflow
(tensorflow)$  # Your prompt should change
```

```
export TF_BINARY_URL=https://storage.googleapis.com/tensorflow/mac/cpu/tensorflow-0.12.0-py3-none-any.whl
```

**请注意这里不能采用pip3安装，因为anaconda环境中pip3安装是有问题的**
```
pip install --ignore-installed --upgrade $TF_BINARY_URL
```


## 测试是否安装成功

```
import tensorflow as tf
print(tf.__versioin__)
```



