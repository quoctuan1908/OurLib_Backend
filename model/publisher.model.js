const { default: mongoose, Schema } = require("mongoose");

const publisherModel = mongoose.model('nhaxuatbans', new Schema({
    _id: {
        type: String
    },
    tennxb: {
        type: String,
        default: 'anonymous',
        minLength: 1,
        maxLength: 50
    },
    diachi: {
        type: String,
        maxLength: 50
    }
}))

module.exports = publisherModel;