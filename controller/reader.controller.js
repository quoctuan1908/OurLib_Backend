const jwt = require("jsonwebtoken");
const ApiError = require("../api.error");
const ReaderService = require("../service/reader.service");
const config = require("../config");



exports.delete = async (req, res) => {
    try {
        const readerService = new ReaderService();
        const result = await readerService.delete(req.params.id);
        if (!result) {
            return res.send("The reader is not found");
        }
        return res.send("Deleted the reader.")
    } catch (err) {
        console.log(err);
        return next(
            ApiError(500, "Cannot add this reader into database.")
        )
    }
}
exports.deleteAll = async (req, res) => {
    try {
        const readerService = new ReaderService()
        const result = await readerService.deleteAll();
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
        const readerService = new ReaderService();
        const result = await readerService.findAll({});
        res.json(result);
    } catch (err) {
        console.log(err);
        return next(
            ApiError(500, "Cannot find all readers in database.")
        )
    }
}
exports.findOne = async (req, res, next) => {
    try {
        const readerService = new ReaderService();
        const result = await readerService.findOne(req.params.id);
        
        res.json(result);
    } catch (err) {
        console.log(err);
        return next(
            ApiError(500, "Cannot add this reader into database.")
        )
    }
}

exports.getQuantity = async (req,res) => {
    try {
        const readerService = new ReaderService();
        const document = await readerService.getQuantity();
        console.log(document)
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

exports.login = async (req,res,next) => {
    const loginData = JSON.parse(req.body.data);
    console.log(loginData)
    try {
        const readerService = new ReaderService();
        const user = await readerService.login(loginData.username, loginData.password);
        if (user.statusCode != 200) {
            return res.send(user);
        }
        const token = jwt.sign({ id: user.id },config.key.jwt_key,{
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: 86400, // 24 hours
        });
        return res.send({
            "name": user.data.holot + " " + user.data.ten,
            "id": user.data._id,
            "token": token,
            "role":user.data.role,
            "statusCode": user.statusCode,
            "message": user.message,
        })
    } catch(err) {
        console.log(err);
        return next(new ApiError(500, "Server Error"))
    }
}
exports.register = async (req, res,next) => {
    try {
        const signUpData = JSON.parse(req.body.data);
        
        console.log(signUpData)
        const readerService = new ReaderService();
        const document = await readerService.create(signUpData);
        if (!document) {
            return res.send("The reader is already existed.");
        }
        return res.send(document);

    } catch (err) {
        console.log(err)
        return next(
            new ApiError(500, "Cannot add this reader into database.")
        )
    }
}
exports.update = async (req, res, next) => {
    try {
        const readerService = new ReaderService();
        const update = await readerService.updateById(req.body);
        if (update == null) {
            return res.send("Reader not found");
        }
        res.send(update);
    } catch (err) {
        console.log(err);
        return next(
            ApiError(500, "Cannot add this reader into database.")
        )
    }
}

