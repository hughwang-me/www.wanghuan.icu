# Spring OAuth

### 一、版本

注意 spring boot版本、spring cloud版本、spring cloud alibaba 版本的匹配，不然无法匹配
以及nacos版本

``` 
        <spring-boot.version>2.3.12.RELEASE</spring-boot.version>
        <spring-cloud.version>Hoxton.SR12</spring-cloud.version>
        <spring-cloud-alibaba.version>2.2.6.RELEASE</spring-cloud-alibaba.version>
```

### 二、认证服务器 & 资源服务器



### 三、JWT & JKS Java KeyStore

### 生成 JKS Java KeyStore 文件

> keytool -genkeypair -alias xxx -keyalg RSA -keypass xxxxxx -keystore xxx.jks -storepass xxxxxx


### 导出公钥

> keytool -list -rfc --keystore xxx.jks | openssl x509 -inform pem -pubkey



