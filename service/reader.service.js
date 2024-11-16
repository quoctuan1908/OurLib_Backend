const CRUDService = require("./CRUDService");
const ReaderModel = require("../model/reader.model");
const { encryptPassword, comparePassword, generateCode } = require("../utils/functions");
const ApiError = require("../api.error");
const { default: mongoose } = require("mongoose");


class ReaderService extends CRUDService {
    constructor() {
        super(ReaderModel)
    }

    extractUserData(data) {
        const extractedData = {
            holot: data.lastname,
            ten: data.firstname,
            ngaysinh: data.birthday,
            phai: data.gender,
            diachi: data.address,
            dienthoai: data.phonenumber,
            anhdaidien: data.avatar,
            taikhoan: data.username,
            matkhau: data.password,
            sachdamuon: data.borrowedBooksList,
            email: data.email,
            role: data.role
        }
        return extractedData;
    }

    async create(data) {
        let extractedData = this.extractUserData(data);
        extractedData._id = await generateCode("US", ReaderModel); 
        const document = await encryptPassword(extractedData.matkhau);
        if (document.statusCode == 200) {
            extractedData.matkhau = document.password;
            return await ReaderModel.create(extractedData);
        } else {
            return new ApiError(document.statusCode, document.message);
        }
    }

    async login(username,password) {
        const user = await ReaderModel.findOne({taikhoan: username});
        if (!user) {
            return {statusCode: 401,message:"User isn't existed."};
        }
        console.log(user)
        const isCorrectPassword = await comparePassword(password, user.matkhau);

        console.log(isCorrectPassword)
        if (!isCorrectPassword) {
            return {statusCode: 401, message:"Wrong password"};
        }
        return {statusCode: 200,message: "Login success.", data: user};
    }

    async updateById(data) {
        console.log(data)
        return await ReaderModel.findOneAndUpdate({"_id":data._id}, data, {returnOriginal: false})
    }

    async changePassword(id, newPass) {
        const document = await encryptPassword(newPass)
        return await ReaderModel.findOneAndUpdate({"_id":id}, {matkhau: document.password}, {returnOriginal: false})
    }
}

module.exports = ReaderService;