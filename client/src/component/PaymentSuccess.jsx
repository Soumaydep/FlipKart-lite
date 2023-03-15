import React from 'react';
import { Box,Stack,Typography,styled,Button } from '@mui/material';
import { Link,useSearchParams } from 'react-router-dom';

const Component = styled(Box)`
    width: 80%;
    height: 65vh;
    background: #fff;
    margin: 80px 140px;
    display:flex;
    justify-content:center;
    align-items:center;
`;

const StyledButton = styled(Button)(({theme})=> ({
  width: '35%',
  borderRadius: 2,
  height: 50,
  [theme.breakpoints.down('lg')]:{
    width:'34%'
  },
  [theme.breakpoints.down('sm')]:{
    width:'37%'
  },

}));

const Container = styled(Stack)`
    text-align: center;
    padding-top: 70px;
    
`;

const Image = styled('img')({
    width: '15%',
    padding:0
});

const PaymentSuccess = () => {

  const searchQuery=useSearchParams()[0];
  console.log(searchQuery.get("reference"));

  const referenceNum=searchQuery.get("reference");

  return (
    <Component>
            <Container>
                
                <Box>
                <Image src="https://icon-library.com/images/a64263729c_7415.png" alt="done"/>  
                </Box>
                
                <Typography style={{fontSize:30 ,fontWeight:"bold"}}>You're all set</Typography>
                <Typography style={{color:"GrayText"}}>We have received payment for your order.</Typography>
                <Typography component="span" style={{color:"GrayText"}}>Order ID:{referenceNum}</Typography>
                <Box>
                  <Link to='/' style={{textDecoration:"none"}}>
                 <StyledButton   style={{marginTop: 15, background: '#ff9f00', fontSize:12}} variant="contained">Continue Shopping</StyledButton>
                 </Link>
                </Box>
            </Container>
        </Component>
  )
}

export default PaymentSuccess;