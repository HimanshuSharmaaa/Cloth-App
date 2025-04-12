const express = require("express");
const router = express.Router();
const Cart = require("../Model/Cart");
const { body, validationResult } = require("express-validator");

router.post("/create",
    [
      body("product_id").notEmpty().withMessage("ProductId cannot be empty"),
      body("user_id").notEmpty().withMessage("UserId cannot be empty"),
      body("quantity").isInt({ min: 1 }).withMessage("Quantity must be an integer greater than 0"),
    ],
    async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      const { product_id, user_id, quantity } = req.body;
      const cartItem = await Cart.create({ product_id, user_id, quantity });
      res.json({ success: true, message: 'Successfully Added In CartItems Cloth-App.', status: 201, result: cartItem });
    } catch (error) {
      console.log(error);
      res.status(500).send({ success: false, message: "Error: Internal server error occur.", status: 400, result: error.message });
    }
  }
);

// Get all cart items
router.get("/cart", async (req, res) => {
  try {
    const cartItems = await Cart.findAll();
    if (cartItems) res.json({ success: true, message: 'Successfully Ordered in Cloth-App.', status: 200, result: cartItems });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;