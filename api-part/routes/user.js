const express = require('express')
const userControl = require("../controller/userCon");
const {userValidation , schemaValidation} = require("../validation/userValid")
const auth = require('../middleware/auth');
const router = express.Router()

router.get("/api/data/user", auth ,userControl.getUser);
router.get("/api/data/user/:_id",auth,userControl.getUserByID)

router.post("/api/data/user",userValidation(), schemaValidation, userControl.postUser);

router.post("/api/data/userLogin", userControl.userLogin);

router.put("/api/data/user/:_id",auth,  userControl.putUser);

router.delete("/api/data/user/:_id",auth,userControl.deleteUser)
router.put("/api/data/forgetPass",userControl.forgotPassword)
router.put("/api/data/resetPassword/:_id/:token",userControl.resetPasswordLink)
module.exports = router