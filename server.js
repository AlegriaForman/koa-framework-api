'use strict';

const koa = require('koa'); const app = koa();
const mongoose = require('mongoose');
const supercars = require(__dirname + '/routes/superRoute');
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/db');

app.use(supercars.routes());
app.use(supercars.allowedMethods());

app.listen(PORT, () => console.log('Server listening on port: ' + PORT));
