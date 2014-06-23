'use strict';

var gutil = require('gulp-util')
var through2 = require('through2');
var dummyjson = require('dummy-json');

var templates = {};
var waiting = [];
var files = [];
var fixtures = {
	helpers: {
		word: oneOf('lorem ipsum dolor sit amet and so on'.split(' ')),
		date: randomDate,
		hash: guid,
		firstName: oneOf('Paul Daniel Mat Radu Raul Chris Mudi'.split(' ')),
		lastName: oneOf('Smith Green Hawking Carter Potter Einstein Chaplin Epsilon'.split(' '))
	},
	data : {}
};


module.exports = function () {
	return through2.obj(function (file, enc, done) {

		if (file.isBuffer()) {
			var json = JSON.parse(file.contents);

			if(json.enums) {
				for(var e in json.enums) {
					fixtures.helpers[e] = oneOf(json.enums[e]);
				}
			}
			templates[json.name] = json.template;

			waiting.push(json);
		}

		processFiles(this);

	    return done();
    });
};

function processFiles(stream) {
	var done = 0;
	for(var i = 0; i < waiting.length; i++) {
		if(waiting[i].done) {
			done++;
			continue ;
		}
		var processable = true;
		// check dependencies
		for(var d = 0; d < waiting[i].dependencies.length; d++) {
			if(!(waiting[i].dependencies[d] in templates)) {
				processable = false;
				break;
			}
		}
		if(!processable) {
			continue ;
		}

		// processing file
		createDummy(waiting[i]);
		done++;
		waiting[i].done = true;
	}

	if(done >= waiting.length) {
		writeFiles(stream);
	}
}

function createDummy(json) {
	fixtures.helpers[json.name] = function() {
		return dummyjson.parse(json.template, fixtures).replace(/&quot;/g, '"');
	}
}

function writeFiles(stream) {
	for(var i = 0; i < waiting.length; i++) {
		var json = waiting[i];
		var output = dummyjson.parse(json.template, fixtures).replace(/&quot;/g, '"');
		var file = new gutil.File();

		file.contents = new Buffer(output);
		file.path = json.name + '.json';
		stream.push(file);
	}
	waiting = [];
}

function oneOf(arr) {
	return function() {
		return '"' + arr[Math.floor(Math.random() * arr.length)] + '"';
	}
}

function guid() {
    /* jshint ignore:start */
    return '"' + 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0,
            v = (c === 'x' ? r : (r&0x3|0x8));
        return v.toString(16);
    }) + '"';
    /* jshint ignore:end */
}

function randomDate() {
	var start = new Date(1999, 0, 1);
	var end = new Date();
    var rand = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    var pad = function(num) { return (''+num).length > 1 ? num : '0' + num};

    return '"' + [rand.getUTCFullYear(), pad(1 + rand.getUTCMonth()), pad(rand.getUTCDate())].join('-') +  '"';
}
