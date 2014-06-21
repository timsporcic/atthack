var express = require('express');
var router = express.Router();
var image= require('../image');
var ocr = require('../ocr');
var util = require('util');


/* GET home page. */
router.get('/', function(req, res) {

  res.render('hack');
});

router.post('/upload',function(req,res){
	//console.log('Request\t' + util.inspect(req));
	console.log(req.body);
    console.log(req.files);
	console.log('Request File\n' + util.inspect(req.files));

	image.convertImage(req).then(function(file){

        console.log("***File name: " + file);

        ocr.parseImage(file).then(function(text){

            res.send(text);
        });

	},function(err) {
		throw errr;	

	});
});


module.exports = router;
