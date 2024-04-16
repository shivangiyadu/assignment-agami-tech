const order=require("../models/order");
const { getAllStaff } = require("./staff");

exports.createOrder=async(req,res)=>{
    try{
        const {customerName,foodItems,deliveyAddress}=req.body;
        const response=await order.create({customerName,foodItems,deliveyAddress});
        res.status(200).json({
            success:true,
            data:response,
            message:"Order Created Successfully"
        })
    }
    catch(err) {
        console.error(err);
        console.log(err);
        res.status(500).json({
            success:false,
            data:"Internal Server Error",
            message:err.message
        })
    }
}
exports.getAllOrder=async(req,res)=>{
    try{
        const allOrder=await order.find();
        res.status(200).json({
            success:true,
            data:allOrder,
            message:"All the orders retrieved successfully"
        })
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            data:"Internal Server Error",
            message:err.message
        });
    }
};
exports.updateOrder=async (req,res)=>{
    try{
        const {id}=req.params;
        const {customerName,deliveyAddress,foodItems}=req.body;

        const existingOrder=await order.findById(id);
        if(!existingOrder)
        {
            return res.status(404).json({
                success:false,
                data:null,
                message:"Order Not Found"
            });
        }
        existingOrder.customerName=customerName;
        existingOrder.foodItems=foodItems;
        existingOrder.deliveryAddress=deliveyAddress;
       
       const updateOrder=await existingOrder.save();
      res.status(200).json({
        success:true,
        data:updateOrder,
        message:"Staff Member updated Successfully"
    });
}
    catch(err)
    {
        console.error(err);
        res.status(500).json({
            success:false,
            data:"Internal Server Error",
            message:err.message
        });
    }
}
exports.partialUpdateOrder=async(req,res)=>{
    try{
        const {id}=req.params;
        const updateFields=req.body;
        
        const existingOrder=await staff.findById(id);
        if(existingOrder)
        {
                   return res.status(404).json({
                success:false,
                data:null,
                message:"Staff member not found"
         });
        }
        for(const field in updateFields)
        {
            existingOrder[field]=updateFields[field];
        }
        const updatedOrder=await existingOrder.save();
        res.status(200).json({
            success:true,
            data:updatedOrder,
            message:"Order Updated Successfully"
        });
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            data:"Internal server Error",
            message:err.message
        })

    }
}

exports.deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Fetch the existing order
        const existingOrder = await order.findById(id);
        if (!existingOrder) {
            return res.status(404).json({
                success: false,
                data: null,
                message: "Order not found"
            });
        }

        // Remove the order
        await existingOrder.remove();
        
        res.status(200).json({
            success: true,
            data: {},
            message: "Order deleted successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            data: "Internal server Error",
            message: err.message
        });
    }
};
