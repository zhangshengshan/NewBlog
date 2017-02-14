---
title: MAC访问你DOCKER容器中的WEB页面
date: 2016-11-10 23:22:16
tags:
---



docker run -d -p hostport:dockerport --name your_container_name  your_image_name nginx -g "daemon off;"


the above instruction start a docker nginx application which bind is port dockerport to its host port hostport.
usually you can access the nginx service on your host environment by curl the hostport, however in MacOs, ths hostport here 
is the virtual machine. so when you curl localhost:hostport, you will get no response.


the right way is access the virtual machine responding port. so the ip of virtual machine is needed.

```
    docker-machine ip your_virtual_machine 
```


```
    curl the ip you get:hostport
```






