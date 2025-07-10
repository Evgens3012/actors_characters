/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('actors', (table) => {
    table.increments('id').primary();
    table.string('name', 255).notNullable();
    table.integer('birth_year');
    table.string('nationality', 100);
    table.text('bio');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    
    table.index(['name']); // Индекс для поиска по имени
  });

  await knex.schema.createTable('characters', (table) => {
    table.increments('id').primary();
    table.string('name', 255).notNullable();
    table.string('movie_name', 255).notNullable();
    table.integer('movie_year');
    table.text('character_description');
    
    // Внешний ключ с каскадным удалением
    table.integer('actor_id').unsigned().notNullable()
      .references('id').inTable('actors')
      .onDelete('CASCADE');
    
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    
    // Индексы для часто используемых полей
    table.index(['name']);
    table.index(['movie_name']);
    table.index(['actor_id']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  // Удаляем в обратном порядке из-за foreign key constraints
  await knex.schema.dropTable('characters');
  await knex.schema.dropTable('actors');
};