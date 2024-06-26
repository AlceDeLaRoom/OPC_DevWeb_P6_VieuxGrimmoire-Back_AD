const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true, validate : function(value){
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    },
    message : 'Please enter a valid email address.'
 },
    password: { type: String, required: true },
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)