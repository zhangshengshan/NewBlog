---
title: JavaComments
date: 2019-09-24 17:43:03
tags:
---
# JAVA COMMENTS TEMPLATES 

```
/**
 * @description $description$
   $params$
 * @author zhangshengshan
 * @date $date$
 * @return $return$
 */
```

```
groovyScript("def result=''; def params=\"${_1}\".replaceAll('[\\\\[|\\\\]|\\\\s]', '').split(',').toList(); for(i = 0; i < params.size(); i++) {result+='\t* @param ' + params[i] + ((i < params.size() - 1) ? '\\n ' : '')}; return result", methodParameters())  
```
