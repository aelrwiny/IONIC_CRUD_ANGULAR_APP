const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductTypeSchema = new Schema({
    pt_code: { type: String },
    pt_ar_desc: { type: String },
    pt_en_desc: { type: String },
    date_created: { type: Date, default: Date.now, immutable: true},
    date_updated: { type: Date, default: Date.now}
  }, {
    collection: 'prod_types'
  })

module.exports = mongoose.model('ProductType', ProductTypeSchema)