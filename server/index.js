import express from 'express';
import Connection from './database/db.js';
import dotenv from 'dotenv';
import defaultData from './default.js';
import Routes from './routes/route.js';
import cors from 'cors';
import bodyParser from 'body-parser';
// import {v4 as uuid} from 'uuid';
import Razorpay from 'razorpay';

const app= express();

const PORT= 8000;


dotenv.config();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/', Routes);

app.get("/api/getkey",(req,res)=>
 res.status(200).json({key:process.env.RAZORPAY_API_KEY})
);

const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;

Connection(USERNAME,PASSWORD);

export const instance = new Razorpay({
   key_id: process.env.RAZORPAY_API_KEY,
   key_secret: process.env.RAZORPAY_API_SECRET,
 });


app.listen(PORT,()=>{
   console.log(`server connected succesfully at port:${PORT}`);
});








defaultData();

// export let paytmMerchantkey= process.env.PAYTM_MERCHANT_KEY;
// export let paytmParams ={};
// paytmParams['MID'] = process.env.PAYTM_MID;
// paytmParams['WEBSITE'] = process.env.PAYTM_WEBSITE;
// paytmParams['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID;
// paytmParams['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID;
// paytmParams['ORDER_ID'] = uuid();
// paytmParams['CUST_ID'] = process.env.PAYTM_CUST_ID;
// paytmParams['TXN_AMOUNT']='100';
// paytmParams['CALLBACK_URL']='http://localhost:8000/callback';
// paytmParams['EMAIL']='codeforinterview01@gmail.com';
// paytmParams['MOBILE_NO']='1234567890';

