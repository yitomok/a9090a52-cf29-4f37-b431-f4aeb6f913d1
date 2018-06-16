const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true, index: true },
    password: { type: String, required: true },
    name: String
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})

// generating a hash
userSchema.statics.hash = (password) => {
    return bcrypt.hashSync(password, 10)
}

// checking if password is valid
userSchema.methods.authenticate = function (password) {
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', userSchema)
