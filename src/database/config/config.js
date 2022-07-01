const config = require('../../config')

module.exports = {
  "development": {
    "username": "alivier",
    "password": "mujuj9o89j7",
    "database": "restaurant",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    url: config.url,
    use_env_variable: config.url,
    dialectOptions: {
      ssl: {
          require: true,
          rejectUnauthorized: false
      }
    }
  }
}
