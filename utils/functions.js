const bcrypt = require('bcryptjs')

const encryptPassword = async (password)=>{
    try {
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);
        return {statusCode: 200, message: 'encrypt success.', password: hashedPassword}
    }
    catch(err) {
        console.log(err)
        return {statusCode: 400, message: 'encrypt failed.'}
    }
}
const comparePassword = async (userPassword, passwordInDB) => {
    return await bcrypt.compare(userPassword,passwordInDB);
}
const generateCode = async (first2Letters, model) => {
    return first2Letters + (await model.countDocuments({})+1) + (new Date()).getTime();
}

module.exports = {
    encryptPassword,
    comparePassword,
    generateCode
}