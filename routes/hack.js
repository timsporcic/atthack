var express = require('express');
var router = express.Router();
var image= require('../image');
var ocr = require('../ocr');
var util = require('util');
var googleTranslate = require('google-translate')('AIzaSyBxsyOG0KqoenUpgsPfRo7xrCPbmbhDA1o');


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
              console.log("Text to Translate:\t"+text);
        	googleTranslate.translate(text, 'en', function(err, translation) {
					  console.log("Transated Text:\t"+translation);
					      res.send(translation);
					  // =>  { translatedText: 'Hallo', originalText: 'Hello', detectedSourceLanguage: 'en' }
					});

        
        });

	},function(err) {
		throw errr;	

	});
});


module.exports = router;
