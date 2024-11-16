const multer = require('multer');

const storage1 = multer.diskStorage({
    destination: (req,file,cb)=> {
        cb(null,'./public/data/uploads/')
    },
    filename: (req,file,cb)=> {
        cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
    }
})


const storage2 = multer.diskStorage({
    destination: (req,file,cb)=> {
        cb(null,'./public/data/uploads/avatar')
    },
    filename: (req,file,cb)=> {
        cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
    }
})


const uploadsBook = multer({storage: storage1})
const uploadsAvatar = multer({storage: storage2})

module.exports = {
    uploadsBook,
    uploadsAvatar
};
