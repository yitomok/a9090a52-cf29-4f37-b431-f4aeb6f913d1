const User = require('../model/user')

const jwt = require('jsonwebtoken')
const router = module.exports = require('express').Router()

router.post('/', (req, res) => {
    if (req.body.username && req.body.password) {
        return User.create({
            username: req.body.username,
            password: User.hash(req.body.password),
            name: req.body.name || '',
            email: req.body.email || ''
        })
        .then((user) => {
            if (user) {
                return res.json({ 'message': 'ok' })
            } else {
                return res.status(500).json({ 'message': 'error' })
            }
        })
        .catch((error) => {
            return res.status(400).json({ 'message': 'duplicate' })
        })
    } else {
        return res.status(400).json({ 'message': 'invalid' })
    }
})

router.post('/login', (req, res) => {
    if (req.body.username && req.body.password) {
        return User.findOne({
            username: req.body.username
        }).exec()
        .then((user) => {
            if (user && user.authenticate(req.body.password)) {
                const userObject = user.toObject()
                delete userObject.password
                return res.json({
                    'token': jwt.sign(userObject, user.password, {
                        expiresIn: Number(process.env.TOKEN_TTL) || 3600
                    })
                })
            } else {
                return res.status(401).json({ 'message': 'invalid credential' })
            }
        })
    } else {
        res.status(400).json({ 'message': 'invalid' })
    }

    res.json({ 'token': jwt.sign(user.toObject(), user.password, { expiresIn: expiry }) })
})
