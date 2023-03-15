import {createStore,combineReducers,applyMiddleware} from 'redux';

import {composeWithDevTools} from 'redux-devtools-extension';
import { getProductsReducer,getProductDetailsReducer } from './reducer/productReducer';
import {cartReducer} from './reducer/cartReducer';

import thunk from 'redux-thunk'

const reducer= combineReducers({
    getProducts: getProductsReducer,
    getProductDetails:getProductDetailsReducer,
    cart: cartReducer
});

const middleware=[thunk];

const store =createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware)) 
)

export default store;