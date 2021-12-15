const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

let images = [

];

app.get("/images", (req, res) => {
    res.json(images);
})

app.post("/upload", (req, res) => {
    let data = { "dataType": req.body.type, "imgCode": req.body.imgcode }
    try{
        images.push(data);
        res.sendStatus(201);
    }
    catch{
        res.sendStatus(400);
    }
})

app.listen(4000);