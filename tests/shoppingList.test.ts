export {}
import chai from 'chai';
import chaiHttp from 'chai-http';



const app = require('../app');
chai.use(chaiHttp);
const should = chai.should();

describe('Shopping List Routes Test', () => {
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
                done();
            });
        });
    });

    describe('POST /shopping_list', () => {
        it('Successfully created list!', (done) => {
            chai.request(app)
            .post('/shopping_list')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .send(JSON.stringify({ 
                "name": 'First shopping list', 
                "products": [
                    {
                        "name": "product1",
                        "quantity": 2
                    },
                    {
                        "name":"product2"
                    }
                ]
            }))
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });

        it('Shopping list name missing!', (done) => {
            chai.request(app)
            .post('/shopping_list')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .send(JSON.stringify({ 
                "products": [
                    {
                        "name": "product1",
                        "quantity": 2
                    },
                    {
                        "name":"product2"
                    }
                ]
                }))
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
        });

        it('List already exists!', (done) => {
            chai.request(app)
            .post('/shopping_list')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .send(JSON.stringify({ "name": 'First shopping list' }))
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
        });
    });

    describe('GET /shopping_list', () => {
        it('Get users shopping lists!', (done) => {
            chai.request(app)
            .post('/shopping_list')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .send(JSON.stringify({ 
                "name": 'Second shopping list', 
                "products": [
                    {
                        "name": "product1"
                    }
                ]
            }))
            .end((err, res) => {
                res.should.have.status(200);

                chai.request(app)
                .get('/shopping_list')
                .set('Authorization', 'Bearer ' + token)
                .set('Content-Type', 'application/json')
                .send(JSON.stringify({"email": "testEmail@test.com", "password": "ivana" }))
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
            });
        });
    });

    describe('PUT /shopping_list/:id', () => {
        it('Shopping list name updated!', (done) => {
            chai.request(app)
            .post('/shopping_list/')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .send(JSON.stringify({ 
                "name": 'Third shopping list', 
                "products": [
                    {
                        "name": "product1"
                    }
                ]
            }))
            .end((err, res) => {
                res.should.have.status(200);
                console.log(res);
                let shoppingList = res.body.list

                chai.request(app)
                .put('/shopping_list/' + shoppingList._id)
                .set('Authorization', 'Bearer ' + token)
                .set('Content-Type', 'application/json')
                .send(JSON.stringify({"name": "New list name"}))
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
            });
        });

        it('Shopping list not found!', (done) => {
            chai.request(app)
            .put('/shopping_list/' + 'randomId')
            .set('Authorization', 'Bearer ' + token)
            .set('Content-Type', 'application/json')
            .send(JSON.stringify({"name": "New list name"}))
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
        });
    });

    describe('DELETE /shopping_list/:id', () => {
        it('Shopping list deleted!', (done) => {
            chai.request(app)
            .post('/shopping_list')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .send(JSON.stringify({ 
                "name": 'Fourth shopping list', 
                "products": [
                    {
                        "name": "product1"
                    }
                ]
            }))
            .end((err, res) => {
                res.should.have.status(200);
                console.log(res);
                let shoppingList = res.body.list

                chai.request(app)
                .delete('/shopping_list/' + shoppingList._id)
                .set('Authorization', 'Bearer ' + token)
                .send()
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
            });
        });
    });
});