const User = require("./User.model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function createUser(req, res) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = new User({
        username: req.body.username,
        firstname: req.body.firstname,
        email: req.body.email,
        password: hashedPassword
    });
    await user.save();
    res.status(200).send("success");
  } catch (e) {
    res.status(401).send(e);
  }
}

async function connectUser(req, res) {
    try {
      const user = await User.findOne({email: req.body.email});
      const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
      if(! isPasswordCorrect) res.status(401).json({ error: 'Authentication failed' });
      let token = "";
      
      if(user.email == "admin@admin.com") token = jwt.sign({user: user.email, admin: true}, process.env.SECRETKEY, {expiresIn: "1h"})
      else token = jwt.sign({user: user.email}, process.env.SECRETKEY, {expiresIn: "1h"})

      res.status(200).json({token});
    } catch (e) {
        res.status(401).json({ error: 'Authentication failed' });
    }
}

async function getUser(req, res) {
    try {
      const user = await User.findOne({email: req.user});
      res.status(200).send({
        username: user.username,
        firstname: user.firstname,
        email: user.email,
        cart: user.cart,
        interestsList: user.interestsList,
      });
    } catch (e) {
      res.send(e);
    }
}

async function updateCart(req, res) {
    try {
        const user = await User.findOne({email: req.user});
        user.cart = req.body.cart;
        await user.save();
      res.send("success");
    } catch (e) {
      res.status(401).send(e);
    }
}

async function updateInterests(req, res) {
    try {
        const user = await User.findOne({email: req.user});
        user.interestsList = req.body.interestsList;
        await user.save();
      res.send("success");
    } catch (e) {
      res.status(401).send(e);
    }
}

async function deleteUser(req, res) {
    try {
      const queryResult = await User.deleteOne({_id : req.params.id});
      if(queryResult.deletedCount == 0) {throw("User not found")}
      res.send("success");
    } catch (e) {
      res.status(401).send(e);
    }
}

module.exports = {
    createUser,
    connectUser,
    deleteUser,
    getUser,
    updateCart,
    updateInterests
}