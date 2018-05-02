const config    = require('./knexfile');
const env       = 'development';
const knex      = require('knex')(config[env]);

const name = process.argv[2]

// SELECT
knex
.from('famous_people')
.where({ first_name: name })
.orWhere({ last_name: name })
.then(result => {
    console.log('Searching...');
    console.log(`Found ${result.length} person(s) by the name ${name}`);
    for (const element of result) {
        let newDate = element.birthdate.toISOString().slice(0, 10);
        console.log(
            `-${element.id}: ${element.first_name} ${element.last_name}, born ${newDate}` );
    }
})
.catch(err => {
    console.log(err);
    return Promise.resolve();
})
.finally(() => {
    console.log("kill connection");
    knex.destroy();
})