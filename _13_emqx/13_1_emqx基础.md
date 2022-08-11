# EMQX 基础

### 一、版本

 

### 二、安装

##### 2.1 Docker安装

1)获取docker镜像
>docker pull emqx/emqx:5.0.0

2）运行启动服务
>docker run --restart=always -d --name emqx -p 1883:1883 -p 8083:8083 -p 8883:8883 -p 8084:8084 -p 18083:18083 emqx/emqx:5.0.0

### 三、 认证

默认情况下，EMQX 将允许任何客户端连接，直到用户创建了认证器。认证器将根据客户端提供的认证信息对其进行身份验证，只有认证通过，客户端才能成功连接。

##### 3.1 MYSQL存储

1）新建表结构，并在后台配置好
``` 
CREATE TABLE `emqx_mqtt_user`
(
    `id`            int(11) unsigned NOT NULL AUTO_INCREMENT,
    `username`      varchar(100) DEFAULT NULL,
    `password_hash` varchar(100) DEFAULT NULL,
    `salt`          varchar(35)  DEFAULT NULL,
    `is_superuser`  tinyint(1)   DEFAULT 0,
    `created`       datetime     DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `mqtt_username` (`username`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;
```

2）添加用户
``` 
    @Test
    public void generateWithSlat(){
        String slat = "wanghuan";
        String password = "good@BOY@2022";
        String hash = Hashing.sha256().newHasher().putString(slat + password , StandardCharsets.UTF_8).hash().toString();
        log.warn("结果：{}" , hash);
        //09872faca250f87f123664ad67e0d78fb07ddbe3f4e5aac3048e970cd4bcebe6
    }
```

> INSERT INTO emqx_mqtt_user(username, password_hash, salt, is_superuser) VALUES ('wanghuan', '09872faca250f87f123664ad67e0d78fb07ddbe3f4e5aac3048e970cd4bcebe6', 'wanghuan', 1);

 
