# KOA-Framework-API

- KOA requires Node very much like Express.
- The '—harmony' flag is needed to run KOA for example: to run app.js you enter [node —harmony app.js] or to create an alias like you enter [node=‘node —harmony’]

# KOA - generators vs. Express - promises

Koa uses ‘generators’, which are similar to ‘promises’ in that they
allow you to write code for something that will occur later making
it simpler to write asynchronous code.

A generator is written with function *() and followed by yield and next farther in the code block similar to using Promise followed by a .then()∫ method.

This method of control flow in asynchronous operations is in contrast to Express’ use of Promises and how ‘callback hell’ is avoided, because there are no callbacks. The interesting bit is that you can control flow down and back up again through your stack of function generators.

# KOA - context/this vs. Express - (req, res)

Rather than using req and res, a KOA context is created that encapsulates node’s request and response so you use this.request and this.response instead.

That’s not to say there aren’t drawbacks. For one, we had to use the bind command for the error handler. Also, we ran into an interesting problem with our PUT route in that the yield command was producing an unexpected result causing us to not use it and instead put the response object in the outer function. In Express we would have used res.write() and res.end().

# KOA vs. Express - Server Setup

Setting up a server was very similar to Express. You can set up a http server in Koa by typing koa.listen(3000);

Koa has a built-in use function similar to Express for adding middleware to your application. An example of this might be:

  var koa = require(‘koa’);
  var app = koa();

  app.use(function* (next){
    this.type = ‘json’;
    this.status = 200;
    this.body = {‘Welcome’: ‘Hello World!’};

    if(!module.parent) app.listen(3000);
    console.log(‘Hello World is running on http://localhost:3000/');
  });

# KOA vs. Epress - Router

Koa has no built-in router like Express but there are several available. We chose to use koa-router in our project as it appears to be the most widely used with approximately 62,000 downloads per month, although it does have 29 open issues on Git Hub.

Examples of error handling in Koa might be:

  app.use(function *(next){
    try{
      yield next;  //pass on the execution to downstream middleware
    } catch (err) {  //executed only when an error occurs & no other middleware responds to the request
      this.type = 'json'; //optional
      this.status = err.status || 500;
      this.body = { 'error' : ‘Your app crashed!’};

      //delegate the error back to the application
      this.app.emit('error', err, this);
    }
});

OR (what we used)

  module.exports = exports = function (err) {
    console.log(err);
    this.response.status(500);
    this.response.body = ‘Internal Server Error’;
  };
