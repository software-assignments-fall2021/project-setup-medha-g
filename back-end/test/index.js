/* eslint-disable camelcase */
const request = require('supertest')
const chai = require('chai')
require('dotenv').config({ silent: true })

describe('Server', function () {
    let server
    const app = require('../app')
    
    this.timeout(5000)

    before(function (done) {
        server = app.listen(3000, function (err) {
            if (err) {
                return done(err)
            }
            done()
        })
    })

    after(function () {
        server.close()
    })

    it('should be up', function (done) {
        request(app)
            .get('/api/test/checkup')
            .expect(200, function (err, res) {
                if (err) return done(err)

                const message = res.body.up
                chai.expect(message).to.equal(true)
                done()
            })
    })

    describe('User Module', function () {
        it('should recognize admin', function (done) {
            const user_admin = process.env.ADMIN_USER
            const user_pass = process.env.ADMIN_PASS

            request(app)
                .post('/api/users/login')
                .send({ user: { username: user_admin, password: user_pass } })
                .expect(200, function (err, res) {
                    request(app)
                        .get('/api/users/current')
                        .set('Authorization', `Token ${res.body.user.token}`)
                        .expect(200, function (err, res) {
                            if (err) done(err)

                            chai.expect(res.body.user.username).to.equal(
                                'admin'
                            )
                            done()
                        })
                })
        })

        it('should recognize invalid jwt', function (done) {
            request(app)
                .get('/api/users/getsublist')
                .set('Authorization', `Token badToken`)
                .expect(401, function (err, res) {
                    done()
                })
        })

        it('should recognize valid jwt', function (done) {
            const user_admin = process.env.ADMIN_USER
            const user_pass = process.env.ADMIN_PASS

            request(app)
                .post('/api/users/login')
                .send({ user: { username: user_admin, password: user_pass } })
                .expect(200, function (err, res) {
                    request(app)
                        .get('/api/test/checkAuthorize')
                        .set('Token', res.body.user.token)
                        .expect(200, function (err, res) {
                            if (err) done(err)

                            chai.expect(res.body.message).to.equal(
                                'If you see this mesasage you are authorized.'
                            )
                            done()
                        })
                })
        })

    
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        
        // eslint-disable-next-line prefer-const
        let randCharOne = characters.charAt(Math.floor(Math.random() * 
        charactersLength))

        // eslint-disable-next-line prefer-const
        let randCharTwo = characters.charAt(Math.floor(Math.random() * 
        charactersLength))

        it('should register user', function (done) {

            request(app)

            .post('/api/users/register')
            .send({ user: { username: randCharOne, password: randCharTwo } })
            .expect(200, function (err, res) {
                done()
                
            })
        })

        it('should delete user', function (done) {

            request(app)

            .post('/api/users/register')
            .send({ user: { username: randCharOne } })
            .expect(200, function (err, res) {
                done()
            })
        })
        
    })
})
