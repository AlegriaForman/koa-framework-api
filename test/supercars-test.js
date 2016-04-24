const chai =  require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
const mongoose = require('mongoose');
process.env.MONGOLAB_URI = 'mongodb://localhost/db';
const server = require(__dirname + '/../server');
const Supercar = require(__dirname + '/../models/supercars');

describe('test API methods of GET and POST:', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should POST Porsche 918 Spyder with price $847,000 ', (done) => {
    request('localhost:3000')
      .post('/supercars')
      .send({ make:'Porsche', model:'918 Spyder', zeroToSixty:3, price: 847000 })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.make).to.eql('Porsche');
        expect(res.body.model).to.eql('918 Spyder');
        expect(res.body.zeroToSixty).to.eql(3);
        expect(res.body.price).to.eql(847000);
        done();
      });
  });

  it('should GET the all the supercars ', (done) => {
    request('localhost:3000')
      .get('/supercars')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });
});

describe('test PUT and DELETE methods: ', () => {
  beforeEach((done) => {
    Supercar.create({ make: 'McLaren', model: '675LT', zeroToSixty: 3, price: 345000 }, (err, data) => {
      this.testSupercar = data;
      done();
    });
  });

  it('should PUT changes made to the supercar ', (done) => {
    request('localhost:3000')
      .put('/supercars/' + this.testSupercar._id)
      .send({price: 400000})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.msg).to.eql('Car information edited successfully!');
        done();
      });
  });

  it('should DELETE the supercar ', (done) => {
    request('localhost:3000')
      .delete('/supercars/' + this.testSupercar._id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.msg).to.eql('Car successfully removed!');
        done();
      });
  });
});
