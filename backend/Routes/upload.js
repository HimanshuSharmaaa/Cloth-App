const express = require("express");
const router = express.Router();
const multer = require("multer");

// Storage Image in backend
const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    return cb(null,'./uploads');
  },
  filename: (req, file, cb) => {
    return cb(null,`${Date.now()}-${file.originalname}`);
  }
});

// Initialize Multer
const upload = multer({ storage: storage }); 
router.post("/", upload.single("product"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });
    let imageAddress = `http://localhost:4000/uploads/${req.file.filename}`;
    res.json({success: true, status: 200, message: "Image uploaded successfully",Address: imageAddress});
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ status: "error", message: "Failed to upload image" });
  }
});

module.exports = router;