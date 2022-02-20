FROM registry.cn-shanghai.aliyuncs.com/uwjx-docker-images/node:amd64
LABEL description="www.wanghuan.icu doc"
WORKDIR /docs
RUN npm config set registry https://registry.npm.taobao.org
RUN npm install -g docsify-cli@latest
ADD . /docs
EXPOSE 3000/tcp
ENTRYPOINT docsify serve
