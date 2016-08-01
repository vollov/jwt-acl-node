'use strict';
var path = require('path');

module.exports = {
	
	db:{
		host: 'localhost',
		name: 'acl',
		port: '27017',
	},
	
	token:{
		secret: 'uwotm8xxc',
		user_property: 'payload', 
		age: '30m'
	},
	
	app:{
		static_dir:'/public',
		api_url:'/api/v1.0',
		port:3006
	}
};