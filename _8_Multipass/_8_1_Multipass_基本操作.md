#MultiPass 基本使用

### MultiPass 安装和检查

```
项目地址：https://multipass.run
```

### 检查是否安装成功
打开控制台执行`multipass`指令
```
Usage: multipass [options] <command>
Create, control and connect to Ubuntu instances.

This is a command line utility for multipass, a
service that manages Ubuntu instances.

Options:
  -h, --help     Displays help on commandline options.
  --help-all     Displays help including Qt specific options.
  -v, --verbose  Increase logging verbosity. Repeat the 'v' in the short option
                 for more detail. Maximum verbosity is obtained with 4 (or more)
                 v's, i.e. -vvvv.

Available commands:
  alias         Create an alias
  aliases       List available aliases
  authenticate  Authenticate client
  delete        Delete instances
  exec          Run a command on an instance
  find          Display available images to create instances from
  get           Get a configuration setting
  help          Display help about a command
  info          Display information about instances
  launch        Create and start an Ubuntu instance
  list          List all available instances
  mount         Mount a local directory in the instance
  networks      List available network interfaces
  purge         Purge all deleted instances permanently
  recover       Recover deleted instances
  restart       Restart instances
  set           Set a configuration setting
  shell         Open a shell on a running instance
  start         Start instances
  stop          Stop running instances
  suspend       Suspend running instances
  transfer      Transfer files between the host and instances
  umount        Unmount a directory from an instance
  unalias       Remove an alias
  version       Show version details
```

### 查看哪些可用的镜像

```
multipass find
```

``` 
Image                       Aliases           Version          Description
18.04                       bionic            20220615         Ubuntu 18.04 LTS
20.04                       focal,lts         20220615         Ubuntu 20.04 LTS
21.10                       impish            20220616         Ubuntu 21.10
22.04                       jammy             20220622         Ubuntu 22.04 LTS
anbox-cloud-appliance                         latest           Anbox Cloud Appliance
charm-dev                                     latest           A development and testing environment for charmers
docker                                        latest           A Docker environment with Portainer and related tools
minikube                                      latest           minikube is local Kubernetes
```

### 启动一个`Ubuntu 22.04 LTS`镜像的实例

``` 
multipass launch jammy
```

### 查看本地实例
``` 
multipass list
```

### 在实例执行命令

```
multipass exec [instance name] -- [command]

multipass exec celestial-saury -- lsb_release -a
```

### 启动和停止实例

```
multipass [start/stop] [instance name] 
```

### 删除/恢复/清空 实例

```
multipass delete [instance name]

multipass recover [instalce name]

multipass purge
```

### 自定义实例配置

```
默认配置： named primary, with 1GB of RAM, 5GB of disk, and 1 CPU
自定义配置： multipass launch lts --name ltsInstance --mem 2G --disk 10G --cpus 2
示例：multipass launch jammy --name u0 --mem 2G --disk 10G --cpus 2
```

### 进入实例

```
multipass shell [instance]
```

### 运行`Docker`实例

```
multipass launch docker --name docker0
```


### 更多文档

```
https://multipass.run/docs
```
