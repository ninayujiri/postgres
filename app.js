const pg = require("pg");
const settings = require("./settings");
const lookup = require('./lookup_people')

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err, connection) => {
  if (err) {
    console.error('Connection error:', err)
    process.exit(1)
  }

  lookup.lookUpPeople(client, process.argv[2])
  .then((result) => {
    console.log('Searching...');
    console.log(`Found ${result.rows.length} person(s) by the name ${process.argv[2]}`);
    for (let row of result.rows) {
      let newDate = row.birthdate.toISOString().slice(0, 10);
      console.log(`-${row.id}: ${row.first_name} ${row.last_name}, born ${newDate}`)
    }
  })

  .then(() => client.end())
  .catch((error) => {
    console.error('error', error)
    client.end()
  })
});