var ocr = require('../ocr');


describe("OCR Test", function() {

    it("should fail with an invalid image name", function () {

        ocr.parseImage('').then(function () {

        }, function (err) {
            expect(err).not.toBeNull();
        });
    });

    it("should parse the parking sign", function(done) {

        ocr.parseImage('./parking.jpg').then(function (text) {

            expect(text).not.toBeNull();
            expect(  text.indexOf('STATION') ).toBeGreaterThan(-1);
            done();

        }, function (err) {
            expect(err).toBeNull();
            done();
        });

    });

});

