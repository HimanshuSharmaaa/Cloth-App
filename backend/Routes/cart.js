const express = require("express");
const router = express.Router();
const Cart = require("../Model/Cart");
const fetchUser = require('../Middleware/fetchUser');
const { body, validationResult } = require("express-validator");

// Get all cart items
router.get("/", async (req,res) => {
  try {
    const cartItems = await Cart.findAndCountAll();
    if (!cartItems) return res.status(400).json({ success: false, message: 'cart items found for this user.', status: 404, result: "" });
    res.json({ success: true, message: 'Cart items fetched successfully.', status: 200, result: cartItems });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error: Internal server error occur.", status: 400, result: error.message });
  }
});

// fetching user specific cart items 
router.get('/user', fetchUser, async(req,res)=>{
  try {
    const cartItems = await Cart.findAndCountAll({where:{user_id:req.user.id}});
    if(!cartItems) return res.status(400).json({ success: false, message: 'cart items found for this user.', status: 404, result: "" });
    res.json({ success: true, message: 'User specific Cart items fetched successfully.', status: 200, result: cartItems });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error: Internal server error occur.", status: 400, result: error.message });
  }
});

// Create New cartItems
router.post("/create", fetchUser,
    [
      body("product_id").notEmpty().withMessage("Product_id cannot be empty"),
    ],
    async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const user_id = req.user.id;
      const { product_id } = req.body;
      // Check if item already exists for this user
      const productExists = await Cart.findOne({where:{product_id:product_id,user_id:user_id}});
      if (productExists) {
        // Update quantity of the existing product
        productExists.quantity += 1;
        await productExists.save();
        return res.json({ success: true, message: 'Cart item Quantity updated.', status: 200, result: productExists
        });
      }

      // create a new cart item
      const cartItem = await Cart.create({ product_id, user_id },{ returning: true });
      // Force the result to plain object to ensure all fields (like `quantity`) are included

      res.json({ success: true, message: 'Successfully Added In CartItems Cloth-App.', status: 201, result: cartItem.toJSON() }); // 👈 this .toJSON() guarantees quantity is included
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: false, message: "Error: Internal server error occur.", status: 400, result: error.message });
    }
  }
);

// Delete Existing Item
router.delete('/delete/:id', fetchUser, async (req,res) => {
  try { 
    // Check the Item is available or not
    const presentItem = await Cart.findByPk(req.params.id);
    if(!presentItem) return res.status(404).json({ message: "Item Not Found." });

    // Check the User authentication
    if(presentItem.user_id.toString() != req.user.id) return res.status(401).json({ message: "Not Allowed." });

    // Update the quantity
    if(presentItem.quantity > 1){
      presentItem.quantity -= 1;
      await presentItem.save();
      return res.json({ success: true, message: 'Cart item Quantity updated.', status: 200, result: presentItem
      });
    }

    // Destroy Only One unit of item left 
    await presentItem.destroy();
    res.json({success: true, message: "Item Successfully Deleted.", result: presentItem,status:200});
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error: Internal server error occur.", status: 500, result: error.message });
  }
});

module.exports = router;