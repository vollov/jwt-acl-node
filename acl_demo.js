var mongoose = require('mongoose');
var _ = require('underscore');
var Acl = require('acl');

require('./models/Users');
var User = mongoose.model('User');

var cfg = require('./config.js');

mongoose.connect('mongodb://localhost/' + cfg.db.name, function(err, db) {
	if (!err) {
		console.log('Connected to db: ' + cfg.db.name);
	} else {
		console.dir(err); // failed to connect
	}
});

acl = new Acl(new Acl.mongodbBackend(mongoose.connection.db, 'acl_'));

acl.allow('editor', 'blogs', ['edit','view', 'delete']);
acl.allow('guest', 'blogs', ['view']);
acl.addUserRoles('joe', ['guest','editor']);

acl.save(function(err) {
	if (err) {
		console.log(err);
		return;
	}

	console.log('acl created');
	//mongoose.disconnect();
});
mongoose.disconnect();