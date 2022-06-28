const jwt = require('jsonwebtoken');

const MiddlewareUser = {
    verifyToken: (req, res, next) => {
        const token = req.headers.token
        if (token) {
            const accessToken = token.split(' ')[1]
            jwt.verify(accessToken, 'mk', (err, user) => {
                if (err) {
                    return res.status(403).json('token is not valid')
                }
                req.user = user
                next()
            })
        }
        else {
            return res.status(401).json("You're not authenticated")
        }
    },
    verifyTokenAndAdminUser: (req, res, next) => {
        console.log('cow')
        if (req.user.admin) {
            next()
        }
        else {
            return res.status(403).json("You're not permissions")
        }
    }
}

module.exports = MiddlewareUser