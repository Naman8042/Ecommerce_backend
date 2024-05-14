const express = require("express")
const router = express.Router()

const {createProduct,getALl} = require("../controller/Product")
const {signup,Login} = require("../controller/User")

router.post("/create",createProduct)
router.get("/getall",getALl)
router.post("/signup",signup)
router.post("/login",Login)

module.exports = router