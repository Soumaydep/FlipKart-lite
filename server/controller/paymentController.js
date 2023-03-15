import { instance } from "../index.js";
import crypto from "crypto";
import  Payment  from "../model/payment-schema.js";

export const checkout = async (req, res) => {
  try{
    const options = {
      amount: Number(req.body.amount * 100),  // amount in the smallest currency unit
      currency: "INR"
    };
    const order = await instance.orders.create(options);
    console.log(order);
    res.status(200).json({success: true,order});
  }
  catch(error)
  {
    res.status(500).json({message:error});
  }

};


export const paymentVerification = async (req, res) => {

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");
    console.log("sig recieved",razorpay_signature);
    console.log("sig generated",expectedSignature);

    // res.status(200).json({success:true})

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    res.redirect(
      `http://localhost:3000/paymentsuccess?reference=${razorpay_order_id}`
    );
  
  }
  else
  {
    res.status(400).json({success:false});
  }

};