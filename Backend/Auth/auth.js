const router=require('express').Router()
const jwt=require('jsonwebtoken')
const secretKey="access_token"

router.post('',(req,res)=>{
    const user={
        Username:"aman",
        Password:"aman123"
    }
    console.log(req.body)
    if(req.body.Username==="aman" && req.body.Password==='aman123'){
        jwt.sign({user},secretKey,{expiresIn:'300s'},(err,token)=>{
            res.json({token:token})
        })
        console.log("inside if")
    }   
    else{
        console.log("inside else")
        res.sendStatus(401);
    }
})



module.exports=router


    


