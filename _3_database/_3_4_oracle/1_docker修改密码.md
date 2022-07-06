#Docker 修改数据库密码


### 第一步：进入容器
>docker exec -it [container id] /bin/bash

### 第二步：执行 `sqlplus`，以管理员身份无密码登录

>sqlplus / as sysdba

ps:需要Linux root账号 ，如果无法登录，可以登录root后进入
>su root
> 
> su - oracle

### 第三步：执行修改密码
>alter user sys identified by [newpassword];

如果用户被锁，解锁的话执行 alter；
>alter user [username] account unlock

>commit;
