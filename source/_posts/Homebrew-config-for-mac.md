---
title: Homebrew_config_for_mac
date: 2017-02-11 21:15:07
tags:
categories: Linux
toc: true
---



MAC 上面的brew速度非常慢，尝试如下方式可以加速homebrew安装软件的速度

```

cd "$(brew --repo)"
git remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git

cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git

brew update


```
