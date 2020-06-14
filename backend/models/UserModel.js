const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
        user_name: { type: String},
        password: {type: String},
        email: { type: String },
        mobile_number: {type: String},
        date_created: { type: Date, default: Date.now, immutable: true},
        date_updated: { type: Date, default: Date.now}
    },
    {
        collections: 'users'
    })

module.exports = mongoose.model('User', UserSchema)