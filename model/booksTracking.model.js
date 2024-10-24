const { default: mongoose, Schema} = require("mongoose");


const BooksTrackingModel = mongoose.model('theodoimuonsachs', new Schema({
    _id: {
        type:String
    },
    masach: { 
        type: String,
        ref: 'books',
        required: true,
    },
    madocgia: {
        type: String,
        ref: 'readers',
        required: true
    },
    tensach: {
        type: String,
        ref: 'books',
        default: null
    },
    tendocgia: {
        type: String,
        ref: 'docgias',
        default: null
    },
    ngayyeucau: {
        type: Date,
        default: new Date()
    },
    ngaymuon: {
        type: Date,
        default: null
    },
    ngaytra: {
        type: Date,
        default: null
    },
    hantra: {
        type: Date,
        default: null
    },
    trangthai: {
        type: String,
        enum: ['processing', 'borrowing', 'returned'],
        default: 'processing'
    }
}))

module.exports = BooksTrackingModel;