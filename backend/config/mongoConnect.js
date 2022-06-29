const mongoose = require('mongoose');

module.exports = mongoose.connect('mongodb://localhost:27017/DuAn1', () => {
    console.log("conected")
})