# 2 个 NS 之间 PING 通 

 
## 一、ip netns

 
### 1.1 查看网络命名空间列表

> ip netns list

### 1.2 新增和删除网络命名空间
> ip netns add [name]

示例:
``` 
ubuntu@docker02:~$ sudo ip netns add ns1
ubuntu@docker02:~$ sudo ip netns list
ns1
ubuntu@docker02:~$ sudo ip netns add ns2
ubuntu@docker02:~$ sudo ip netns list
ns2
ns1
ubuntu@docker02:~$
```

> ip netns delete [name]

示例：
``` 
ubuntu@docker02:~$ sudo ip netns delete ns1
ubuntu@docker02:~$ sudo ip netns list
ns2
ubuntu@docker02:~$ 
```

### 1.3 查看单个网络命名空间信息

> ip netns exec [name] ip a

```` 
ubuntu@docker02:~$ sudo ip netns exec ns1 ip a
1: lo: <LOOPBACK> mtu 65536 qdisc noop state DOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
ubuntu@docker02:~$
````

## 二、2 个命名空间连接

<img src="/_10_Linux/images/img.png"   alt="LOGO" align=center>


通过 `veth` 将 2 个命名空间连接

### 2.1 查看本机的`link`状态

> ip link

示例：
``` 
ubuntu@docker02:~$ sudo ip link
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: enp0s1: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP mode DEFAULT group default qlen 1000
    link/ether 52:54:00:aa:19:c7 brd ff:ff:ff:ff:ff:ff
3: docker0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP mode DEFAULT group default 
    link/ether 02:42:20:49:e4:6f brd ff:ff:ff:ff:ff:ff
5: vethb70f0e4@if4: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master docker0 state UP mode DEFAULT group default 
    link/ether 52:b2:ce:3b:1c:72 brd ff:ff:ff:ff:ff:ff link-netnsid 0
ubuntu@docker02:~$
```

###  2.2 查看 NS 的 link 状态
> sudo ip netns exec [ns name] ip link

示例：
```
ubuntu@docker02:~$ sudo ip netns exec ns1 ip link
1: lo: <LOOPBACK> mtu 65536 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
ubuntu@docker02:~$ sudo ip netns exec ns2 ip link
1: lo: <LOOPBACK> mtu 65536 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
ubuntu@docker02:~$
```

###  2.3 新增一组 `veth` 后查看状态

> sudo ip link add [veth1 name] type veth peer name [veth2 name]

示例：
``` 
ubuntu@docker02:~$ sudo ip link add veth1 type veth peer name veth2
ubuntu@docker02:~$ sudo ip link
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: enp0s1: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP mode DEFAULT group default qlen 1000
    link/ether 52:54:00:aa:19:c7 brd ff:ff:ff:ff:ff:ff
3: docker0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP mode DEFAULT group default 
    link/ether 02:42:20:49:e4:6f brd ff:ff:ff:ff:ff:ff
5: vethb70f0e4@if4: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master docker0 state UP mode DEFAULT group default 
    link/ether 52:b2:ce:3b:1c:72 brd ff:ff:ff:ff:ff:ff link-netnsid 0
6: veth2@veth1: <BROADCAST,MULTICAST,M-DOWN> mtu 1500 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/ether 1a:f6:33:0e:2c:60 brd ff:ff:ff:ff:ff:ff
7: veth1@veth2: <BROADCAST,MULTICAST,M-DOWN> mtu 1500 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/ether 42:11:b4:9c:a6:00 brd ff:ff:ff:ff:ff:ff
ubuntu@docker02:~$ sudo ip netns exec ns1 ip link
1: lo: <LOOPBACK> mtu 65536 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
ubuntu@docker02:~$ sudo ip netns exec ns2 ip link
1: lo: <LOOPBACK> mtu 65536 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
ubuntu@docker02:~$ 
```

### 2.4 把 veth 添加到命名空间 并查看状态

> sudo ip link set [veth name] netns [ns name]

``` 
ubuntu@docker02:~$ sudo ip link set veth1 netns ns1
ubuntu@docker02:~$ sudo ip link set veth2 netns ns2
ubuntu@docker02:~$ sudo ip link
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: enp0s1: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP mode DEFAULT group default qlen 1000
    link/ether 52:54:00:aa:19:c7 brd ff:ff:ff:ff:ff:ff
3: docker0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP mode DEFAULT group default 
    link/ether 02:42:20:49:e4:6f brd ff:ff:ff:ff:ff:ff
5: vethb70f0e4@if4: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master docker0 state UP mode DEFAULT group default 
    link/ether 52:b2:ce:3b:1c:72 brd ff:ff:ff:ff:ff:ff link-netnsid 0
ubuntu@docker02:~$ sudo ip netns exec ns1 ip link
1: lo: <LOOPBACK> mtu 65536 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
7: veth1@if6: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/ether 42:11:b4:9c:a6:00 brd ff:ff:ff:ff:ff:ff link-netns ns2
ubuntu@docker02:~$ sudo ip netns exec ns2 ip link
1: lo: <LOOPBACK> mtu 65536 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
6: veth2@if7: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/ether 1a:f6:33:0e:2c:60 brd ff:ff:ff:ff:ff:ff link-netns ns1
ubuntu@docker02:~$
```
 
veth 已经不在本机link了，被添加到了 ns 中去了，这样就完了把新建的2个 veth 分别添加到2个命名空间


### 2.5 给命名空间分配IP地址

> sudo ip netns exec [na name] ip addr add 192.168.1.1/24 dev [veth name] 

示例：
``` 
ubuntu@docker02:~$ sudo ip netns exec ns1 ip addr add 192.168.1.1/24 dev veth1
ubuntu@docker02:~$ sudo ip netns exec ns2 ip addr add 192.168.1.2/24 dev veth2
ubuntu@docker02:~$ sudo ip netns exec ns1 ip link
1: lo: <LOOPBACK> mtu 65536 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
7: veth1@if6: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/ether 42:11:b4:9c:a6:00 brd ff:ff:ff:ff:ff:ff link-netns ns2
ubuntu@docker02:~$ sudo ip netns exec ns2 ip link
1: lo: <LOOPBACK> mtu 65536 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
6: veth2@if7: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/ether 1a:f6:33:0e:2c:60 brd ff:ff:ff:ff:ff:ff link-netns ns1
ubuntu@docker02:~$
```

### 2.6 启动 veth

> sudo ip netns exec [ns name] ip link set dev [veth name] up

``` 
ubuntu@docker02:~$ sudo ip netns exec ns1 ip link set dev veth1 up
ubuntu@docker02:~$ sudo ip netns exec ns2 ip link set dev veth2 up
ubuntu@docker02:~$ sudo ip netns exec ns1 ip link
1: lo: <LOOPBACK> mtu 65536 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
7: veth1@if6: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP mode DEFAULT group default qlen 1000
    link/ether 42:11:b4:9c:a6:00 brd ff:ff:ff:ff:ff:ff link-netns ns2
ubuntu@docker02:~$ sudo ip netns exec ns2 ip link
1: lo: <LOOPBACK> mtu 65536 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
6: veth2@if7: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP mode DEFAULT group default qlen 1000
    link/ether 1a:f6:33:0e:2c:60 brd ff:ff:ff:ff:ff:ff link-netns ns1
ubuntu@docker02:~$
```

启动后 veth 变成 UP 状态


### 2.7 两个 NS 之间可以 ping 通

> sudo ip netns exec ns1 ping 192.168.1.2
> 
> sudo ip netns exec ns2 ping 192.168.1.1

``` 
ubuntu@docker02:~$ sudo ip netns exec ns1 ping 192.168.1.2
PING 192.168.1.2 (192.168.1.2) 56(84) bytes of data.
64 bytes from 192.168.1.2: icmp_seq=1 ttl=64 time=0.226 ms
64 bytes from 192.168.1.2: icmp_seq=2 ttl=64 time=0.147 ms
64 bytes from 192.168.1.2: icmp_seq=3 ttl=64 time=0.177 ms
^C
--- 192.168.1.2 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2174ms
rtt min/avg/max/mdev = 0.147/0.183/0.226/0.032 ms
ubuntu@docker02:~$ sudo ip netns exec ns2 ping 192.168.1.1
PING 192.168.1.1 (192.168.1.1) 56(84) bytes of data.
64 bytes from 192.168.1.1: icmp_seq=1 ttl=64 time=0.044 ms
64 bytes from 192.168.1.1: icmp_seq=2 ttl=64 time=0.110 ms
64 bytes from 192.168.1.1: icmp_seq=3 ttl=64 time=0.079 ms
^C
--- 192.168.1.1 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2097ms
rtt min/avg/max/mdev = 0.044/0.077/0.110/0.026 ms
ubuntu@docker02:~$
```
