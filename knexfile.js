module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/dev.sqlite3'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  useNullAsDefault: true
};
