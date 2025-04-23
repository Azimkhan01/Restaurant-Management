const { logModel, userModel } = require('../database/db');
const jwt = require('jsonwebtoken')
require('dotenv').config()
class Log {
    constructor(message, by, role) {
        this.message = message;
        this.by = by;
        this.role = role;
    }

    static async init(message, by, role) {
        const log = new Log(message, by, role);
        return await log.createLog();
    }

    static async init_req(message,req) {
        const decoded = jwt.verify(req.cookies.token,process.env.JWT_SECRET)
        // console.log(decoded)
        const user = await userModel.findById(decoded['id'])
        // console.log(user['name'])
        const l = new Log(message, user.name, user.role);
        // console.log(l)
        return await l.createLog();
    }

    async createLog() {
        try {
            const log = await logModel.create({
                message: this.message,
                by: this.by,
                role: this.role,
            });

            if (log) {
                this.showSuccess();
                return true;
            } else {
                this.showError();
                return false;
            }
        } catch (error) {
            this.showError(error);
            return false;
        }
    }

    showSuccess() {
        console.log("✅ Log created successfully");
    }

    showError(err) {
        console.error("❌ The log was not created.", err?.message || '');
    }
}

module.exports = Log;
