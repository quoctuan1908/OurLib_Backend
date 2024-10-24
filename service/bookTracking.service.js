const CRUDService = require("./CRUDService");
const BooksTrackingModel = require("../model/booksTracking.model");
const BookService = require("./book.service");
const ReaderService = require("./reader.service");


class BooksTrackingService extends CRUDService {
    constructor() {
        super(BooksTrackingModel)
    }

    async acceptRequest(id) {
        const trackingData = await super.findOne(id)
        const bookService = new BookService()
        //Decrease this book's quantity
        console.log("Hello")
        const result = await bookService.updateQuantity(trackingData.masach,{soquyen: -1, view: 1});
        if (result.statusCode == 400) {
            return result
        }
        const updatedDate = {
            trangthai: "borrowing",
            hantra: new Date((new Date()).getTime() + 1000*60*60*24*14),
            ngaymuon: new Date()
        }
        
        return await super.updateById({_id: id}, updatedDate)
    }   

    async refuseRequest(id) {
        console.log(id)
        return await super.deleteById({_id: id})
    }

    async acceptReturn(id) {
        const trackingData = await super.findOne(id)
        const bookService = new BookService()
        //Increase this book's quantity
        await bookService.updateQuantity(trackingData.masach, {soquyen: 1});
        const data = {
            ngaytra: new Date(),
            trangthai: 'returned'
        }
        return await super.updateById({_id: id}, data)
    }
}

module.exports = BooksTrackingService;