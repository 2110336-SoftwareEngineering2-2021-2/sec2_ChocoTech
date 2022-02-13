require('dotenv').config() // eslint-disable-line

export const environment = {
  production: false,
  database: {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    dbName: process.env.POSTGRES_DATABASE_NAME,
    host: process.env.POSTGRES_HOST,
  },
  redis: {
    host: process.env.REDIS_HOST,
    db: parseInt(process.env.REDIS_DB ?? '0', 10),
  },
}

console.log(process.env.NODE_ENV)
console.log(environment.database)
