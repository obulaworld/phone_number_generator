import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { FILE_PATH } from '../helpers/defaults';
import rimraf from 'rimraf';
import server from '../index';
const should = chai.should();
chai.use(chaiHttp);

describe('PhoneNumberController Controller', () => {
  it('should return home message', (done) => {
    chai.request(server)
      .get('/api/v1/')
      .end((err, res) => {
        const {text} = res;
        res.should.have.status(200);
        expect(text).to.equal('Welcome to Phone Number Generator Application API');
        done();
      });
  });
  it('should generate 100 new phone numbers', (done) => {
    chai.request(server)
      .get('/api/v1/numbers/generate?quantity=100&&order=ascending')
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('success');
        res.body.should.have.property('message');
        res.body.should.have.property('phoneNumbers');
        done();
      });
  });
  it('should Return 400 for bad quantity query param', (done) => {
    chai.request(server)
      .get('/api/v1/numbers/generate?quantity=abc&&order=ascending')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error');
        done();
      });
  });
  it('should Return 400 for bad order query param', (done) => {
    chai.request(server)
      .get('/api/v1/numbers/generate?quantity=100&&order=ads')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error');
        done();
      });
  });
  it('should return 10 numbers generated', (done) => {
    chai.request(server)
    .get(`/api/v1/numbers?quantity=10&&order=ascending`)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('success');
      res.body.should.have.property('message');
      res.body.should.have.property('generatedPhoneNumbersList');
      res.body.should.have.property('totalGeneratedPhoneNumbers');
      done();
    });
  });

  it('should return the minimum and maximum numbers generated', (done) => {
    chai.request(server)
    .get(`/api/v1/numbers/minmax?quantity=10&&order=ascending`)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('success');
      res.body.should.have.property('message');
      res.body.should.have.property('minimum_phone_number');
      res.body.should.have.property('maximum_phone_number');
      done();
    });
  });
  it('should return 500 when the folder does not exist', (done) => {
    rimraf.sync(FILE_PATH);
    chai.request(server)
    .get(`/api/v1/numbers/minmax?quantity=10&&order=ascending`)
    .end((err, res) => {
      res.should.have.status(500);
      done();
    });
  });

});


