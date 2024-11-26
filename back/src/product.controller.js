const Product = require("./product.model")

async function createProduct(req, res) {
  try {
    const product = new Product(req.body)
    await product.save()
    res.send("success");
  } catch (e) {
    res.send(e);
  }
}

async function getAllProducts(req, res) {
    try {
      const products = await Product.find({});
      res.send(products);
    } catch (e) {
      res.send(e);
    }
}

async function getProduct(req, res) {
    try {
      const product = await Product.findById(req.params.id);
      res.send(product);
    } catch (e) {
      res.send(e);
    }
}

async function updateProduct(req, res) {
  try {
    const queryResult = await Product.updateOne(req.body);
    if(queryResult.modifiedCount == 0) {throw("Product not found")}
    res.send("success");
  } catch (e) {
    res.send(e);
  }
}

async function deleteProduct(req, res) {
    try {
      const queryResult = await Product.deleteOne({_id : req.params.id});
      if(queryResult.deletedCount == 0) {throw("Product not found")}
      res.send("success");
    } catch (e) {
      res.send(e);
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct
}