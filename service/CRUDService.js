const { generateCode } = require("../utils/functions");


class CRUDService {

    constructor(model) {
        this.model = model;
    }

    async create(data, first2letters) {
        data._id = await generateCode(first2letters, this.model);
        return await this.model.create(data);
    }
    
    async createWithImage(data, img, first2letters) {
        const parsedData = JSON.parse(data);
        parsedData._id = await generateCode(first2letters, this.model);
        const dataWithImage = {...parsedData, image:img};
        return await this.model.create(dataWithImage);
    }

    async findAll() {
        return await this.model.find({});
    }

    async findAllByFilter(filter) {
        const key = Object.keys(filter)[0]
        const value = filter[key]
        const filterObj = {}
        filterObj[key] ={$regex : new RegExp(encodeURI(value),"i")}
        return await this.model.find(filterObj)
    }

    async findById(id){
        return await this.model.findById({_id:id});
    }

    async findOne(id) {
        return await this.model.findOne({_id: id});
    }

    async deleteById(id) {
        return await this.model.deleteOne({_id:id})
    }

    async deleteByFilter(filter) {
        return await this.model.deleteOne(filter)
    }

    async deleteAll() {
        return await this.model.deleteAll();
    }

    async updateById(id, data) {
        return await this.model.updateOne({_id:id},data);
    }

    async updateByIdWithImage(id, data, img) {
        const parsedData = JSON.parse(data);
        const dataWithImage = {...parsedData, image:img};
        return await this.model.updateOne({_id:id},dataWithImage);
    }

    async updateByFilter(filter, data) {
        return await this.model.updateOne(filter,data);
    }

    async getQuantity() {
        return await this.model.countDocuments({})
    }
}

module.exports = CRUDService;