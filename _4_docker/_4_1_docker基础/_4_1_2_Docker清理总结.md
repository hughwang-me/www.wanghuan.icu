#Docker清理总结

### 删除容器或镜像

``` 
docker rm $(docker ps -aq)

docker rmi $(docker images | grep 'keyword' | awk '{print $1":"$2}')
```

### docker system prune

``` 
[root~]# docker system prune
WARNING! This will remove:
  - all stopped containers
  - all networks not used by at least one container
  - all dangling images[只删除没有标签的`images`]
  - all dangling build cache

Are you sure you want to continue? [y/N]
```

### docker system prune -a 
``` 
[root~]# docker system prune -a 
WARNING! This will remove:
  - all stopped containers
  - all networks not used by at least one container
  - all images without at least one container associated to them [会把没有用到的 `images` 都删除]
  - all build cache

Are you sure you want to continue? [y/N] y
```
