var express = require('express');
var router = express.Router();
var express = require('express');
var image= require(../image.js);


/* GET home page. */
router.get('/', function(req, res) {

  res.render('hack');
});

router.post('/upload',function(req,res){
	//console.log('Request\t' + util.inspect(req));
	console.log(req.body);
    console.log(req.files);
	console.log('Request File\n' + util.inspect(req.files));

	image.createTiff(req).then(function(file){

		//dosomething
		console.log("Converted File:\t"+file);
	},function(err) {
		throw errr;	

	});  
res.send('Hello World');
});


module.exports = router;
