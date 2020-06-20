export {}
import chai from 'chai';
import chaiHttp from 'chai-http';



const app = require('../src/app');
chai.use(chaiHttp);
const should = chai.should();

describe('Middleware Test', () => {
    let token;

    before(function (done) {
        chai.request(app)
        .post('/user/register')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({"email": "testEmail@test.com", "password": "ivana" }))
        .end((err, res) => {
            res.should.have.status(200);

            chai.request(app)
            .post('/user/login')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify({"email": "testEmail@test.com", "password": "ivana" }))
            .end((err, res) => {
                res.should.have.status(200);
                token = res.body.token;
                if (err) done(err);
                done();
            });
        });
    });

    describe('PUT /change_password', () => {
        it('Wrong token!', (done) => {
            chai.request(app)
            .put('/change_password')
            .set('Content-Type', 'application/json')
            .set('token', "wrong token")
            .send(JSON.stringify({ 
                "newPassword": "newPassword", 
                "currentPassword": "oldPassword"
            }))
            .end((err, res) => {
                res.should.have.status(403);
                if (err) done(err);
                done();
            });
        });
    });

    describe('PUT /change_password', () => {
        it('Middleware working, user password changed!', (done) => {
            chai.request(app)
            .put('/change_password')
            .set('Content-Type', 'application/json')
            .set('token', token)
            .send(JSON.stringify({ 
                "newPassword": "newPassword", 
                "currentPassword":  "ivana"
            }))
            .end((err, res) => {
                res.should.have.status(200);
                if (err) done(err);
                done();
            });
        });
    });
});