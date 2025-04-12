const express = require("express");
const router = express.Router();
const OfferList = require("../Model/OfferList");
const { body, validationResult } = require("express-validator");
const { status } = require("init");

// fetch all offer
router.get("/", async (req, res) => {
  try {
    const fetchedOfferList = await OfferList.findAll();
    res.status(200).send({ success: true, message: "Successfully offerList fetched from DB.", status: 200, result: fetchedOfferList });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Error: Internal server error occur in fetching OfferLists.", status: 400, result: error.message });
  }
});

// create a new offer
router.post("/create",
  [
    body("code").notEmpty().withMessage("Code cannot be empty"),
    body("minCartVal").isInt({ min: 10 }).withMessage("minCartVal must be an integer greater than 10"),
    body("disAmount").isInt({ min: 10 }).withMessage("disAmount must be an integer greater than 10"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({success: false, message: "Validation error", status: 400, result: errors.array()});
       
      let { code, minCartVal, disAmount, active } = req.body;
      if (minCartVal < disAmount) return res.status(400).json({ success: false, message: "Discount amount cannot be more than the minimun cart value", status: 400, result: "" });

      let checkOfferExists = await OfferList.findOne({ where: { code } });
      if (checkOfferExists) return res.status(400).json({ success: false, message: `Error: The Offer : ${code} is already Available.`, status: 400, result: "" });

      const newOffer = await OfferList.create({ code, minCartVal, disAmount, active });
      // console.log(newOffer);

      const fetchUpdatedOfferList = await OfferList.findAll();
      res.json({ success: true, message: `Successfully offer added in Cloth-App DB.`, status: 200, result: fetchUpdatedOfferList });  
    } catch (error) {
      console.error(error)
      res.status(500).send({ success: false, message: "Error: Internal server error occur in Adding OfferLists.", status: 400, result: error.message });
    }
  }
);

router.delete('/delete/:id',async(req,res)=>{
  try {
    console.log(req.params.id);
    const checkOffer = await OfferList.findByPk(req.params.id);
    if(!checkOffer) return res.status(400).json({ success: false, message: "Not Available in the DB.", status: 400, result: "" });
    
    await checkOffer.destroy();
    const fetchUpdatedOfferList = await OfferList.findAll();
    return res.status(200).send({success:true,status:200,message:`Offer with id : ${req.params.id} deleted successfully`,result:fetchUpdatedOfferList});
  } catch (error) {
    console.error(error)
    res.status(500).send({ success: false, message: "Error: Internal server error occur in deleting OfferLists.", status: 400, result: error.message }); 
  }
});

router.put('/update/:id',
  [
    body("code").notEmpty().withMessage("Code cannot be empty"),
    body("minCartVal").isInt({ min: 10 }).withMessage("minCartVal must be an integer greater than 10"),
    body("disAmount").isInt({ min: 10 }).withMessage("disAmount must be an integer greater than 10"),
  ]
  ,async(req,res)=>{
    try {
      if(!req.params.id) res.status(400).json({success:false,status:400,message:"Id cannot be empty"});

      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({success: false, message: "Validation error", status: 400, result: errors.array()});

      let { code, minCartVal, disAmount, active } = req.body;
      const checkOfferExists = await OfferList.findByPk(req.params.id);
      if(!checkOfferExists) res.status(400).send({success: false, message: `Offer with this id : ${req.params.id} is not exists.`, status: 400, result: ""});

      if(checkOfferExists){
        checkOfferExists.code = code;
        checkOfferExists.minCartVal = minCartVal;
        checkOfferExists.disAmount = disAmount;
        checkOfferExists.active = active;
      }

      let updatedOfferList = await checkOfferExists.save();
      if(!updatedOfferList) res.status(400).send({success: false, message: `Offer with this id : ${req.params.id} not is updated.`, status: 400, result: ""});

      const fetchUpdatedOfferList = await OfferList.findAll();
      if(!fetchUpdatedOfferList) res.status(400).send({success: false, message: `Error : Failed to fetched updated offerList`, status: 400, result: ""});

      return res.status(200).send({success:true,status:200,message:`Offer with id : ${req.params.id} deleted successfully`,result:fetchUpdatedOfferList});
    } catch (error) {
      console.log(error);
      req.status(500).send({success: false, message: 'Error: Internal server error occur in updating OfferLists.', status: 400, result: error.message});
    }
})

module.exports = router;