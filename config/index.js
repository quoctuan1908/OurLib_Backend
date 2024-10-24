require('dotenv').config();

const config = {
    app: {
        port: process.env.PORT,
        mongodb: process.env.MONGODB_URI || "mongodb://127.0.0.1/27017/Book_Manager"
    },
    key: {
        jwt_key: process.env.SECRETKEY
    }
}

module.exports = config;