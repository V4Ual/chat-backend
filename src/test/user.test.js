process.env.ENV = 'TEST';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');  // Adjust the path based on your project structure

const { expect } = chai;

chai.use(chaiHttp);

describe('User API Tests', () => {

    it('should create a new user', (done) => {
        const newUser = {
            "name": "vishal",
            "email": "visl020@gmail.mailintor.com",
            "password": "1234@qw45",
            "phoneNumber": "9106515415"
        }
        chai.request(app)
            .post('/api/v1/users/create')
            .send(newUser)
            .end((err, res) => {
                expect(res.body).to.have.property('statusCode').equal(201);
                expect(res.body).to.have.property('message').equal('Create New User Successfully');
                expect(res.body).to.have.property('data');
                done();
            });
    });


    it('should log in a user', (done) => {
        const credentials = {
            "email": "visl020@gmail.mailintor.com",
            "password": "1234@qw45"
        };


        chai.request(app)
            .post('/api/v1/users/login')
            .send(credentials)
            .end((err, res) => {

                done();
            });

    });

});






