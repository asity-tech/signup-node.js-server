const express = require('express');
const res = require('express/lib/response');
const {Client} = require('pg');
const port = 3000;
var bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
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

app.post('/signup', (req, res) => {
    var emailid = req.body.Email
    var passcode = req.body.Password
    const insertquery = `insert into accounts(email, password) values('${emailid}', '${passcode}')`;
    client.query(insertquery, (err, result) => {
        if(err){
            res.send('Error in inserting into Db', err);
        }
        else{
            res.status(201);
        }
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    client.connect((err) => {
        if(err){
           throw err;
        }
        console.log("Database connection: Successful");
    });
    
})