const express = require('express')
const request = require('supertest')
const chai = require('chai')
require('dotenv').config({ silent: true })


describe('Server', function () {
    let date, server
    const app = require('../app')

    this.timeout(5000);

    before(function (done) {
        server = app.listen(process.env.PORT, function (err) {
            if (err) {
                return done(err)
            }
            done()
        })
    })

    beforeEach(function () {
        date = new Date()
    })

    after(function () {
        server.close()
        console.log('All tests done')
    })

    afterEach(function () {
        console.log('Tested on ', date)
    })

    it('should be up', function (done) {
        request(app)
            .get('/api/test/checkup')
            .expect('Content-Type', /json/)
            .expect(200, function (err, res) {
                if (err) return done(err)

                const message = res.body.up
                chai.expect(message).to.equal(true)
                done()
            })
    })
})
