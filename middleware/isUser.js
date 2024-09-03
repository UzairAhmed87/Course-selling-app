const {User} = require("../db")

function isuserMiddleware(req,res,next){
const username = req.body.username;
User.findOne({
    username
}).then((data)=>{
    if (data) {
        res.json({
            mesg : "User aleardy exists"
        })
    }else{
        next()
    }
}).catch((error)=>{
next(error)
})
}

module.exports = isuserMiddleware