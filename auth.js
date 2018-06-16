const jwt = require('jsonwebtoken')

const User = require('./model/user')

module.exports = (req, res, next) => {
    let auth = req.get('Authorization')
    let token = (auth || '').replace(/^[Bb]earer/, '').trim()

    if (auth) {
        let claimedUser = jwt.decode(token)
        if (claimedUser && claimedUser.username) {
            return User.findOne({
                username: claimedUser.username
            }, 'password').exec()
            .then((user) => {
                jwt.verify(token, user.password, (error, decoded) => {
                    if (error) {
                        res.set('WWW-Authenticate', 'Bearer realm="backend-strv", error="invalid_token"')
                        .status(401).json({ 'message': 'invalid_token' })
                    } else {
                        res.locals.username = decoded.username
                        next()
                    }
                })
            })
        } else {
            res.set('WWW-Authenticate', 'Bearer realm="backend-strv", error="invalid_token"')
            .status(401).json({ 'message': 'invalid_token' })
        }
    } else {
        res.sendStatus(401)
    }
}
