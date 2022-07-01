const multer = require('multer');
const imgFilter = require('../config/imgFilter')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        console.log(file)
        cb(null, file.originalname);
    }
});

const upload = multer({ dest: './public/uploads/', storage: storage, fileFilter: imgFilter.imgFilter })

const MiddlewareStudent = {
    handleUpload: upload.single('avatar')
}

module.exports = MiddlewareStudent