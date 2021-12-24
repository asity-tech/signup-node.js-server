const express = require('express');
const port = 3000;

const app = express();

app.get('/', (req, res) => {
    res.send("welcome to the magic world -> Asity");
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})