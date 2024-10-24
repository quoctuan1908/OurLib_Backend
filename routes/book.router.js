const express = require('express')
const book = require("../controller/book.controller");
const uploads = require('../middleware/uploadsFile.middleware');

const bookRouter = express.Router();

bookRouter.route("/")
    .get(book.findAll)
    .post(uploads.single('file'),book.addBook)

bookRouter.delete("/deleteAllBooks", book.deleteAll)

bookRouter.route("/borrow")
    .post(book.borrow)

bookRouter.route("/quantity")
    .get(book.getQuantity)

bookRouter.route("/get-one/:id")
    .get(book.findOne)
    .delete(book.delete)
    .put(uploads.single('file'),book.update)


module.exports = bookRouter;
