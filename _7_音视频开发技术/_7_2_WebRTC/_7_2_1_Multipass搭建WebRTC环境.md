#Multipass搭建WebRTC环境

### 创建`Multipass`实例

``` 
multipass launch jammy --name webrtc-android --mem 2G --disk 50G --cpus 2
```

### 安装`depot_tools`
```
git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git
```
