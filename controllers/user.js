const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            })
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur enregistré!'}))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
}

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user){
                res.status(401).json({ message: "Paire nom d'utilisateur/mot de passe incorrecte!" })
            } else {
                bcrypt
                    .compare(req.body.password, user.password)
                    .then( valid => {
                        if (!valid){
                            res.status(401).json({ message: "Paire nom d'utilisateur/mot de passe incorrecte!" })
                        }
                        res.status(200).json({ 
                            userId: user._id,
                            token: jwt.sign(
                                { userId: user._id},
                                'RANDOM_KEY_TOKEN',
                                { expiresIn: '24h'}
                            )    
                        })
                    })
                    .catch(error => res.status(500).json({ error }))
            }
        })
        .catch(error => res.status(500).json({ error }))
}