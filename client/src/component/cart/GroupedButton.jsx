import { ButtonGroup,Button,styled } from '@mui/material'
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addToCart, REMOVE} from '../../redux/actions/cartActions';

const Component = styled(ButtonGroup)`
    margin-top: 30px;
`;

const StyledButton = styled(Button)`
    border-radius: 50%;
`;
const GroupedButton = ({item,removeItemFromCart}) => {

  const dispatch = useDispatch();
  const increment = (e)=>{
    // console.log("addbtn",e);
    dispatch(addToCart(e.id));
  }

  const decrement=(e)=>{
  if(e.quantity<=1)
  {
    // console.log("if block",e);
    removeItemFromCart(e.id);
  }
  else{
    // console.log("else block",e);
    //
    dispatch(REMOVE(e));
  }
    
  }
  return (
    <Component>
        <StyledButton onClick={()=>decrement(item)}>-</StyledButton>
        <Button>{item.quantity}</Button>
        <StyledButton onClick={()=>increment(item)}>+</StyledButton>
    </Component>
  )
}

export default GroupedButton