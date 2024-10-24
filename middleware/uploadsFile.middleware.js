const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req,file,cb)=> {
        cb(null,'./public/data/uploads/')
    },
    filename: (req,file,cb)=> {
        cb(null, `${file.fieldname}-${Date.now()}`);
    }
})

const uploads = multer({storage: storage})

module.exports = uploads;
