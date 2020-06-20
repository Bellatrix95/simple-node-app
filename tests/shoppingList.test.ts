export {}
import chai from 'chai';
import chaiHttp from 'chai-http';



const app = require('../src/app');
chai.use(chaiHttp);
const should = chai.should();

let removeShoppingListIds = [];

describe('Shopping List Routes Test', () => {
    let token;

    before(function (done) {
        chai.request(app)
        .post('/register')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({"email": "testEmail@test.com", "password": "ivana" }))
        .end((err, res) => {
            res.should.have.status(200);

            chai.request(app)
            .post('/login')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify({"email": "testEmail@test.com", "password": "ivana" }))
            .end((err, res) => {
                res.should.have.status(200);
                token = res.body.token;
                //if (err) done(err);
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
                "name": 'Test 1. shopping list', 
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
                removeShoppingListIds.push(res.body.list._id);
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
            .send(JSON.stringify({ "name": 'Test 1. shopping list' }))
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
                "name": 'Test 2. shopping list', 
                "products": [
                    {
                        "name": "product1"
                    }
                ]
            }))
            .end((err, res) => {
                res.should.have.status(200);
                removeShoppingListIds.push(res.body.list._id);

                chai.request(app)
                .get('/shopping_list')
                .set('Authorization', 'Bearer ' + token)
                .send()
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
                "name": 'Test 3. shopping list', 
                "products": [
                    {
                        "name": "product1"
                    }
                ]
            }))
            .end((err, res) => {
                res.should.have.status(200);
                let shoppingList = res.body.list;
                removeShoppingListIds.push(shoppingList._id);
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

        //randomId = 5eee19ddbe8d123598dc1d86 than can be parsed to ObjectId
        it('Shopping list not found!', (done) => {
            chai.request(app)
            .put('/shopping_list/' + '5eee19ddbe8d123598dc1d86')
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
            for (let i = 0; i < removeShoppingListIds.length; i++) {
                chai.request(app)
                .delete('/shopping_list/' + removeShoppingListIds[i])
                .set('Authorization', 'Bearer ' + token)
                .send()
                .end((err, res) => {
                    res.should.have.status(200);
                    //if (err) done(err);
                });
            }
            done();
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