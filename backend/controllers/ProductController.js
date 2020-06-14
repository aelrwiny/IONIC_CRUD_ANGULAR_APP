let ProductModel = require('../models/ProductModel');
let UserModel = require('../models/UserModel');

let ProductController = {
    findProductById : async (req, res) => {
        let found = await ProductModel.findById(req.params.id);
        res.json(found);
    },
    getUserProducts : async (req, res) => {
        let user = UserModel.find({username: req.params.username});
        let found = await ProductModel.find({owner: user._id});
        res.json(found);
    },
    getAllProducts : async (req, res) => {
        let products = await ProductModel.find();
        res.json(products);
    }
}

module.exports = ProductController;