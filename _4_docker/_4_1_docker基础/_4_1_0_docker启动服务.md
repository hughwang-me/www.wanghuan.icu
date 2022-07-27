# Docker启动服务

## docker 部署redis

> docker run --restart=always -d -v /root/data/redis:/data --name redis -p 6379:6379 redis --requirepass "uwjx@pwd@2022" --appendonly yes


## docker 部署 emqx

> docker run --restart=always -d --name emqx -p 1883:1883 -p 8081:8081 -p 8083:8083 -p 8883:8883 -p 8084:8084 -p 18083:18083 emqx/emqx


## 常用指令

> docker exec 5b04fad681d3 ip a
> 
> docker run -d --name test1 busybox /bin/sh -c "while true; do sleep 3600; done"
