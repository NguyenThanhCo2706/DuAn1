const express = require('express')
const multer = require('multer');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const mongoose = require('./config/mongoConnect');
const user = require('./routes/User')
const student = require('./routes/Student')
const bodyParser = require('body-parser')
const port = 3001;
const Users = require('./models/User')


const app = express()


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use('/user', user)
app.use('/student', student)
app.use(express.static(path.join(__dirname)));
console.log(path.join(__dirname ))

app.get('/', async (req, res) => {
    const users = await Users.find()
    res.status(200).json(users)
})

app.listen(port, () => {
    console.log('listening on port http://localhost:' + port);
})