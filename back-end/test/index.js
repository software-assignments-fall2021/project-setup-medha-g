/* eslint-disable camelcase */
const request = require('supertest')
const chai = require('chai')
const { expect } = require('chai')
const { token } = require('morgan')
require('dotenv').config({ silent: true })
const { ObjectId } = require('bson')

var jwt_global

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

        const characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        const charactersLength = characters.length
        const numbers = '0123456789'

        // eslint-disable-next-line prefer-const
        let randCharOne = characters.charAt(
            Math.floor(Math.random() * charactersLength)
        )

        // eslint-disable-next-line prefer-const
        let randCharTwo = characters.charAt(
            Math.floor(Math.random() * charactersLength)
        )

        let randCharThree = characters.charAt(
            Math.floor(Math.random() * charactersLength)
        )

        let randNum = numbers.charAt(
            Math.floor(Math.random() * charactersLength)
        )

        it('should register user and delete', function (done) {
            request(app)
                .post('/api/users/register')
                .send({
                    user: { username: '***', password: '***' },
                })
                .expect(200, function (err, res) {
                    let jwt = res.body.user.token

                    request(app)
                        .delete('/api/users/deleteaccount')
                        .set('Authorization', `Token ${jwt}`)
                        .send({ user: { username: '***' } })
                        .expect(200, function (err, res) {
                            if (err) done(err)

                            done()
                        })
                })
        })

        it('should register user and add subscription information', function (done) {
            request(app)
                .post('/api/users/register') //registers user
                .send({
                    user: {
                        username: '***',
                        password: '***',
                    },
                })
                .expect(200, function (err, res) {
                    let jwt = res.body.user.token
                    jwt_global = res.body.user.token

                    mock_sub = {
                        image: randCharThree,
                        title: randCharThree,
                        description: randCharThree,
                        tags: [randCharThree],
                        plan: {
                            price: randNum,
                            time_quantity: randNum,
                            time_unit: randCharThree,
                        },
                    }

                    request(app)
                        .post('/api/users/addsubscriptioninfo') //adds subscription information
                        .set('Authorization', `Token ${jwt}`)
                        .send({ sub_info: mock_sub, payload: { _id: jwt } })
                        .expect(200, function (err, res) {
                            if (err) done(err)
                            chai.expect(res.body.sub_info).to.deep.equal(
                                mock_sub
                            )

                            request(app)
                                .delete('/api/users/deleteaccount')
                                .set('Authorization', `Token ${jwt}`)
                                .send({ user: { username: '***' } })
                                .expect(200, function (err, res) {
                                    if (err) done(err)

                                    done()
                                })
                        })
                })
        })
        it('should remove subscription information', function (done) {
            request(app)
                .post('/api/users/register') //registers user
                .send({
                    user: {
                        username: '***',
                        password: '***',
                    },
                })
                .expect(200, function (err, res) {
                    let jwt = res.body.user.token
                    jwt_global = res.body.user.token

                    mock_sub = {
                        image: randCharThree,
                        title: randCharThree,
                        description: randCharThree,
                        tags: [randCharThree],
                        plan: {
                            price: randNum,
                            time_quantity: randNum,
                            time_unit: randCharThree,
                        },
                    }

                    request(app)
                        .post('/api/users/addsubscriptioninfo') //adds subscription information
                        .set('Authorization', `Token ${jwt}`)
                        .send({ sub_info: mock_sub, payload: { _id: jwt } })
                        .expect(200, function (err, res) {
                            if (err) done(err)
                            chai.expect(res.body.sub_info).to.deep.equal(
                                mock_sub
                            )

                            request(app)
                                .post('/api/users/removesubscriptioninfo') //removes subscription information
                                .set('Authorization', `Token ${jwt}`)
                                .send({
                                    body: { sub_info: randCharThree },
                                    payload: { _id: jwt },
                                })
                                .expect(200, function (err, res) {
                                    if (err) done(err)
                                    chai.expect(res.body.message).to.equal(
                                        'Deleted subscription'
                                    )
                                    request(app)
                                        .delete('/api/users/deleteaccount')
                                        .set('Authorization', `Token ${jwt}`)
                                        .send({ user: { username: '***' } })
                                        .expect(200, function (err, res) {
                                            if (err) done(err)

                                            done()
                                        })
                                })
                        })
                })
        })
    })
    describe('Plaid API', function () {
        var jwt = null

        it('should create a link token', function (done) {
            request(app)
                .post('/api/users/register') //registers a new user
                .send({
                    user: {
                        username: '***',
                        password: '***',
                    },
                })
                .expect(200, function (err, res) {
                    jwt = res.body.user.token
                    // jwt_global = jwt;
                    // window.localStorage.setItem('jwt_local_storage', jwt);
                    // console.log("hi:", jwt_global)
                    request(app)
                        .get('/api/plaid/create_link_token') //creates link token
                        .set('Authorization', `Token ${jwt}`)
                        .send({
                            username: '***',
                        })
                        .expect(200, function (err, res) {
                            expect(Object.keys(res.body)).to.include(
                                'link_token'
                            )
                            // console.log("res", res.onSuccess(res.body.link_token))
                            linkToken = res.body.link_token
                            request(app)
                                .delete('/api/users/deleteaccount')
                                .set('Authorization', `Token ${jwt}`)
                                .send({ user: { username: '***' } })
                                .expect(200, function (err, res) {
                                    if (err) done(err)

                                    done()
                                })
                        })
                })
        }) //need to mock plaid middleware
        // it('should create an access token', function (done) {
        //     request(app)
        //         .get('/api/plaid/get_access_token') //creates link token
        //         .set('Authorization', `Token ${jwt}`)
        //         .send({
        //             username: randUsername + randPassword + randPassword,
        //         })
        //         .expect(200, function (err, res) {
        //             expect(Object.keys(res.body)).to.include('access_token')
        //             done()
        //         })
        // })
    })
    // describe('Database Maintenance', function () {
    //     const characters =
    //         'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    //     const charactersLength = characters.length

    //     // eslint-disable-next-line prefer-const
    //     let randCharOne = characters.charAt(
    //         Math.floor(Math.random() * charactersLength)
    //     )

    //     // eslint-disable-next-line prefer-const
    //     let randCharTwo = characters.charAt(
    //         Math.floor(Math.random() * charactersLength)
    //     )

    //     let randCharThree = characters.charAt(
    //         Math.floor(Math.random() * charactersLength)
    //     )

    //         it('should delete all users in the database', function (done) {
    //             request(app)
    //             .post('/api/users/register') //registers user
    //             .send({
    //                 user: {
    //                     username: randCharOne + randCharTwo + randCharTwo,
    //                     password: randCharTwo,
    //                 },
    //             })
    //             .expect(200, function (err, res) {
    //                 let jwt = res.body.user.token

    //                 const id  = new ObjectId(jwt);
    //                 request(app)
    //                     .delete('/db/maintenance/deleteallusers') //deletes all users
    //                     .send(
    //                         { _id:{id}

    //                     })
    //                     .expect(200, function (err, res) {
    //                         if (err) done(err)
    //                         chai.expect(res.body.message).to.equal(
    //                             'Success'
    //                         )
    //                         done()
    //                     })
    //             })
    //         })
    // })
})
