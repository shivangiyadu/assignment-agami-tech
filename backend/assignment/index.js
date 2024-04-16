
const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const apiRoutes=require("./routes/foodApp");
const cors=require("cors");
require("dotenv").config();

const app=express();
const PORT=process.env.PORT ||5000;
const DATABASE_URL=process.env.DATABASE_URL;

app.use(cors());
app.use(bodyParser.json());


app.use("/api/v1",apiRoutes);

mongoose.connect(DATABASE_URL).then(()=>{
    console.log("MONGODB CONNECTED SUCCESSFULLY");
    app.listen(PORT,()=>{
        console.log(`Server is running on port : ${PORT}`);
    })
})
.catch(error=>{
    console.error("MongoDB connection Error",error);
    process.exit(1);
});

