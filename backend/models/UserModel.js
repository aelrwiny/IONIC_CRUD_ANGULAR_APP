const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
        username: { type: String},
        email: { type: String },
        mobile: {type: String},
        password: {type: String},
        country: {
            id: { type: Number },
            isoCode: { type: String },
            key: { type: String },
            name: { type: String }
        },
        dateCreated: { type: Date, default: Date.now, immutable: true},
        dateUpdated: { type: Date, default: Date.now}
    },
    {
        collections: 'users'
    })

module.exports = mongoose.model('User', UserSchema)