var express = require('express');
var bodyParser = require('body-parser');
var admin = require('./routers/admin');
var app = express();

//app.get('/',(req,res)=>{res.send("welcome to this！")});
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//app.get('/position',(req,res)=>{res.send()})
app.use('/',admin);


app.listen(4000);


