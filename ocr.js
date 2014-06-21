var tesseract = require('node-tesseract'),
    fs        = require('fs'),
    when      = require('when');

function parseImage(imgFileName) {

    var deferred = when.defer();

    if(!fs.existsSync(imgFileName)) {

        deferred.reject( "Image file does not exist: " + imgFileName );

    } else {

        tesseract.process(imgFileName, function(err, text) {

            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(text);
            }
        });
    }

    return deferred.promise;
}

module.exports.parseImage = parseImage;
