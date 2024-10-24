const express = require("express");
const cors = require('cors');
const config = require("./config");
const path = require('path')
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express();

const bookRouter = require("./routes/book.router");
const userRouter = require("./routes/user.router");
const trackingRouter = require("./routes/tracking.router");



app.use(cors());
app.use(express.json())
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use("/api/book", bookRouter)
app.use("/api/user", userRouter)
app.use("/api/tracking", trackingRouter)



async function startServer() {
    try {
        await mongoose.connect(config.app.mongodb);
        console.log("Connected to database");
        app.listen(config.app.port, () => {
            console.log("Backend is running on port : " + config.app.port);
        })
    } catch (err) {
        console.log("Cannot start the server : ", err);
        process.exit();
    }
}

startServer();