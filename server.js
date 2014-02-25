var express = require('express'),
help = require('./help'),
mysqlandgcm = require('./mysqlandgcm');
 
var app = express();

app.configure(function () {
app.use(express.logger('dev'));
app.use(express.bodyParser());
});

app.get('/helps', help.findAll);
app.post('/helps',help.putdata);
app.post('/alert',help.sendalert);
app.get('/location',help.view);
app.post('/callforhelp',mysqlandgcm.startAlert);
app.post('/updatetime',help.serviceupdate);
 
app.listen(3000);
console.log('Listening on port 3000...');
