function lookUpPeople(client, person) {
  const query = "SELECT * FROM famous_people WHERE first_name = $1::text OR last_name = $1::text;";
  return client.query(query, [process.argv[2]]);
}

module.exports = {
  lookUpPeople: lookUpPeople
}