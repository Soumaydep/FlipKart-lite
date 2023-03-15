import mongoose from "mongoose";

export const Connection =async (username,password)=>
{
    const URL=`mongodb+srv://${username}:${password}@ecommerce-web.crjh9ff.mongodb.net/?retryWrites=true&w=majority`;
    try{
       await mongoose.connect(URL,{useUnifiedTopology: true, useNewUrlParser:true})
       console.log('Database connected Succesfully');
    }
    catch(error){
      console.log('Error while connecting with the database ',error.message);
    }
}

export default Connection;