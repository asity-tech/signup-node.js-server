const express = require('express');
const {Client} = require('pg');
const port = 3000;
const app = express();
var client = new Client({
    user: process.env.user,
    host: process.env.host,
    database: process.env.database,
    password: process.env.password,
    port: 5432,
})
app.get('/', (req, res) => {
    res.send("welcome to the magic world -> Asity");
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    client.connect();
    console.log("Database connection: Successful");
})