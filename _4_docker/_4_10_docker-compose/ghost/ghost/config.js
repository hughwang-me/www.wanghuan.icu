var path = require('path'),
    config;

config = {
    production:{
        url: 'http://mytest.com',
        mail:{},
        database:{
          client: 'mysql',
          connection:{
              host: 'db',
              user: 'ghost',
              password: 'ghost',
              port: '9002',
              charset: 'utf8'
          },
          debug: false
        },
        paths: {
            contentPath: path.join(process.env.GHOST_CONTENT , '/')
        },
        server:{
            host: '0.0.0.0',
            port: '2368'
        }
    }
};

module.exports = config;
