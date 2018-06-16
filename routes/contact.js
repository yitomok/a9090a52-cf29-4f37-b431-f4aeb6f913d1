const admin = require('firebase-admin')

admin.initializeApp({
    credential: admin.credential.cert({
        'type': 'service_account',
        'project_id': 'backend-strv',
        'private_key_id': process.env.PRIVATE_KEY_ID,
        'private_key': process.env.PRIVATE_KEY,
        'client_email': 'backend-strv@appspot.gserviceaccount.com',
        'client_id': '118314159875844654138',
        'auth_uri': 'https://accounts.google.com/o/oauth2/auth',
        'token_uri': 'https://accounts.google.com/o/oauth2/token',
        'auth_provider_x509_cert_url': 'https://www.googleapis.com/oauth2/v1/certs',
        'client_x509_cert_url': 'https://www.googleapis.com/robot/v1/metadata/x509/backend-strv%40appspot.gserviceaccount.com'
    })
})

const db = admin.firestore()

const router = module.exports = require('express').Router()

router.post('/', (req, res) => {
    if (req.body.name && req.body.number) {
        return db.collection('contacts')
        .add({
            name: req.body.name,
            email: req.body.email || '',
            number: req.body.number,
            createdBy: res.locals.username,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        .then((ref) => {
            if (ref && ref.id) {
                return res.json({ 'message': 'ok' })
            } else {
                return res.status(500).json({ 'message': 'error' })
            }
        })
        .catch((error) => {
            return res.status(500).json({ 'message': 'error' })
        })
    } else {
        return res.status(400).json({ 'message': 'invalid' })
    }
})
