const mongoose = require('mongoose');

// module.exports = mongoose.connect('mongodb://localhost:27017/DuAn1', () => {
//     console.log("conected")
// })


module.exports = mongoose.connect('mongodb+srv://Thanhco2001:1q2w3e@cluster0.jzunbb6.mongodb.net/DuAn1?retryWrites=true&w=majority', () => {
    console.log("conected")
})