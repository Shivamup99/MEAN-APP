const express = require('express')
const bookControl = require("../controller/bookConn");
const {bookValidation , schemaValidation} = require("../validation/bookValid")
const auth = require('../middleware/auth');
const router = express.Router()

router.get("/api/data/book", auth ,bookControl.getBook);
router.get("/api/data/book/:_id",auth,bookControl.getBookByID)

router.post("/api/data/book",auth, bookValidation(), schemaValidation, bookControl.postBook);

router.put("/api/data/book/:_id",auth,  bookControl.putBook);

router.delete("/api/data/book/:_id",auth,bookControl.deleteBook)
module.exports = router