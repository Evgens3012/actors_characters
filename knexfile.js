require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || '1234',
      database: process.env.DB_NAME || 'actors_characters'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
      schemaName: 'public'
    },
    seeds: {
      directory: './seeds'
    },
    debug: process.env.NODE_ENV === 'development',
    // Для лучшей обработки timestamp
    useNullAsDefault: true,
    // Настройки для корректной работы с timezone
    timezone: 'UTC'
  },
};