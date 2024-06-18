const BigPromise = require("../middleware/BigPromise")

exports.home=BigPromise((req,res)=>{
    res.send("Welcome to the Home page")
})

exports.test = BigPromise(
    (req,res)=>{
        res.send("Welcome to the Home page")
    }
)