const express = require("express");
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'dist')));
app.use(express.urlencoded({extended: false}));

app.get('/', function(){
    const html = path.resolve(__dirname, 'dist', 'index.html');
    res.sendFile(html);
});

app.listen(process.env.PORT || 3000, function(){
    console.log('server started..');
});