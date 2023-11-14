const { ObjectId } = require("mongodb");
const bcrypt = require('bcrypt');

class UserService {

    constructor(client) {
        this.User = client.db().collection("users");
    }

    async hashedPassword(password) {
        // Do phuc tap cua ma hoa
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }


    extractUserData(payload) {
        const user = {
            fullname: payload.fullname,
            email: payload.email,
            password: payload.password,
            address: payload.address,
            phone: payload.phone,
            role: "false",
        };

        // Remove undefined fields
        Object.keys(user).forEach(
            (key) => (user[key] === undefined && delete user[key])
        );
        return user;
    }


    async findByName(fullname) {
        return await this.find({
            fullname: { $regex: new RegExp(fullname), $options: "i" },
        });
    }

    async find(filter) {
        const cursor = await this.User.find(filter);
        return await cursor.toArray();
    }

    async findOne(condition) {
        try {
            const user = await this.User.findOne(condition);
            return user;
        } catch (error) {
            throw new Error('Lỗi khi tìm kiếm người dùng.');
        }
    }

    async findByEmail(email) {
        return this.User.findOne({ email });
    }

    async create(payload) {



        const user = this.extractUserData(payload);

        // Thuc hien ma hoa mat khau
        const hashedPassword = await this.hashedPassword(payload.password);

        const result = await this.User.findOneAndUpdate(
            user,
            { $set: { password: hashedPassword } }, // Luu mat khau da ma hoa
            { returnDocument: "after", upsert: true }
        );
        return result;
    }



    async comparePassword(password, hashedPassword) {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractUserData(payload);
        const result = await this.User.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;

    }

    async findById(id) {
        return await this.User.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }


}

module.exports = UserService;