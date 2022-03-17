var express = require("express");
require("dotenv").config();
var router = express.Router();
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");

mongoose
  .connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB has been connected"))
  .catch((err) => console.log(err));

//IMAGES /////////////////////////////////////////////////////////////////////
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
  secure: true,
});

//GET ALL IMAGES FROM ALL FOLDERS EXCEPT IMAGES WITH avatar AS A TAG
router.get("/api/gallery", async (req, res) => {
  cloudinary.search
    //WILL NOT DELIVER IMAGES WITH avatar TAG
    .expression("-avatar")
    .execute()
    .then((result) => res.json({ status: "ok", results: result }));
});

//GET ALL USER IMAGES FROM USER FOLDER
router.get("/api/usergallery", async (req, res) => {
  const folderSearch = req.query.folderData;
  cloudinary.search
    //GETS ALL IMAGES EXCEPT avatar
    .expression(`folder:${folderSearch} AND -avatar`)
    .execute()
    .then((result) => res.json({ status: "ok", results: result }));
});

//GET USER AVATAR
router.get("/api/avatar", async (req, res) => {
  const folderSearch = req.query.folderData;
  cloudinary.search
    .expression(`folder:${folderSearch} AND avatar`)
    .execute()
    .then((result) => res.json({ status: "ok", results: result }));
});

// DESTROY IMAGE
router.get("/api/deleteImage", async (req, res) => {
  const image = req.query.deleteImage;
  cloudinary.uploader
    .destroy(image)
    .then((result) => res.json({ status: "ok", results: result }));
});

module.exports = router;
