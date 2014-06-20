'use strict';

var gutil = require('gulp-util')
var through2 = require('through2');

module.exports = function () {
	return through2.obj(function (file, enc, done) {
		if (file.isBuffer()) {
			var json = JSON.parse(file.contents);
			console.log(json);
		}
	    return done();
    });
};
