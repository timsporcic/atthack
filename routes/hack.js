var express = require('express');
var router = express.Router();
var image= require('../image');
var ocr = require('../ocr');
var util = require('util');
var googleTranslate = require('google-translate')('AIzaSyD2qU4Haudzg3RxzcUpZv_K2yHmZ_QiGYc');


/* GET home page. */
router.get('/', function(req, res) {

  res.render('hack');
});

router.post('/upload',function(req,res){

	image.convertImage(req).then(function(file){

        console.log("***File name: " + file);

        ocr.parseImage(file).then(function(text){
              console.log("Text to Translate:\t"+text);
        	googleTranslate.translate(text, 'en', function(err, translation) {
					  
					  if(err)
					  {
					  	console.log(err);
					  }

					  console.log("Transated Text:\t"+translation);
					      res.send(translation);
					  // =>  { translatedText: 'Hallo', originalText: 'Hello', detectedSourceLanguage: 'en' }
					});

        
        });

	},function(err) {
		throw err;	

	});
});


module.exports = router;
