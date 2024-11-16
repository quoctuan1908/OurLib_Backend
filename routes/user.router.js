const express = require('express')
const publisher = require("../controller/publisher.controller");
const reader = require("../controller/reader.controller")

const {uploadsAvatar} = require('../middleware/uploadsFile.middleware');
const verifyToken = require('../middleware/auth.middleware');

const userRouter = express.Router();


userRouter.route("/publisher")
    .get(publisher.findAll)
    .post(publisher.create)

userRouter.delete("/publisher/deleteAllUser",verifyToken, publisher.deleteAll)

userRouter.route("/publisher/quantity")
    .get(publisher.getQuantity)

userRouter.route("/publisher/get-one/:id")
    .get(publisher.findOne)
    .delete(verifyToken,publisher.delete)
    .put(verifyToken,uploadsAvatar.single(), publisher.update)


userRouter.route("/reader")
    .get(verifyToken,reader.findAll)

userRouter.route("/reader/signup")
    .post(uploadsAvatar.single(),reader.register)

userRouter.route("/reader/login")
    .post(uploadsAvatar.single(),reader.login)

userRouter.delete("/reader/deleteAllBooks", verifyToken,reader.deleteAll)

userRouter.route("/reader/get-one/changepassword/:id")
    .put(uploadsAvatar.single(), reader.changePassword)

userRouter.route("/reader/get-one/:id")
    .get(verifyToken,reader.findOne)
    .delete(verifyToken,reader.delete)
    .put(verifyToken,uploadsAvatar.single('file'),reader.update)



userRouter.route("/reader/quantity")
    .get(reader.getQuantity)

module.exports = userRouter;