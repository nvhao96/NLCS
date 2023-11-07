const { ObjectId } = require("mongodb");

class UserService {
    constructor(client) {
        this.register = client.db().collection("Users");
    }

    extractUsersFromDB(payload) {
        const users = {
            name: payload.name,
            email: payload.email,
            phone: payload.phone,
            password: payload.password,
            rule: payload.rule,
        };

        Object.keys(users).forEach(
            (key) => users[key] === undefined && delete users[key]
        );
        return users;
    }

    async create(payload) {
        const users = this.extractUsersFromDB(payload);
        console.log(users);
        const result = await this.registerRouter.findOneAndUpdate(
            users,
            { $set: { rule: users.rule === true } },
            { returnDocument: "after", upsert: true, maxTimeMS: 30000 }
        );
        return { success: true, user: result.value };
        // console.log(result);
    };

    async getAllUsers() {
        const users = await this.registerRouter.find({}).toArray();
        return users;
    }
    async findByPhone(phone) {
        const user = await this.registerRouter.findOne({ phone });
        return user;
        console.log(user);
    }
};

exports.checkUserExist = (username) => {
    return User.exists({ username });
};



module.exports = UserService;