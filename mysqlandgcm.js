var mysql = require('mysql');
var gcm = require('node-gcm');

var connection = mysql.createConnection({
    user: 'root',
    password: 'hershey24',
    database: 'nodejsmysql'
});

exports.startAlert=function(req,res){
	console.log("in sendalert");
	
	
	var post_lat=req.body.SenderLatitude;
	var post_long=req.body.SenderLongitude;
	
	var post_lat_num=parseFloat(post_lat);
	var post_long_num=parseFloat(post_long);
	
	lat_high=post_lat_num+0.0000050;
	lat_low=post_lat_num-0.0000050;
	long_high=post_long_num+0.0000030;
	long_low=post_long_num-0.0000030;
	
	
	console.log(post_lat);
	console.log(lat_high);
	console.log(lat_low);
	console.log(post_long);
	console.log(long_high);
	console.log(long_low);
	
	var post  = {latitude:post_lat_num,longitude:post_long_num};
	var condition = {id:0};

connection.query('UPDATE location SET latitude = ?,longitude=? WHERE id = ?', [post.latitude,post.longitude,condition.id], function(err, result) { if (err) throw err;
    else {
        console.log('Database has been updated');
        }});
	
	
	connection.query('SELECT * from location;',function(err,result,fields)
	{
		if(err)
			throw err;
		else {
		
				var message= new gcm.Message({
				collapseKey : 'demo' ,
				delayWhileIdle : true ,
				timeToLive : 0 ,
				data:{
					alert_latitude: post_lat,
					alert_longitude: post_long
					}
				});
			
				
				console.log('----------------------------------');
	        	
	        	var sender = new gcm.Sender('AIzaSyDlmRg-JdCZlB5vbaS5CFpmOFvoxUOlzFI');
				var registrationIds = [];
	        	
	        	
	        	for (var i in result) {	
	        	    var user = result[i];
	        	    console.log(user.id +":\t"+ user.latitude + "\t" + user.longitude );
	        	
	        		
	        	}
	        	
	        	
	        	registrationIds.push("APA91bGXcPn_JxwCegMoML3sJjMsDIFSX4-6WXHFoujmHZ3o72uQEZAe5P4nkrK6yGWrE3jV9UxL0XuFuEQA4Yi-wFiIdMkoYjhMKVpviDpXbcC6TTiyI4wktw3eIgHumYycACO3uarOk3ZWiz2F2a3GzWWJ8Rhw-g");
	        	
	        	
	        	//registrationIds.push("APA91bE26o-MfpJL_1HrwSGWp9s8wqO3hjAGxoZhua-585Y0EDVk401oTKT2Y3oHC7u5U0LAr3S9mfZZWB4RkX5FylS0nNL40SfRa57_Jrxw7P3ylsuKu53n9Kvo1ngLWMd7dfqUNsxPNfdG4-5KEt0bIqi0Zqr9-A");
	        	
	        	sender.sendNoRetry(message, registrationIds, function(err,result) {
				console.log(result);
				res.send(result);
				});
				
				
				
				
				
			}
	
	});
	
};



