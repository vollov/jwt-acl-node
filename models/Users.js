var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var cfg = require('../config');
var _ = require('underscore');
var log = require('../lib/logger');

var acl = require('mongoose-acl');

var WidgetSchema = new mongoose.Schema({});
WidgetSchema.plugin(acl.object, {
	path: '_acl'
});

mongoose.model('Widget', WidgetSchema);

var UserSchema = new mongoose.Schema({
	username : {
		type : String,
		lowercase : true,
		unique : true
	},
	roles: [String],
	hash : String,
	salt : String
});

UserSchema.plugin(acl.subject, {
	key : function() {
		return 'user:' + this._id;
	}
});

UserSchema.methods.generateJWT = function() {
	log.debug('models.User.generateJWT()...');

	//sign user name into token in a time range.
	return jwt.sign({
		_id : this._id,
		username : this.username
	}, cfg.token.secret, {expiresIn: cfg.token.age});
};

UserSchema.methods.setPassword = function(password) {
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64)
			.toString('hex');
};

UserSchema.methods.validPassword = function(password) {
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
	return this.hash === hash;
};

mongoose.model('User', UserSchema);