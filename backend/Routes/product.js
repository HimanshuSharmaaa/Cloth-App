const express = require("express");
const router = express.Router();
const Product = require("../Model/Product");
const { body, validationResult } = require("express-validator");

// Get all product
router.get('/fetchAllProduct',async(req,res) => {
  try {
    let fetchProduct = await Product.findAndCountAll();
    if(!fetchProduct) res.status(400).json({success:false,status:400,message:"Fail to fetch the all product data from db.",result:""});
    res.json({success:true,status:200,total:fetchProduct.count,message:"Successfully Fetch All Availiable Product From DB.",result:fetchProduct.rows});
  } catch (error) {
    console.error(error);
    res.status(500).send({success:false,message:'Error: Internal server error occur in fetching all products.',status:400,result:error.message});
  }
});

// Create new product
router.post("/add",[
    body("name", "Enter a valid name.").isLength({ min: 3 }),
    body("category", "Category can't be empty.").isLength({ min: 3 }),
    body("new_price", "Price is required").notEmpty(),
    body("old_price", "Old price is required").notEmpty()
  ],
  async (req, res) => {
    try {
      console.log("Body :",req.body);
      // check any error occured
      const errors = validationResult(req);
      // check req.body is empty or not
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      // creating new product object  
      let newProduct = await Product.create({
        name: req.body.name,
        image: req.body.image, 
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
        quantity: req.body.quantity,
        isNewLaunch : req.body.launch
      });

      console.log(newProduct);
      // send user to successfully login.
      res.json({success:true,message:'Successfully Product Added in Cloth-App Databse.',status: 200,result:newProduct});
    } catch (error) {
      console.error(error);
      res.status(500).send({success:false,message:'Error: Internal server error occur in adding products.',status:400,result:error.message});
    }
  }
);

// Delete existing product
router.delete('/delete/:id',  async(req,res)=>{
  try {
    console.log(req.params.id);
    const presentProduct = await Product.findByPk(req.params.id); //Get id from URL parameter & find the product by primary key(id)
    if(!presentProduct) return res.status(400).send({success:false,status:404,message:"Product Not Found",result:""});

    await presentProduct.destroy();
    // if(!result) return res.status(400).send({success:false,status:400,message:'Product not Deleted',result:result});
    return res.status(200).send({success:true,status:200,message:`Product with id ${req.params.id} deleted successfully`,result:presentProduct});
  } catch (error) {
    console.log('Error deleteing product : ',error);
    res.status(500).send({success:false,status:400,message:"Error: Internal server error occur in deleting product",result:error.message})
  }
});

// update product
router.put('/updateProduct/:id',async(req,res) => {
  try {
    console.log(req.params.id);
    if(!req.params.id) res.status(400).json({success:false,status:400,message:"Id cannot be empty"});
    let presentProduct = await Product.findByPk(req.params.id);
    if(!presentProduct) res.status(400).json({success:false,status:400,message:"Product not available in DB.",result:""});

    if(presentProduct){
      presentProduct.name = req.body.name,
      presentProduct.image = req.body.image,
      presentProduct.category = req.body.category,
      presentProduct.new_price = req.body.new_price,
      presentProduct.old_price = req.body.old_price,
      presentProduct.quantity = req.body.quantity,
      isNewLaunch = req.body.launch,
      presentProduct.updatedAt = Date.now()
    }
    
    let pro = await presentProduct.save(); // saves changes
    res.json({success:true,status:200,message:"Successfully Product Updated From DB.",result:pro});
  } catch (error) {
    console.error(error);
    res.status(500).send({success:false,message:'Error: Internal server error occur in updating products.',status:400,result:error.message});
  }
});

module.exports = router;