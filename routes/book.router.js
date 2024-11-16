const express = require('express')
const book = require("../controller/book.controller");
const {uploadsBook} = require('../middleware/uploadsFile.middleware');

const bookRouter = express.Router();

bookRouter.route("/")
    .get(book.findAll)
    .post(uploadsBook.single('file'),book.addBook)

bookRouter.delete("/deleteAllBooks", book.deleteAll)

bookRouter.route("/borrow")
    .post(book.borrow)

bookRouter.route("/quantity")
    .get(book.getQuantity)

bookRouter.route("/get-one/:id")
    .get(book.findOne)
    .delete(book.delete)
    .put(uploadsBook.single('file'),book.update)


module.exports = bookRouter;
