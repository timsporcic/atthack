var fs = require("fs");
var formidable = require('formidable');
var path = require('path');     //used for file path
var fs = require('fs-extra');    //File S
var util = require('util');
var im = require('imagemagick');
var when = require('when');


function createTiff(req) {

    var deffered = when.defer();

    var form = new formidable.IncomingForm();
    var file = "";
    var finalFile = "";
    var newFile = "";

    //Formidable uploads to operating systems tmp dir by default
    form.uploadDir = "./img";       //set upload directory
    form.keepExtensions = true;     //keep file extension

    form.parse(req, function (err, fields, files) {
        console.log("form.bytesReceived");
        console.log("files:\t " + util.inspect(files));
        //TESTING
        console.log("file size: " + JSON.stringify(files.fileUploaded.size));
        console.log("file path: " + JSON.stringify(files.fileUploaded.path));
        console.log("file name: " + JSON.stringify(files.fileUploaded.name));
        console.log("file type: " + JSON.stringify(files.fileUploaded.type));
        console.log("astModifiedDate: " + JSON.stringify(files.fileUploaded.lastModifiedDate));

        //Formidable changes the name of the uploaded file
        //Rename the file to its original name
        file = './img/' + files.fileUploaded.name;
        var index = file.lastIndexOf(".");
        newFile = file.substr(0, index) + ".tiff";

        fs.rename(files.fileUploaded.path, './img/' + files.fileUploaded.name, function (err) {
            if (err) {
                deffered.reject(err);
            } else {

                console.log("newFile:\t" + newFile);
                im.convert([file, '-resize', '400%', '-type', 'Grayscale', newFile],
                        function (err, stdout) {
                            if (err) {
                                defferred.reject(err);
                            }

                            console.log('stdout:', stdout);
                            console.log('image conversion complete');

                            deffered.resolve(newFile);
                        });
            }
        });

    });

    return deffered.promise;
}

module.exports.convertImage = createTiff;
