const {home,test} =require("../controller/homeContoller")



const express = require("express")

const router = express.Router()


router.route("/").get(home)
router.route("/test").get(test)



module.exports=router