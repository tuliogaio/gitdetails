exports.up = function (knex) {
  return knex.schema.createTable("github", (table) => {
    table.increments("id").primary();
    table.string("address").notNull();
    table.string("file").notNull();
    table.decimal("length",15,2).notNull();
    table.integer("lines").notNull();
    table.string('ext').notNull();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("github");
};
