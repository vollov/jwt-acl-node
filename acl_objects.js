var mongoose = require('mongoose');
var _ = require('underscore');

require('./models/Users');
var Widget = mongoose.model('Widget');
var User = mongoose.model('User');

var cfg = require('./config.js');

mongoose.connect('mongodb://localhost/' + cfg.db.name, function(err, db) {
	if (!err) {
		console.log('Connected to db: ' + cfg.db.name);
	} else {
		console.dir(err); // failed to connect
	}
});

// Testing Objects
var widget = new Widget();

//adds accessor methods to the object
widget.setAccess('posts', ['create', 'list', 'search', 'update', 'delete']);

widget.save(function(err) {
	if (err) {
		console.log(err);
		return;
	}

	console.log('widget created');
	//mongoose.disconnect();
});

var widgetCom = new Widget();
widgetCom.setAccess('comments', ['create', 'list', 'search', 'update', 'delete']);

widgetCom.save(function(err) {
	if (err) {
		console.log(err);
		return;
	}

	console.log('widget created');
	//mongoose.disconnect();
});

var user = new User();
user.username = username;
user.setPassword(password);
user.roles = ['editor','visitor']

user.setAccess(widget, );
