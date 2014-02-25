var mysql = require('mysql');

var connection = mysql.createConnection({
    user: "root",
    password: "hershey24",
    database: "nodejsmysql"
});


exports.findAll=function(req,res){
console.log("Entered getdata");
connection.query('SELECT id, latitude,longitude from location;',
function(err, result, fields) {
    if (err) throw err;
    else {
    res.send(result);
    	}
    });
};

exports.putdata=function(req,res){
console.log("Entered putdata");
var post={latitude:req.body.latitude,longitude:req.body.longitude};
connection.query('INSERT INTO location SET ?',post,function(err,result,fields){
 if (err){throw err;}
    else {
    res.send(result[0]);
    console.log(result[0]);
    	}
});
};

exports.sendalert=function(req,res){
console.log("Entered sendalert");
var post_lat=req.body.latitude;
var post_long=req.body.longitude;
var post_lat_high=parseFloat(post_lat);
var post_lat_low=parseFloat(post_lat);
var post_long_high=parseFloat(post_long);
var post_long_low=parseFloat(post_long);
post_lat_high=post_lat_high+0.0000100;
post_lat_low=post_lat_low-0.0000100;
post_long_high=post_long_high+0.0000100;
post_long_low=post_long_low-0.0000100;
console.log(post_lat);
console.log(post_lat_high);
console.log(post_lat_low);
console.log(post_long);
console.log(post_long_high);
console.log(post_long_low);

connection.query('SELECT * from location WHERE latitude < ? and latitude > ? and longitude > ? and longitude <?',[post_lat_high,post_lat_low,post_long_low,post_long_high],
function(err, result, fields) {
    if (err) throw err;
    else {
    console.log(result.length);
    console.log(result);
    res.send(result);
    	}
    });
};


exports.view=function(req,res){
console.log("Entered view");
connection.query('SELECT id,latitude,longitude from location;',
function(err, result, fields) {
    if (err){
    console.log(err);
     throw err;
     }
    else {
    console.log(result);
    res.send(result);
    	}
    });
};




exports.serviceupdate=function(req,res){
console.log("Entered timedikhadeyar");
var post={latitude:req.body.latitude,longitude:req.body.longitude};
connection.query('INSERT INTO log SET ?',post,function(err,result,fields){
 if (err){throw err;}
    else {
    res.send(result[0]);
    console.log(result[0]);
    	}
});
};

