
exports.up = function(knex) {
    return knex.schema
        .createTable('users', tbl => {
            tbl.increments();
            tbl.string('user_name')
                .notNullable()
                .unique();
            tbl.string('password')
                .notNullable();
            tbl.string('department', 255)
                .notNullable();
  })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('users')
};
