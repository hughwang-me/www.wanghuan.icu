# Docker数据迁移

### 说明
`/var/lib/docker` 目录是docker默认的数据目录

#### 第一步：停止`docker`服务
 
``` 
systemctl stop docker 
```

#### 第二步：创建新的数据目录

```
mkdir -p /mnt/dockerData
```

#### 第三步：迁移文件到新的数据目录
移动整个/var/lib/docker目录到数据盘的目的路径(没有rsync命令时需安装rsync)

这里迁移 `/var/lib/docker` 目录下面的文件到 `/mnt/dockerData`


> rsync -avzP /var/lib/docker /mnt/dockerData

``` 
参数解释：

-a，归档模式，表示递归传输并保持文件属性。
-v，显示rsync过程中详细信息。可以使用"-vvvv"获取更详细信息。
-P，显示文件传输的进度信息。(实际上"-P"="--partial --progress"，其中的"--progress"才是显示进度信息的)。
-z, 传输时进行压缩提高效率。
```

#### 第四步：修改`docker.service`配置
在EXECStart后面添加 `--graph=/mnt/dockerData/docker/`
> vim /usr/lib/systemd/system/docker.service

#### 第五步：重启docker
> systemctl daemon-reload
> systemctl start docker

