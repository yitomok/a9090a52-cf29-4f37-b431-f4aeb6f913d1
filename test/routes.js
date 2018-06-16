const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()

const server = require('../app')

chai.use(chaiHttp)

const mongoose = require('mongoose')

const User = require('../model/user')

describe('Users', () => {
    let token = ''

    before((done) => {
        mongoose.connect(process.env.DB_URI)
        .then((db) => User.remove({ email: 'yitomok@users.noreply.github.com' }).exec())
        .then(() => done())
    })

    after(() => {
        mongoose.disconnect()
    })

    describe('/POST user', () => {
        it('should POST an user', (done) => {
            chai.request(server)
            .post('/user')
            .send({
                email: 'yitomok@users.noreply.github.com',
                password: 'abc123'
            })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.an('object').with.property('message', 'ok')
                done()
            })
        })

        it('should not POST a duplicated user', (done) => {
            chai.request(server)
            .post('/user')
            .send({
                email: 'yitomok@users.noreply.github.com',
                password: 'abc123'
            })
            .end((err, res) => {
                res.should.have.status(400)
                res.body.should.be.an('object').with.property('message', 'duplicate')
                done()
            })
        })
    })

    describe('/POST user/login', () => {
        it('should POST credential', (done) => {
            chai.request(server)
            .post('/user/login')
            .send({
                email: 'yitomok@users.noreply.github.com',
                password: 'abc123'
            })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.an('object').with.property('token')
                token = res.body.token
                done()
            })
        })

        it('should not POST invalid credential', (done) => {
            chai.request(server)
            .post('/user/login')
            .send({
                email: 'yitomok@users.noreply.github.com',
                password: 'abc456'
            })
            .end((err, res) => {
                res.should.have.status(401)
                res.body.should.be.an('object').with.property('message', 'invalid credential')
                done()
            })
        })
    })

    describe('/POST contact', () => {
        it('should POST a contact with a token', (done) => {
            chai.request(server)
            .post('/contact')
            .set('Authorization', 'Bearer ' + token)
            .send({
                name: 'Yito Mok',
                number: '+85267891234'
            })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.an('object').with.property('message', 'ok')
                done()
            })
        })
    })

    describe('/POST contact', () => {
        it('should not POST a contact with an invalid token', (done) => {
            chai.request(server)
            .post('/contact')
            .set('Authorization', 'Bearer ' + 'an-incorrect-token')
            .send({
                name: 'Wrong Mok',
                number: '+85262347890'
            })
            .end((err, res) => {
                res.should.have.status(401)
                res.body.should.be.an('object').with.property('message', 'invalid_token')
                done()
            })
        })
    })
})
