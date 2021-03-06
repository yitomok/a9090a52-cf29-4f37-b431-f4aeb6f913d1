const jwt = require('jsonwebtoken')

const User = require('./model/user')

module.exports = (req, res, next) => {
    let auth = req.get('Authorization')
    let token = (auth || '').replace(/^[Bb]earer/, '').trim()

    if (auth) {
        let claimedUser = jwt.decode(token)
        if (claimedUser && claimedUser.email) {
            return User.findOne({
                email: claimedUser.email
            }, 'password').exec()
            .then((user) => {
                jwt.verify(token, user.password, (error, decoded) => {
                    if (error) {
                        res.set('WWW-Authenticate', 'Bearer realm="backend-strv", error="invalid_token"')
                        .status(401).json({ 'message': 'invalid_token' })
                    } else {
                        res.locals.email = decoded.email
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
