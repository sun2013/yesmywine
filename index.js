'use strict';

var express = require('express');
var http = require('http');
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var fs = require('fs');
var serverPort = 3000;
var path = require('path');
var session = require('express-session');
var SessionStore = require('express-mysql-session');
var cookieParser = require('cookie-parser');
var app = express();
app.use(cookieParser());
app.use(session({
	secret: 'app',
	key: 'sid', //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {
	  	secure:false,
	}, //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true,
    store: new SessionStore({
  	  host: 'localhost',  
      port: 3306,  
      user: 'root',  
      password: '123456',  
      database: 'sun' 
    })
}));

// swaggerRouter configuration
app.use(express.static(path.join(__dirname, 'public')));
var options = {
	swaggerUi: '/swagger.json',
	controllers: './controllers',
	useStubs: process.env.NODE_ENV === 'development' ? true : false // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync('./api/swagger.yaml', 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function(middleware) {
	// Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
	app.use(middleware.swaggerMetadata());

	// Validate Swagger requests
	app.use(middleware.swaggerValidator());

	// Route validated requests to appropriate controller
	app.use(middleware.swaggerRouter(options));

	// Serve the Swagger documents and Swagger UI
	app.use(middleware.swaggerUi());

	// Start the server
	http.createServer(app).listen(serverPort, function() {
		console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
		console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
	});
});