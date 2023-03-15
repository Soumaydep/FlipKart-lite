
import { Grid, Typography,Box,styled, Button } from '@mui/material';
import React,{useEffect,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
//component
import CartItem from './CartItem';
import TotalView from './TotalView';
import LoginDialog from '../login/LoginDialog';

//actions
import { removeFromCart,addToCart } from '../../redux/actions/cartActions';
import { useParams } from 'react-router-dom';
import EmptyCart from './EmptyCart';
import axios from 'axios';

//auth
import { isLoggedIn } from '../auth/auth';


const Container =styled(Grid)(({ theme }) => ({
   padding: '30px 135px',
   display: 'flex',
   [theme.breakpoints.down('md')]: {
       padding: '15px 0'
   }
}));

const LeftComponent = styled(Grid)(({ theme }) => ({
   paddingRight: 15,
   [theme.breakpoints.down('md')]: {
       marginBottom: 15
   }
}));

const Header=styled(Box)
`
  padding: 15px 24px;
  background:#fff;
`;

const ButtonWrapper= styled(Box)
`
  padding: 16px 22px;
  box-shadow:0 -2px 10px 0 rgb(0 0 0 / 10%);
  background:#fff;
  border-top:1px solid #f0f0f0;
`;

const StyledButton = styled(Button)
`
display:flex;
margin-left: auto;
background:#fb641b;
color:#fff;
width: 250px;
height:51px;
border-radius:2px;


`;


const Cart = () => {
 
    const {cartItems}=useSelector(state=> state.cart);
    const [quantity,setQuantity]=useState(0);

    const setQty=()=>{
      let qty=0;
      cartItems.map((item)=>{
        qty+=item.quantity;
       });
       setQuantity(qty);
  
  
    }
    const { id } = useParams();

    const [price,setPrice]=useState(0);
    const [discount,setDiscount]=useState(0);
    const[open,setOpen]=useState(false)

    useEffect(()=>
    {
     totalAmount(); 
     setQty(); 
     isLoggedIn()
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

   const dispatch=useDispatch();

   useEffect(() => {
      if(cartItems && id !== cartItems.id)   
          dispatch(addToCart(id));
  }, [dispatch, cartItems, id]);

   const removeItemFromCart =(id)=>
   {
      dispatch(removeFromCart(id))
   }



   const placingOrder=async(amount)=>
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
    <>
     {

         cartItems.length ?
         <Container container spacing={2}>
             <LeftComponent item lg={9} md={9} sm={12} xs={12}>
                 <Header>
                    <Typography>My Cart({cartItems.length})</Typography>
                 </Header>
                 {
                    cartItems.map(items=>{
                        return(
                          <CartItem item={items} removeItemFromCart={removeItemFromCart}/>
                        )
                    })
                 }
                 <ButtonWrapper>
                     <StyledButton sx={{':hover': {bgcolor: '#fb641b', color: 'white'}}}  onClick={()=> placingOrder((price*quantity)-(discount*quantity)-50)}>Place Order</StyledButton>
                 </ButtonWrapper>
             </LeftComponent> 
             <Grid item lg={3} md={3} sm={3} xs={12}>
                <TotalView cartItems={cartItems}/>
             </Grid> 
         </Container>
        : <EmptyCart/> 

     }
     <LoginDialog open={open} setOpen={setOpen} /> 
    </>
  )
}

export default Cart