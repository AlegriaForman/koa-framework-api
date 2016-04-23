'use strict';

const koa = require('koa'); const app = koa();
const mongoose = require('mongoose');
const supercars = require(__dirname + '/routes/superRoutes');
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/koa-framework-api');

app.use(superRoutes.routes());
app.use(superRoutes.allowedMethods());

app.listen(PORT, () => console.log('Server listening on port: ' + PORT));
