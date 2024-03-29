const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const config = require('../config/database');
require('../config/passport')(passport)


// Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({
                success: false,
                msg: `Failed to register ${user.name}`
            })
        } else {
            res.json({
                success: true,
                msg: `${user.name} is registered`
            })
        }
    })
});

// Autenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getuserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({
                success: false,
                msg: 'User not found'
            })
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign({
                    data: user
                }, config.secret, {
                    expiresIn: 86400 * 30
                });
                jwt.verify(token, config.secret, function (err, data) {
                    console.log(err, data);
                })
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                })
            } else {
                return res.json({
                    success: false,
                    msg: 'Wrong Password'
                })
            }
        })
    })
})

// Profile
router.get('/profile', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    res.json({
        user: req.user
    })
})

// Validate
router.get('/validate', (req, res, next) => {
    res.send("validate");
})



module.exports = router;