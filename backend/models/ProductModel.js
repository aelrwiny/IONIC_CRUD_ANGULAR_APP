const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    product_code: { type: String },
    product_name: { type: String },
    product_desc: { type: String },
    product_price: { type: Number},
    date_created: { type: Date, default: Date.now, immutable: true},
    date_updated: { type: Date, default: Date.now},
    product_type: {
      type: Schema.Types.ObjectId,
      ref: 'ProductType'
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }, {
    collection: 'products'
  })

module.exports = mongoose.model('Product', ProductSchema)