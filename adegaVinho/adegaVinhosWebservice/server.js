const express = require('express')
    , app = express()
    , bodyParser = require('body-parser')
    , cors = require('cors');

const extractIpParameter = () =>
    process.argv[2] ? process.argv[2] : 'localhost';

const ip = extractIpParameter();
app.set('ip', ip);
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

require('./api')(app);

app.listen(3000, () => 
    console.log(`Servidor rodando em http://${ip}:3000`));