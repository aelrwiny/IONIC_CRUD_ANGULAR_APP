let UserModel = require('../models/UserModel.js');

let UserController = {
    find : async (req, res) => {
        let found = await UserModel.find({username: req.params.username});
        res.json(found);
    }
}

module.exports = UserController