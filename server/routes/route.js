import express from 'express';
import { userSignup,userLogin, getTokenAfLogin } from '../controller/user-controller';
import { getProducts,getProductById} from '../controller/product-controller';
import { checkout, paymentVerification } from '../controller/paymentController.js';

const router= express.Router();


router.post('/signup',userSignup);
router.post('/login',userLogin);
router.get('/getToken',getTokenAfLogin);
router.get('/products',getProducts);
router.get('/product/:id',getProductById);
router.post('/api/checkout',checkout);
router.post('/api/paymentVerification',paymentVerification);

export default router;