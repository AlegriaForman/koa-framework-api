'use strict';

const Router = require('koa-router');
const Supercar = require(__dirname + '/../models/supercars');
const bodyParser = require('koa-body-parser');
const errorHandler = require(__dirname + '/../lib/error_handler');
const supercarRouter = module.exports = Router();

module.exports = exports = supercarRouter
  .get('/supercars', function *() {
    try {
      var data = yield Supercar.find({}).exec();
    } catch (err) {
      errorHandler(err).bind(this);
    }
    this.response.status = 200;
    this.response.body = data;
  })

  .post('/supercars', bodyParser(), function *() {
    try {
      var data = yield Supercar.create(this.request.body);
    } catch (err) {
      errorHandler(err).bind(this);
    }
    this.response.status = 200;
    this.response.body = data;
  })

  .put('/supercars/:id', bodyParser(), function *() {
    var carData = this.request.body;
    try {
      yield Supercar.update({ _id: this.params.id }, carData).exec();
    } catch (err) {
      errorHandler(err).bind(this);
    }
    this.response.status = 200;
    this.response.body = { msg: 'Car information edited successfully!' };
  })

  .delete('/supercars/:id', bodyParser(), function *() {
    try {
      yield Supercar.remove({ _id: this.params.id });
    } catch (err) {
      errorHandler(err).bind(this);
    }
    this.response.status = 200;
    this.response.body = { msg: 'Car successfully removed!' };
  });
