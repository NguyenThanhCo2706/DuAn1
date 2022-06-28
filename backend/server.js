const express = require('express')
const mongoose = require('mongoose');
const user = require('./routes/User')
const student = require('./routes/Student')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const port = 3001;
const Users = require('./models/User')


mongoose.connect('mongodb://localhost:27017/DuAn1', () => {
    console.log("conected")
})

const app = express()

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cookieParser());

app.use('/user', user)
app.use('/student', student)

app.get('/', async (req, res) => {
    const users = await Users.find()
    res.status(200).json(users)
})

app.listen(port, () => {
    console.log('listening on port http://localhost:' + port);
})