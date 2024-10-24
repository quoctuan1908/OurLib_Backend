const { default: mongoose, Schema} = require("mongoose");



const ReaderModel = mongoose.model('docgias', new Schema({
    _id: {
        type:String
    },
    holot: {
        type: String,
        minLength: 1,
        maxLength: 50
    },
    ten: {
        type:String,
        default: 'A Cute Reader'
    },
    ngaysinh: {
        type: Date,
        default: '1-1-2000'
    },
    phai: {
        type: Boolean,
        default: true
    },
    diachi: {
        type: String
    },
    dienthoai: {
        type: String
    },
    anhdaidien: {
        type: String,
        default: null
    },
    taikhoan: {
        type: String,
        required: true,
        unique:true
    },
    matkhau: {
        type: String,
        required: true
    },
    sachdamuon: [String],
    email: {
        type: String
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'publisher'],
        default: 'user'
    }
}))

module.exports = ReaderModel;