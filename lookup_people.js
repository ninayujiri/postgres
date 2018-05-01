const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE first_name = $1::text OR last_name = $1::text;", [process.argv[2]], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    printOut(result.rows)
    client.end();
  });
});


function printOut(result) {
  console.log('Searching...');
  console.log(`Found ${result.length} person(s) by the name ${process.argv[2]}`);
  for (let row of result) {
    let newDate = row.birthdate.toISOString().slice(0, 10);
    console.log(`-${row.id}: ${row.first_name} ${row.last_name}, born ${newDate}`)
  }
};