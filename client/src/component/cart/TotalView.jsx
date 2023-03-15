import React,{useState,useEffect} from 'react';
import {Box,styled,Typography} from '@mui/material';

const Header=styled(Box)
`
 padding:15px 24px;
 background:#fff;
 border-bottom:1px solid #f0f0f0;
`
const Pricedetails=styled(Box)
`
  color:#878787;
`
const Container=styled(Box)
`
  padding:15px 24px;
  background:#fff;
`
const Cost=styled(Typography)
`
  float:right;
`;
const Discount=styled(Typography)
`
  font-size: 16px; 
  color: green;
`;

const TotalAmount=styled(Typography)
`
  border-top:1px solid #f0f0f0;
  padding:20px 0;
  border-bottom:1px solid #f0f0f0;
  font-size: 18px;
  font-weight: 600;

`;


const TotalView = ({cartItems}) => {

  const [quantity,setQuantity]=useState(0);

  const setQty=()=>{
    let qty=0;
    cartItems.map((item)=>{
      qty+=item.quantity;
     });
     setQuantity(qty);


  }

 
  


  console.log("cartItems's qty",quantity);

  const [price,setPrice]=useState(0);
  const [discount,setDiscount]=useState(0);

   useEffect(()=>
   {
    totalAmount();
    setQty();
      
   },[cartItems])

  const totalAmount=()=>
  {
    let price=0, discount=0;

    cartItems.map((item)=>{
      price+=item.price.mrp;
      discount+= (item.price.mrp-item.price.cost)
     });

     setPrice(price);
     setDiscount(discount);

  }



  return (
   <Box>
    
    <Header>
      <Pricedetails>PRICE DETAILS</Pricedetails>
    </Header>
    <Container>
       <Typography style={{marginBottom:20}}>Price ({quantity} item)
          <Cost component="span">₹{price * quantity}</Cost>
       </Typography>
       <Typography style={{marginBottom:20}}>Discount
          <Cost component="span">-₹{discount*quantity}</Cost>
       </Typography>
       <Typography style={{marginBottom:20}}>Coupons for you
          <Cost component="span">-₹50</Cost>
       </Typography>
       <Typography style={{marginBottom:20}}>Delivery Charges
          <Cost component="span" style={{color:'green'}}>FREE</Cost>
       </Typography>
         <TotalAmount>Total Amount
           <Cost component="span">₹{(price*quantity)-(discount*quantity)-50}</Cost>
         </TotalAmount>
         <Discount>You will save ₹{(discount*quantity)-50} on this order</Discount>
       </Container>
    
     
   </Box>
  )
}

export default TotalView