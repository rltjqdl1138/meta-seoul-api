'use strict';
module.exports = {
  apps: [
    {
      name: 'MetaSeoul',
      script: './dist/www.js',
      watch: false,
      ignore_watch: ['[/\\]./', 'node_modules', 'logs', 'public'],
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'dev',
        instances: 1,
        SCHEME: 'http',
        HOST: '1.221.216.110',
        PORT: 8000,
      },
      env_production: {
        NODE_ENV: 'prod',
        instances: 1,
        SCHEME: 'http',
        HOST: '1.221.216.110',
        PORT: 8000,
      },
    },
  ],
};
