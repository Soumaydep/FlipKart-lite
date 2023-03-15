import React,{useEffect, useState} from 'react';
import {Box,Button,styled} from '@mui/material';
import { ShoppingCart as Cart, FlashOn as Flash } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/actions/cartActions';
import { isLoggedIn } from '../auth/auth';
import LoginDialog from '../login/LoginDialog';
import axios from 'axios';

const LeftContainer = styled(Box)(({ theme }) => ({
    minWidth: '40%',
    padding: '40px 0 0 80px',
    [theme.breakpoints.down('md')]: {
        padding: '20px 40px'
    }
}))

const Image = styled('img')({
    width: '95%',
    padding:'15px'
});

const StyledButton = styled(Button)(({theme})=> ({
    width: '48%',
    borderRadius: 2,
    height: 50,
    [theme.breakpoints.down('lg')]:{
      width:'46%'
    },
    [theme.breakpoints.down('sm')]:{
      width:'48%'
    },

}));

const ActionItem = ({product}) => {

   
   const {id}=product;
   const {price}=product;
   const [open, setOpen] = useState(false);

   const navigate=useNavigate();
   const dispatch=useDispatch();
   
 

   const addItemToCart=()=>
   {
    
     dispatch(addToCart(id));
     navigate('/cart');
   }

   useEffect(()=>{
    isLoggedIn ();
    console.log(isLoggedIn ())
   },[id])



   const buyNow=async(amount)=>
   {
      if(isLoggedIn ()===true){
      const {data:{key}}=await axios.get("http://localhost:8000/api/getkey")
      const {data:{order}} =await axios.post("http://localhost:8000/api/checkout",{
          amount
      })
      const options = {
        key, // Enter the Key ID generated from the Dashboard
        amount: order.amount,
        currency: "INR",
        name: "officialsoumay",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order.id, 
        callback_url: "http://localhost:8000/api/paymentVerification",
        prefill: {
            "name": "Gaurav Kumar",
            "email": "gaurav.kumar@example.com",
            "contact": "9000090000"
        },
        notes: {
            "address": "Razorpay Corporate Office"
        },
        theme: {
            "color": "#2874f0"
        }
    };
    const razor = new window.Razorpay(options);
    razor.open();
  }
  else{
    console.log("You are not logging.");
    setOpen(true);
  }    
  }

  return (
    <LeftContainer>
        <Box style={{ padding:'15px 20px', border:'1px solid #f0f0f0', width:'90%'}}>
          <Image src={product.url} alt="product"/>
        </Box>
        <StyledButton   onClick={()=> addItemToCart()}    style={{marginRight: 10, background: '#ff9f00'}} variant="contained"><Cart/>Add to Cart</StyledButton>
        <StyledButton   onClick={()=> buyNow(price.cost)} style={{background: '#fb641b'}} variant="contained"><Flash/>Buy Now</StyledButton>
        <LoginDialog open={open} setOpen={setOpen} />   
    </LeftContainer>
     
  )
}

export default ActionItem

