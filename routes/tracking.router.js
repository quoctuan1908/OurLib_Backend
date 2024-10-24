const express = require('express')
const booksTracking = require("../controller/booksTracking.controller");
const uploads = require('../middleware/uploadsFile.middleware');

const trackingRouter = express.Router();

trackingRouter.route("/")
    .get(booksTracking.findAll)
    .post(booksTracking.create)

trackingRouter.delete("/deleteAllBooks", booksTracking.deleteAll)

trackingRouter.route("/get-one/:id")
    .get(booksTracking.findOne)
    .delete(booksTracking.delete)
    .put(booksTracking.update)

trackingRouter.route("/get-one/accept/:id")
    .post(booksTracking.acceptRequest)

module.exports = trackingRouter;
