const express = require('express');
const ProductController = require("./product.controller")
const UserController = require("./user.controller")
const bodyParser = require("body-parser");
const { verifyAdminToken, verifyToken } = require('./auth');
const app = express();

// create application/json parser
var jsonParser = bodyParser.json()

app.post('/account', jsonParser, (req, res) => {
    UserController.createUser(req, res);
})
app.post('/token', jsonParser, (req, res) => {
    UserController.connectUser(req, res);
})

app.get('/user', verifyToken, (req, res) => {
    UserController.getUser(req, res);
})
app.patch('/user/cart', verifyToken, jsonParser, (req, res) => {
    UserController.updateCart(req, res);
})
app.patch('/user/interests', verifyToken, jsonParser, (req, res) => {
    UserController.updateInterests(req, res);
})

app.post('/products', verifyAdminToken, jsonParser, (req, res) => {
    ProductController.createProduct(req, res);
})
app.get('/products', verifyToken, (req, res) => {
    ProductController.getAllProducts(req, res);
}) 
app.get('/products/:id', verifyToken, (req, res) => {
    ProductController.getProduct(req, res);
}) 
app.patch('/products/:id', verifyAdminToken, jsonParser, (req, res) => {
    ProductController.updateProduct(req, res);
}) 
app.delete('/products/:id', verifyAdminToken, (req, res) => {
    ProductController.deleteProduct(req, res);
}) 

app.get('*', (req, res)=> {
    res.status(404).send("NotFound")
})

module.exports = app;