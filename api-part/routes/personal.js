const express = require("express")
const personalConn = require("../controller/personalInfo")
const router = express.Router()
const {personalValidation,scheamValidation, schemaValidation} = require("../validation/personalValid")
const multer = require('multer');
const auth = require("../middleware/auth");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./upload");
    },
  
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"||
        file.mimetype == "image/PNG" ||
        file.mimetype == "image/JPG" ||
        file.mimetype == "image/JPEG"
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
      }
    },
  }).single('image');
  
  router.get("/api/data/personal",auth,personalConn.getPersonal)
  router.get("/api/data/personal/:_id",auth,personalConn.getPersonalById)
  router.post("/api/data/personal",upload,auth, personalValidation(),schemaValidation,  personalConn.postPersonal)
  router.put("/api/data/personal/:_id",upload,auth,personalConn.putPersonal)



  module.exports=router