import * as actioType from '../constants/cartConstant';


export const cartReducer=(state={cartItems:[]},action)=>
{
    switch (action.type) {
        case actioType.ADD_TO_CART:
    //         const item = {...action.payload}; //if data is already exist no need to add to cart one more
    //         const exist= state.cartItems.findIndex(product=>product.id === item.id);

    //         if(exist>=0){
    //             state.cartItems[exist].quantity +=1; 
    //             return {...state, cartItems:state.cartItems.map(data=> data.product === exist.product? item:data) }
    //         }
    //         else {
    //             const temp = {...action.payload,quantity:1}
    //             return {...state, cartItems: [...state.cartItems, temp]}
    //         }


    const IteamIndex = state.cartItems.findIndex((iteam)=> iteam.id === action.payload.id);

    if(IteamIndex >= 0){
        state.cartItems[IteamIndex].quantity+=1
        return {
            ...state,
            cartItems:[...state.cartItems]
        }
    }else{
        const temp = {...action.payload,quantity:1}
         return {
            ...state,
            cartItems: [...state.cartItems, temp]
        }
    }    

        case actioType.REMOVE_FROM_CART:
             return {...state, cartItems:state.cartItems.filter(product => product.id!==action.payload)
            }



            case "RMV_ONE":
                const IteamIndex_dec = state.cartItems.findIndex((iteam)=> iteam.id === action.payload.id);
       
                if(state.cartItems[IteamIndex_dec].quantity >= 1){
                    const dltiteams = state.cartItems[IteamIndex_dec].quantity -= 1
                    console.log([...state.cartItems,dltiteams]);
    
                    return {
                        ...state,
                        cartItems:[...state.cartItems]
                    }
                }else if(state.cartItems[IteamIndex_dec].quantity === 1 ){
                    const data = state.cartItems.filter((el)=>el.id !== action.payload);
    
                    return {
                        ...state,
                        cartItems:data
                    }
                }    

        default:
            return state;
    }
}






