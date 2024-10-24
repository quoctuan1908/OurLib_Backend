const CRUDService = require("./CRUDService");
const BookModel = require("../model/book.model");

class BookService extends CRUDService {
    constructor() {
        super(BookModel)
    }
    async updateQuantity(id,fields) {
        const validateQuantity = await BookModel.findOne({_id: id});
        if(fields.soquyen < 0 && validateQuantity.soquyen == 0)  {
            return {statusCode: 400, message: 'Out of stock'}
        }
        return await BookModel.updateOne({_id:id}, {$inc : fields})
    }

}

module.exports = BookService;