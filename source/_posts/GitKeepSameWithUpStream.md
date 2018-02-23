---
title: GitKeepSameWithUpStream
date: 2018-02-13 09:51:39
tags: git
---
# How to Keep same with upstream 


## Configuring a remote for a fork
check current remote repository
```
git remote -v
```

Specify a new remote upstream repository that will be synced with the fork.
```
git remote add upstream https://github.com/tensorflow/tensorflow.git
```

check again
```
git remote -v
```

```
git fetch upstream
git checkout master
git merge upstream/master
git push origin master
```
