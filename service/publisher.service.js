const publisherModel = require("../model/publisher.model");
const CRUDService = require("./CRUDService");

class PublisherService extends CRUDService {
    constructor() {
        super(publisherModel)
    }
}

module.exports = PublisherService;