const db = require('../data/dbConfig.js');

module.exports = {
    add, 
    find, 
    findBy,
};

function find() {
    return db('users').select('id', 'username', 'password', 'department');
};

function findBy(filter) {
    return db('users').where(filter);
};

function add(user) {
    return db('users')
    .insert(user, 'id')
    .then(user => ({ user}));
};