const { ObjectId } = require("mongodb");
const bcrypt = require('bcrypt');

class AdminService {

    constructor(client) {
        this.Admin = client.db().collection("NhanVien");
    }

    async hashedPassword(password) {
        // Do phuc tap cua ma hoa
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }


    extractAdminData(payload) {
        const admin = {
            adminname: payload.adminname,
            email: payload.email,
            password: payload.password,
            address: payload.address,
            phone: payload.phone,
            chucvu: payload.chucvu,
            role: "true",
        };

        // Remove undefined fields
        Object.keys(admin).forEach(
            (key) => (admin[key] === undefined && delete admin[key])
        );
        return admin;
    }



    async findByEmail(email) {
        return this.Admin.findOne({ email });
    }

    async create(payload) {

        const admin = this.extractAdminData(payload);

        // Thuc hien ma hoa mat khau
        const hashedPassword = await this.hashedPassword(admin.password);
        console.log("admin", hashedPassword);

        const result = await this.Admin.findOneAndUpdate(
            admin,
            { $set: { password: hashedPassword } }, // Luu mat khau da ma hoa
            { returnDocument: "after", upsert: true }
        );
        console.log(result);
        return result;
    }


    async comparePassword(password, hashedPassword) {
        // const isMatch = await bcrypt.compare(password, hashedPassword);
        let check = false;
        if (password === hashedPassword) {
            check = true;
        }
        return check;
    }

    async findByName(fullname) {
        return await this.Admin.find({
            fullname: { $regex: new RegExp(fullname), $options: "i" },
        });
    }

    async find(filter) {
        const cursor = await this.Admin.find(filter);
        return await cursor.toArray();
    }

}

module.exports = AdminService;