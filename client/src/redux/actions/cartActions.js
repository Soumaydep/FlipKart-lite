import axios from'axios';
import * as actionType from '../constants/cartConstant';

const URL='http://localhost:8000';

// export const addToCart=(id,quantity)=> async(dispatch)=>
// {
     
//     try{
        
//         const {data}=await axios.get(`${URL}/product/${id}`);

//         dispatch({type:actionType.ADD_TO_CART,payload:{ ...data,quantity}})
//     }
//     catch(error)
//     {

//         dispatch({type:actionType.ADD_TO_CART_ERROR,payload: error.message})
//     }




// }

export const addToCart=(id)=> async(dispatch)=>
{
     
    try{
        
        const {data}=await axios.get(`${URL}/product/${id}`);

        dispatch({type:actionType.ADD_TO_CART,payload:{ ...data}})
    }
    catch(error)
    {

        dispatch({type:actionType.ADD_TO_CART_ERROR,payload: error.message})
    }




}




export const removeFromCart =(id)=> (dispatch)=>
{

    //here no api so no try catch and no thunk middleware//

    dispatch({type:actionType.REMOVE_FROM_CART,payload:id});
   

}

export const REMOVE = (item) => (dispatch)=>{
    dispatch({
        type: "RMV_ONE",
        payload: item
    })
}