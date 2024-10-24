const { default: mongoose, Schema} = require("mongoose");


const BookModel = mongoose.model('sachs', new Schema({
    _id: {
        type: String
    },
    tensach: {
        type: String,
        minLength: 1,
        maxLength: 100,
        required: true
    },
    dongia: {
        type:Number,
        default: 0.0,
    },
    soquyen: {
        type: Number,
        default: 1,
        min: [0, "Out of stock"]
    },
    namxuatban: {
        type: Date,
        default: new Date()
    },
    manxb: {
        type: String,
        ref: "nhaxuatbans"
    },
    tacgia: {
        type: String,
        default: 'anomynous'
    },
    image: {
        type: String
    },
    category: [String],
    rate: {
        type: Number,
        default: 10
    },
    status: {
        type: Boolean,
        default: true
    },
    view: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        default: "This book doesn't have description."
    },
    createAt: {
        type: Date,
        default: new Date()
    },
    updateAt: {
        type: Date,
        default: new Date()
    }
}))

module.exports = BookModel;