const ApiError = require("../api.error");
const PublisherService = require("../service/publisher.service");

exports.create = async (req, res, next) => {
    try {
        console.log(req.body)
        const publisherService = new PublisherService();
        const document = await publisherService.create(req.body, "PL");
        if (!document) {
            return next(
                new ApiError(400,"Publisher is already created.")
            )
        }
        return res.send(document);
    } catch (err) {
        console.log(err)
        return next(
            new ApiError(500, 'Cannot create publisher in database.')
        )
    }
}
exports.getQuantity = async (req,res) => {
    try {
        const publisherService = new PublisherService();
        const document = await publisherService.getQuantity();
        if (!document) {
            return next(
                new ApiError(404, "Books not found.")
            );
        }
        return res.send({num: document});
    } catch (err) {
        console.log(err)
        return next(
            new ApiError(500, "Cannot get this book into database.")
        )
    }    
}

exports.update = async (req, res, next) => {
    try {
        const publisherService = new PublisherService();
        const document = await publisherService.updateByFilter(req.params.id, req.body);
        if (!document) {
            return next(
                new ApiError(400, 'Update fail. Please check your filter or data')
            )
        } else res.json(document);
    } catch (err) {
        return next(
            new ApiError(500, "Cannot update publisher to database")
        )
    }
}
exports.delete = async (req, res, next) => {
    try {
        const publisherService = new PublisherService();
        const document = await publisherService.deleteByFilter({_id: req.params.id});
        if (!document) {
            return next(
                new ApiError(404, 'Publisher is not found.')
            )
        } else res.json(document);
    } catch (err) {
        return next(
            new ApiError(500, "Cannot connect to database")
        )
    }
}
exports.findAll = async (req, res, next) => {
    try {
        const publisherService = new PublisherService();
        const document = await publisherService.findAll();
        res.send(document);
    } catch (err) {
        console.log(err);
        return next(
            new ApiError(500, "Cannot connect to database")
        )
    }
}
exports.findOne = async (req, res, next) => {
    try {
        const publisherService = new PublisherService();
        const document = await publisherService.findOne({manxb: req.params.id});
        if (!document) {
            return next(
                new ApiError(404, 'Publisher is not found.')
            )
        } else res.json(document);
    } catch (err) {
        return next(
            new ApiError(500, "Cannot connect to database")
        )
    }
}
exports.deleteAll = async (req, res, next) => {
    try {
        const publisherService = new PublisherService();
        const document = await publisherService.deleteAll();
        if (!document) {
            return next(
                new ApiError(404, 'Publishers is not found.')
            )
        } else res.json(document);
    } catch (err) {
        return next(
            new ApiError(500, "Cannot delete all publishers from database")
        )
    }
}