require('dotenv').config() // eslint-disable-line

export const environment = {
  production: true,
  domain: {
    frontend: process.env.FRONTEND_DOMAIN ?? 'http://localhost:3000',
    backend: process.env.BACKEND_DOMAIN ?? 'http://localhost:3333/api',
  },
  database: {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    dbName: process.env.POSTGRES_DATABASE_NAME,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT ?? '5432',
  },
  redis: {
    host: process.env.REDIS_HOST,
    db: parseInt(process.env.REDIS_DB ?? '0', 10),
    port: parseInt(process.env.REDIS_PORT ?? '6379', 10),
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
  },
  omise: {
    publicKey: process.env.OMISE_PUBLIC_KEY ?? '',
    secretKey: process.env.OMISE_SECRET_KEY ?? '',
  },
  mailgun: {
    apiKey: process.env.MAILGUN_API_KEY ?? '',
    domain: process.env.MAILGUN_DOMAIN ?? '',
  },
  googleOAuth: {
    clientId: process.env.GOOGLE_OAUTH_CLIENT_ID ?? '',
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET ?? '',
  },
  jwt: {
    secret: process.env.JWT_SECRET ?? '',
  },
  google: {
    key: process.env.GOOGLE_APPLICATION_DECODE ?? '',
  },
}

console.log(process.env.NODE_ENV)
console.log(environment.database)
