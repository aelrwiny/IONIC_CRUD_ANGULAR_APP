const express = require('express');
const app = express();
const ProductRoute = express.Router();

let ProductModel = require('../models/ProductModel.js');

// Add Product
ProductRoute.route('/create').post((req, res, next) => {
  ProductModel.create(req.body, (error, data) => {
    if (error) {
      console.log(error);
      return next(error)
    } else {
      res.json(data)
      console.log('Product successfully updated!')
    }
  })
});

// Get all products
ProductRoute.route('/').get((req, res) => {
  ProductModel.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single product
ProductRoute.route('/get/:id').get((req, res) => {
  ProductModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update product
ProductRoute.route('/update/:id').put((req, res, next) => {
  ProductModel.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      console.log(error)
      return next(error);
    } else {
      res.json(data)
      console.log('Product successfully updated!')
    }
  })
})

// Delete product
ProductRoute.route('/delete/:id').delete((req, res, next) => {
  ProductModel.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = ProductRoute;