const mongoose =require('mongoose')
const Schema=mongoose.Schema    
const model= new Schema({
    id:{
        type:Schema.Types.Number,
        required:true
    },
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