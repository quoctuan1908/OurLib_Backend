const ApiError = require("../api.error");
const BookService = require("../service/book.service");
const BooksTrackingService = require("../service/bookTracking.service");
const fs = require('fs')


exports.addBook = async (req, res,next) => {
    try {
        const bookService = new BookService();
        const document = await bookService.createWithImage(req.body.data,req.file.originalname, "BK");
        if (!document) {
            return res.send("The book is already existed.");
        }
        return res.send(document);

    } catch (err) {
        console.log(err)
        return next(
            new ApiError(500, "Cannot add this book into database.")
        )
    }
}

exports.getQuantity = async (req,res,next) => {
    try {
        const bookService = new BookService();
        const document = await bookService.getQuantity();
        if (!document) {
            return next(
                new ApiError(404, "Books not found.")
            );
        }
        return res.send({num: document});

    } catch (err) {
        console.log(err)
        return next(
            new ApiError(500, "Database not found.")
        )
    }    
}

exports.borrow = async (req,res) => {
    try {
        const booksTrackingService = new BooksTrackingService();
        const document = await booksTrackingService.create(req.body,"TK");
        if (!document) {
            return res.send("The book is already existed.");
        }
        return res.send(document);

    } catch (err) {
        console.log(err)
        return next(
            new ApiError(500, "Cannot add this book into database.")
        )
    }    
}

exports.delete = async (req, res, next) => {
    try {
        const bookService = new BookService();
        const result = await bookService.deleteById(req.params.id);
        if (!result) {
            return next(
                new ApiError(404, "Book not found")
            )
        }
        await fs.unlink(req.file.path)
        return res.send("Deleted the book.")
    } catch (err) {
        console.log(err);
        return next(
            new ApiError(500, "Cannot add this book into database.")
        )
    }
}

exports.deleteAll = async (req, res, next) => {
    try {
        const bookService = new BookService()
        const result = await bookService.deleteAll();
        if (!result) {
            return res.send("Cannot delete all.")
        }
        return res.send("Deleted all.");
    } catch (err) {
        console.log(err);
        return next(
            new ApiError(500, "Cannot delete all books in database.")
        )
    }
}
exports.findAll = async (req, res, next) => {
    try {
        const bookService = new BookService();
        let result;
        if (req.query.tensach) {
            result = await bookService.findAllByFilter(req.query);
        } else {
            result = await bookService.findAll();
        }
        res.json(result);
    } catch (err) {
        console.log(err);
        return next(
            new ApiError(500, "Cannot find all books in database.")
        )
    }
}
exports.findAllByFilter = async (req, res, next) => {
    try {
        const bookService = new BookService();
        const result = await bookService.findAllByFilter();
        res.json(result);
    } catch (err) {
        console.log(err);
        return next(
            new ApiError(500, "Cannot find all books in database.")
        )
    }
}
exports.findOne = async (req, res,next) => {
    try {
        const bookService = new BookService();
        const result = await bookService.findOne(req.params.id);
        res.json(result);
    } catch (err) {
        console.log(err);
        return next(
            new ApiError(500, "Cannot add this book into database.")
        )
    }
}

exports.update = async (req, res, next) => {
    try {
        const bookService = new BookService();
        const update = await bookService.updateByIdWithImage(req.params.id, req.body.data,req.file?.originalname);
        if (update == null) {
            return res.send("Book not found");
        }
        res.send(update);
    } catch (err) {
        console.log(err);
        return next(
            new ApiError(500, "Cannot add this book into database.")
        )
    }
}