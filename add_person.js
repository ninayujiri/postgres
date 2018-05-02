const config    = require('./knexfile');
const env       = 'development';
const knex      = require('knex')(config[env]);

const [,, first_name, last_name, date] = process.argv

// INSERT
knex('famous_people')
.insert({ first_name: first_name, last_name: last_name, birthdate: date})

.catch(err => {
    console.log(err);
})

.finally(() => {
    console.log("kill connection");
    knex.destroy();
})
