---
title: SpringLearn
date: 2020-05-07 14:23:46
tags: Spring
---

## 手动构造XMLBeanFactory 

```
public static void main(String[] args) {
    ClassPathResource classPathResource = new ClassPathResource("spring.xml");
    XmlBeanFactory xmlBeanFactory = new XmlBeanFactory(classPathResource);
    Hello bean = xmlBeanFactory.getBean(Hello.class);
    bean.sayHello();
}
```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean id="myDao" class="com.example.restservice.impl.MyDaoImpl"/>
    <bean id="hello" class="com.example.restservice.mypojo.HelloImpl"/>
</beans>




```
org.springframework.context.support.FileSystemXmlApplicationContext#FileSystemXmlApplicationContext(java.lang.String[], boolean, org.springframework.context.ApplicationContext)
org.springframework.context.support.AbstractApplicationContext#refresh
```
