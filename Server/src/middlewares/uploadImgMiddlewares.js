const multer = require('multer')
const storage = multer.diskStorage({
    destination: 'src/public/images/',
    filename: (req, file, cd) => {
        cd(null, Date.now().toString() + '-' + file.originalname)
    }
})

const upload = multer({
    storage: storage
})

module.exports = {
    upload
}