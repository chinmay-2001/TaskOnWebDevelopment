const mongoose =require('mongoose')
const Schema=mongoose.Schema()
const model=new Schema({
    name:{
        type:String,
        required:true
    },
    priority:{
        type:String,
        required:true
    }
})


module.exports=mongoose.model('Todo',model)