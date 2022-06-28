const jwt = require('jsonwebtoken')
const User = require('../models/User')

const UserController = {
    registerUser: async (req, res) => {
        try {
            let username = req.body.username;
            let password = req.body.password;
            let admin = req.body.admin;
            if (username && password) {
                const newUser = await new User({
                    username: username,
                    password: password,
                    admin: admin
                })
                const user = await newUser.save()
                res.status(200).json(user)
            }
            else {
                return res.status(403).json("Invalid data")
            }
        }
        catch (err) {
            return res.status(500).json(err)
        }
    },
    generateToken: (user) => {
        return jwt.sign({
            username: user.username,
            admin: user.admin
        }, 'mk', { expiresIn: "1d" })
    },
    loginUser: async (req, res) => {
        try {
            let username = req.body.username;
            let password = req.body.password;
            console.log(username, password)
            if (username && password) {
                const user = await User.findOne({
                    username: username,
                })
                if (user.password === password) {
                    let token = UserController.generateToken(user)
                    res.status(200).json({ token, message: "Login success" })
                }
                else {
                    return res.status(403).json("Wrong Username or Password")
                }
            }
            else {
                return res.status(403).json("Invalid data")
            }
        }
        catch (err) {
            return res.status(500).json(err)
        }
    },
    logoutUser: async (req, res) => {
        res.status(200).json("Logout success")
    }
}

module.exports = UserController