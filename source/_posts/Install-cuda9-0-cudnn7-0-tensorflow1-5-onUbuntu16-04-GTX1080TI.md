---
title: Install_cuda9.0_cudnn7.0_tensorflow1.5_onUbuntu16.04_GTX1080TI
date: 2018-02-13 11:15:49
tags: Tensorflow
---
# How to install tensorflow1.5 on Ubuntu16.04 with support of cuda9.0 and cudnn7.0 

## 1安装文档阅读
安装tensorflow首先要登陆tensorflow的官方文档，阅读对应的指导文档[Install On Ubuntu](https://www.tensorflow.org/install/install_linux)
![安装文档图片](/myimages/WX20180213-143853.png)
**注意由于文档上面写的是9.0版本，目前nvidia官方的Cuda版本为9.1，最好是采用和tensorflow文档对应的9.0版本，太新的版本可能存在各种未知的问题，在实际安装的过程中，笔者最开始选择9.1版本，遇到各种问题，最终选择和官网一致的版本得以解决。**

## 2按照文档安装Cuda9.0

![Cuda安装文档](/myimages/WX20180213-145246.png)
**在实际安装过程中，遇到了gcc版本太高的报错，后来仔细对照了图中的系统需要发现，经过验证的版本是Kernel4.4 和gcc-4.3.1, 我解决的方案是下载gcc源代码自行安装，源码安装gcc 的过程可以参照网上参考资料和gcc官方文档，在此不再赘述**
![安装过程](/myimages/WX20180213-150211.png)
**图片中截图安装前后都需要进行一定的验证操作，过程请参照官方文档，这里不再赘述**

## 安装cudnn
首先要注意下载正确的版本的cudnn, **[Download cuDNN v7.0.5 (Dec 5, 2017), for CUDA 9.0](https://developer.nvidia.com/rdp/cudnn-download#a-collapse705-9)**,然后选择阅读对应的安装文档[cuDNN Install Guide](http://developer2.download.nvidia.com/compute/machine-learning/cudnn/secure/v7.0.5/prod/Doc/cuDNN-Installation-Guide.pdf?qO7ppZ7ZUZxNrI9KhtEHSndOL-IiLg4UwcWdFcYc2D2AYPJLJha2jvJp7bJO-Dl4Xa3ONYIKhWtLIHTbyr4tfoXndb53sK7SMtODAEwQlZgbYRsPE3wb2qwAGZH6E1fVW6CO1qeO2u_tZTLKe1zKbRCc10Gi8WpCaeyIlGPhLFuHI0qc8uX2eyEaGwVZfAaFkA)
![Download cuDNN](/myimages/WX20180214-095916.png)
![Install&Verify](/myimages/WX20180214-100208.png)

## 安装tensorflow 
之前有过从源码安装Tensorflow的精力，比较复杂，问题比较多，所以不太建议大家选择这种方式，笔者偏好使用Anaconda进行Python开发环境的管理，所以这里讲述Anaconda安装的过程，主要参照Tensorflow安装的官方文档，这里截取出安装tensorflow 的关键步骤。 Ubuntu上安装Anaconda的过程比较简单，不再赘述。
```
#首先创建python3.5的环境
conda create -n tensorflow pip python=3.5
#激活环境
source activate tensorflow
#安装支持GPU的Tensorflow1.5版本
pip install --ignore-installed https://storage.googleapis.com/tensorflow/linux/gpu/tensorflow_gpu-1.5.0-cp35-cp35m-linux_x86_64.whl
```
在安装过程中可能会报错，提示缺少某些python的安装包，此时根据提示信息，安装相应的安装包即可。
在安装完成以后需要验证是否正确安装，在python Shell中输入如下指令即可
```
# Python
import tensorflow as tf
hello = tf.constant('Hello, TensorFlow!')
sess = tf.Session()
print(sess.run(hello))
```
## 遇到的问题
在我安装的过程中，遇到了很多问题，现在简单整理一下，并且给出简单的解决思路。
1.  安装cuda以后，运行nvidia-smi指令包Library和Driver的冲突错误，解决这个问题，可以先重启电脑，观察是否能够自动解决，如果不能的话，输入dmesg观察一下内核在加载nvidia驱动的时候报错的信息，一般来讲是nvidia客户端和内核驱动的版本不兼容导致的。此时可以删除其中的一个版本在进行观察。 如果还是不能成功的话，建议彻底清除nvidia/cuda/cudnn相关的安装包，可以通过输入指令```sudo apt-get purge nvidia* cuda* libcudnn``` 指令完成，然后重新 操作一遍
2.  在编译cuda或者cudnn 示例代码验证安装的时候，可能会报错，如果是gcc版本的问题，那么可以通过源码编译并且安装对应版本的gcc来解决，如果是缺少某些库的问题，很大的可能性是LD_LIBRARY_PATH这个环境变量没有正确设置，注意仔细阅读以下cuda和cudnn文档中关于LD_LIBRARY_PATH的配置描述和要求。重新配置一下。

## 总结
配置环境类的操作在网上总是能够找到很多的资料，但是有些的版本和当前的相比有比较大的差别，因此照搬别人的经验未必会成功。最关键的是阅读官方文档，仔细阅读官方文档可以避免走弯路，遇到问题google或者stackOverflow上面的答案质量往往比较高。

## TODOs
整个安装过程参考了网上很多文章和帖子，在此表示感谢，由于实际安装的过程中没有保留相关的链接地址，所以在此表示感谢，后续会抽时间将部分了链接添加在这里。


