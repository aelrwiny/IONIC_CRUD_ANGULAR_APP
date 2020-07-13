const express = require('express');
const app = express();
const UserRoute = express.Router();

let UserModel = require('../models/UserModel.js');

// Login
UserRoute.route('/login').post((req, res, next) => {
  console.log("Login Input = " + JSON.stringify(req.body))
  UserModel.findOne(req.body, (error, data) => {
    if (error) {
      console.log("Login Error: " + error);
      return next(error)
    } else {
      res.json(data)
      console.log('User logged successfully!')
    }
  })
});

// Signup User
UserRoute.route('/signup').post((req, res, next) => {
  console.log("Signup Input = " + JSON.stringify(req.body))
  UserModel.create(req.body, (error, data) => {
    if (error) {
      console.log("Signup Error: " + error);
      return next(error)
    } else {
      res.json(data)
      console.log('User added successfully!')
    }
  })
});

// Get single User
UserRoute.route('/:id').get((req, res, next) => {
  UserModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update product
UserRoute.route('/update/:id').put((req, res, next) => {
  UserModel.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      console.log(error)
      return next(error);
    } else {
      res.json(data)
      console.log('User successfully updated!')
    }
  })
})

// Delete User
UserRoute.route('/delete/:id').delete((req, res, next) => {
  UserModel.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

// Get all users
UserRoute.route('/').get((req, res, next) => {
  UserModel.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

module.exports = UserRoute;