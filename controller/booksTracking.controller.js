const ApiError = require("../api.error");
const BookService = require("../service/book.service");
const BooksTrackingService = require("../service/bookTracking.service")


exports.acceptRequest = async (req,res) => {
    try {
        const booksTrackingService = new BooksTrackingService();
        console.log(req.params.id)
        const document = await booksTrackingService.acceptRequest(req.params.id);
        if (!document) {
            return res.send("Book not found");
        }
        return res.send(document);
    } catch(err) {
        console.log(err)
        return next(
            new ApiError(500, "Cannot add this book into database.")
        )
    }
}

exports.create = async (req, res,next) => {
    try {
        const booksTrackingService = new BooksTrackingService();
        const document = await booksTrackingService.create(req.body);
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

exports.delete = async (req, res) => {
    try {
        const booksTrackingService = new BooksTrackingService();
        const result = await booksTrackingService.deleteById(req.params.id);
        if (!result) {
            return res.send("The request is not found");
        }
        return res.send("Deleted the request.")
    } catch (err) {
        console.log(err);
        return next(
            ApiError(500, "Cannot delete this Request.")
        )
    }
}

exports.deleteAll = async (req, res) => {
    try {
        const bookService = new BooksTrackingService(MongoDB.client)
        const result = await bookService.deleteAll();
        if (!result) {
            return res.send("Cannot delete all.")
        }
        return res.send("Deleted all.");
    } catch (err) {
        console.log(err);
        return res.send("Cannot delete all users in database.")
    }
}

exports.findAll = async (req, res, next) => {
    try {
        const booksTrackingService = new BooksTrackingService();
        let result;
        if (req.query.masach || req.query.madocgia) {
            result = await booksTrackingService.findAllByFilter(req.query);
            console.log("Hello heerre")
        } else {
            result = await booksTrackingService.findAll();
        }
        res.json(result);
    } catch (err) {
        console.log(err);
        return next(
            ApiError(500, "Cannot find all books in database.")
        )
    }
}
exports.findOne = async (req, res,next) => {
    try {   
        const bookService = new BooksTrackingService();
        const result = await bookService.findOne(req.params.id);
        res.json(result);
    } catch (err) {
        console.log(err);
        return next(
            new ApiError(500, "Cannot find requests database.")
        )
    }
}

exports.update = async (req, res) => {
    try {
        const booksTrackingService = new BooksTrackingService();
        const updateTracking = await booksTrackingService.acceptReturn(req.params.id);
        if (!updateTracking) {
            return res.send("Book not found");
        }
        res.send(updateTracking);
    } catch (err) {
        console.log(err);
        return next(
            ApiError(500, "Cannot add this book into database.")
        )
    }
}