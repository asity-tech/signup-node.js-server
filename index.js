const express = require('express');
const res = require('express/lib/response');
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

app.post('/signup', (req, res) => {
    let emailid = req.body.Email
    let passcode = req.body.Password
    const insertquery = `insert into accounts(email, password) values('${emailid}', '${password}')`;
    client.query(insertquery, (err, result) => {
        if(err){
            res.send('Error in inserting into Db', err);
        }
        else{
            res.status(201);
            res.send(result);
            console.log('Insertion in Db: Successful');
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