'use strict';

const Router = require('koa-router');
const Supercar = require(__dirname + '/../models/supercars');
const bodyParser = require('koa-body-parser');
const errorHandler = require(__dirname + '/../lib/error_handler');
const supercarRouter = module.exports = Router();

module.exports = exports = supercarRouter
  .get('/supercars', function* () {
    yield Supercar.find({}, (err, data) => {
      if (err) return errorHandler(err).bind(this);
      this.response.status = 200;
      this.response.body = data;
    });
  })

  .post('/supercars', bodyParser(), function* () {
    const newSupercar = yield Supercar.create(this.request.body);
    yield newSupercar.save((err, data) => {
      if (err) return errorHandler(err).bind(this);
      this.response.status = 200;
      this.response.body = data;
    });
  })

  .put('/supercars/:id', bodyParser(), function* () {
    var carData = this.request.body;
    delete carData._id;
    Supercar.update({ _id: this.params.id }, carData, (err) => {
      if (err) return errorHandler(err).bind(this);
      this.response.status = 200;
    });
    this.response.body = { msg: 'Car information edited successfully!' };
  })

  .delete('/supercars/:id', bodyParser(), function* () {
    yield Supercar.remove({ _id: this.params.id }, err => {
      if (err) return errorHandler(err).bind(this);
      this.response.status = 200;
      this.response.body = { msg: 'Car successfully removed!' };
    });
  });
