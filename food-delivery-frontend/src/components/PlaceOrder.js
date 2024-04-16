import React, { useEffect, useState } from 'react'
import axios from 'axios'

export const PlaceOrder = () => {
    const [orderDetails, setOrderDetails] = useState({
        customerName: "",
        foodItems: "",
        deliveryAddress: "",

    })
    const [showDetails,setShowDetails]=useState(false);

    useEffect(()=>{
        async function fetchData()
        {
            try{
                const response=await axios.get("http://localhost:4000/api/v1/get/order");
                const data=response.data;
                setOrderDetails(data);
            }
            catch(error)
            {
                console.log("Error Fetching order details:",error);
            }
        }
        fetchData();
    },[])

    const handleShowDetails=()=>{
        setShowDetails(true);   
    };
    
    const handleDelete =async () => {
        try{
            const orderId=orderDetails._id;
            await axios.delete(`http://localhost:4000/api/v1/delete/order/${orderId}`);
        
        setShowDetails(false); 
        setOrderDetails({      
            customerName: "",
            foodItems: "",
            deliveryAddress: ""
        });
    }
    catch(error){
        console.log("Error deleting order:",error);

    }
    };
    
   
    return (
        <div style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            gap:10,
            flexDirection:"column"
        }}> <h1>Place Your Order </h1>
            <input values={orderDetails.customerName}
                onChange={(e) => {
                    setOrderDetails((prev) => {
                        return { ...prev, customerName: e.target.value }
                    })
                }}

                type="text" placeholder='customerName' id="name"/>
                <br/>

            <input values={orderDetails.foodItems}
                onChange={(e) => {
                    setOrderDetails((prev) => { return { ...prev, foodItems: e.target.value } })
                }}
                type="text" placeholder='FoodItems' id="fooditems" />
                <br/>


            <input values={orderDetails.deliveryAddress}
                onChange={(e) => { setOrderDetails((prev) => { return { ...prev, deliveryAddress: e.target.value } }) }}
                type="text" placeholder='DeliveryAddress' id="Address" />
                <br/>
               <button>Edit</button>
               <button onClick={handleDelete}>Delete</button>

                <button onClick={handleShowDetails}>Show Order Details</button>
                {showDetails && (
                <div>
                    <h2>Order Details:</h2>
                    <p>Customer Name: {orderDetails.customerName}</p>
                    <p>Food Items: {orderDetails.foodItems}</p>
                    <p>Delivery Address: {orderDetails.deliveryAddress}</p>
                </div>
            )}

        </div>
    )
}
