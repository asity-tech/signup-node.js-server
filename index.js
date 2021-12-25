const express = require('express');
const res = require('express/lib/response');
const {Client} = require('pg');
var bodyParser = require('body-parser');
const { json } = require('body-parser');
const port = 3001;
const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

var client = new Client({
    user: process.env.user,
    host: process.env.host,
    database: process.env.database,
    password: process.env.password,
    port: process.env.port,
})

function removeWhiteSpaceFromEnd(title) {
    var size = title.length;
    while (title[size - 1] == " ") {
      size--;
    }
    var temp = "";
    for (let j = 0; j < size; j++) {
      temp += title[j];
    }
    return temp;
}

app.get('/', (req, res) => {
    res.send("Welcome to the magic world -> Asity");
})

app.post('/signup', (req, res) => {
    var rawEmail = req.body.Email
    var emailid = removeWhiteSpaceFromEnd(rawEmail);
    var rawPasscode = req.body.Password
    var passcode = removeWhiteSpaceFromEnd(rawPasscode);
    const insertquery = `insert into accounts(email, password) values('${emailid}', '${passcode}')`;
    client.query(insertquery, (err, result) => {
        if(err){
            res.send(err.message || err);
        }
        else{
            res.status(201);
            console.log('Db insertion: Successful');
            res.send(result);
        }
    });
});

app.get('/allUser', (req, res) => {
    var selectquery = 'select * from accounts order by user_id desc';
    client.query(selectquery, (err, result) => {
        if(err){
            res.send(err.message || err);
        }
        else{
            res.send(result.rows);
        }
    })
})

app.delete('/deleteUser', (req, res) => {
    var emailid = req.body.Email;
    var deletequery = `delete from accounts where email = '${emailid}' returning *`;
    client.query(deletequery, (err, result)=> {
        if(err){
            res.send(err.message || err);
        }
        else{
            res.send(result.rows[0]);
            // console.log(result.rows[0]);
            console.log('User deleted');
        }
    })
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    client.connect((err) => {
        if(err){
           throw err;
        }
        console.log("Database connection: Successful");
    });
    
})