## PostgreSQL Docker

#### 1.安装
>docker pull postgres

#### 2.运行

2.1 创建数据卷

>docker volume create pg-data

2.2 查看数据卷
>docker volume inspect pg-data

2.3 运行

>docker run --name postgres -e POSTGRES_PASSWORD=h1@Andy27 -d postgres

>docker run --name postgres -e POSTGRES_PASSWORD=h1@Andy27 -d -p 5432:5432 -v pg-data:/var/lib/postgresql/data postgres

>docker run --name postgres -e POSTGRES_PASSWORD=h1@Andy27 -d -p 5432:5432 -v pg-data:/var/lib/postgresql/data -d postgres:12.3

#### 3. PG admin

>docker pull dpage/pgadmin4

>docker run -d -p 5433:80 --name pgadmin4 -e PGADMIN_DEFAULT_EMAIL=18501667737@163.com -e PGADMIN_DEFAULT_PASSWORD=h1@Andy27 dpage/pgadmin4
