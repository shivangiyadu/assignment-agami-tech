const mongoose=require("mongoose");

const staffSchema=new mongoose.Schema(
    {
        firstname:{
            type:String,
          
            maxlenght:50
        },
        lastname:{
            type:String,
          
            maxlenght:50
        },
        location:{
            type:String,
          
            maxlenght:50
        },

        availability:{
            type:Boolean,
          
        },
        workingHours:{
            type:Array,
                     
        },
        createdAt:{
            type:Date,
            default:Date.now()
   },  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OrderData'
}],
       
    }
)
module.exports=mongoose.model("staffModel",staffSchema);