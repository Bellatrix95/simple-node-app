export {}
import chai from 'chai';
import chaiHttp from 'chai-http';



const app = require('../src/app');
chai.use(chaiHttp);

describe('User Routes Test', () => {
    describe('POST /register', () => {

        it('User created!', (done) => {
            chai.request(app)
            .post('/register')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify({ "email": "testEmail@test.com", "password": "ivana"}))
            .end((err, res) => {
                res.should.have.status(200);
                //if (err) done(err);
                done();
            });
        });

        it('User already exists!', (done) => {
            chai.request(app)
            .post('/register')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify({ "email": "testEmail@test.com", "password": "ivana"}))
            .end((err, res) => {
                res.should.have.status(400);
                //if (err) done(err);
                done();
            });
        });

        it('Email is missing!', (done) => {
            chai.request(app)
            .post('/register')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify({"password": "ivana"}))
            .end((err, res) => {
                res.should.have.status(400);
                //if (err) done(err);
                done();
            });
        });

        it('Password is missing!', (done) => {
            chai.request(app)
            .post('/register')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify({"email": "testEmail@test.com" }))
            .end((err, res) => {
                res.should.have.status(400);
                //if (err) done(err);
                done();
            });
        });
    });

    describe('POST /login', () => {
        it('Login successful!', (done) => {
            chai.request(app)
            .post('/login')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify({ "email": "testEmail@test.com", "password": "ivana"}))
            .end((err, res) => {
                res.should.have.status(200);
                //if (err) done(err);
                done();
            });
        });

        it('Incorrect password!', (done) => {
            chai.request(app)
            .post('/login')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify({ "email": "testEmail@test.com", "password": "incorrect" }))
            .end((err, res) => {
                res.should.have.status(400);
                //if (err) done(err);
                done();
            });
        });

        it('User not found!', (done) => {
            chai.request(app)
            .post('/login')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify({ "email": "incorrect@windowslive.com", "password": "ivana"}))
            .end((err, res) => {
                res.should.have.status(400);
                //if (err) done(err);
                done();
            });
        });

        it('Login failed, email is missing!', (done) => {
            chai.request(app)
            .post('/login')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify({ "password": "ivana"}))
            .end((err, res) => {
                res.should.have.status(400);
                //if (err) done(err);
                done();
            });
        });

        it('Login failed, password is missing!', (done) => {
            chai.request(app)
            .post('/login')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify({ "email": "testEmail@test.com" }))
            .end((err, res) => {
                res.should.have.status(400);
                //if (err) done(err);
                done();
            });
        });
    });

    describe('DELETE /delete_user/:email', () => {
        it('Delete test user!', (done) => {
            chai.request(app)
            .delete('/delete_user/testEmail@test.com')
            .set('token', "String token for tests")
            .end((err, res) => {
                res.should.have.status(200);
                //if (err) done(err);
                done();
            });
        });
    });
});