const mongoose=require("mongoose");

const orderStaff=new mongoose.Schema({

    customerName:{
        type:String,
        required:true,
        maxlenght:50
    },
    foodItems:{
        type:String,
        required:true,
    },
    deliveryAddress:{
        type:String,
        required:true,
        maxlenght:50
    }
    ,
    deliveryPartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'staffModel'
    }
})
module.exports=mongoose.model("OrderData",orderStaff);