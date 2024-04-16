
const staff=require("../models/staff");

exports.createStaff=async(req,res)=>{
    try{
        const {firstname,lastname,location,availability,workingHours}=req.body;

        const response=await staff.create({firstname,lastname,location,availability,workingHours});

        res.status(200).json({
            success:true,
            data:response,
            message:"Entry created Successfully"
        })
    }
    catch(err){
        console.error(err);
        console.log(err);
        res.status(500).json({
            success:false,
            data:"Internal server error",
            message:err.message
        })

    }
}
exports.getAllStaff=async(req,res)=>{
    try{
         const allStaff=await staff.find();

         res.status(200).json({
            success:true,
            data:allStaff,
            message:"Retrieved all the Staff members Successfully"
         });
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            data:"Internal Server Error",
            message: err.message
        });
    }
};

exports.updateStaff=async(req,res)=>{
    try{
        const {id}=req.params;
        const {name,availability,workingHours}=req.body;

        //check of the staff members exist
        const existingStaff=await staff.findById(id);
        if(!existingStaff)
        {
            return res.status(404).json({
                success:false,
                data:null,
                message:"Staff Member Not Found"
            });
        }
        existingStaff.name=name;
        existingStaff.availability=availability;
        existingStaff.workingHours=workingHours;

        const updateStaff=await existingStaff.save();

        res.status(200).json({
            success:true,
            data:updateStaff,
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
exports.partialUpdateStaff=async(req,res)=>{
    try{
        const {id}=req.params;
        const updateFields=req.body;
        //check if the staff members exists
        const existingStaff=await staff.findById(id);
        if(!existingStaff)
        {
               return res.status(404).json({
                success:false,
                data:null,
                message:"Staff member not found"
         });
        }
        for(const field in updateFields)
        {
            existingStaff[field]=updateFields[field];
        }
        const updatedStaff=await existingStaff.save();
        
        res.status(200).json({
            success:true,
            data:updatedStaff,
            message:"Staff Member Partially Updated Successfully"
        });
    }
    catch(err)
    {
    console.error(err);
    res.status(500).json({
        success:false,
        data:"Internal server Error",
        message:err.message

      });    
    }
}
exports.deleteStaff=async (req,res)=>{
    try{
        const {id}=req.params;
        const existingStaff = await staff.findById(id);  //fetching the existing staff member
        if(!existingStaff)
        {
                return res.status(404).json({
                success:false,
                data:null,
                message:"Staff member not found"
         });

        }
        await existingStaff.remove();  //removing the staff member
        res.status(200).json({
            success:true,
            data:{},
            message:"Staff Member deleted successfully"
        });
     }
     catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            data:"Interval server Error",
            message:err.message
        });

}
}