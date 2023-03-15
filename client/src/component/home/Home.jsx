import React,{useEffect} from 'react';
import Navbar from './Navbar';
import Banner from './Banner';
import {styled,Box} from '@mui/material';
import {getProducts} from '../../redux/actions/productActions';
import {useDispatch} from 'react-redux';
import { useSelector } from 'react-redux';
import Slide from './Slide';
import MidSlide from './MidSlide';
import MidSection from './MidSection';

const Component= styled(Box)
`
 padding:10px;
 background:#f2f2f2;
`;

const Home = () => {

  const getAllProducts=useSelector(state=>state.getProducts)
  const {products}=getAllProducts;

  console.log(products );


  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(getProducts())
  },[dispatch]);

  return (
    <>
        <Navbar/>
        <Component>
          <Banner/>
          <MidSlide products={products} title="Deal of the Day" timer={true}/>
          <MidSection/>
          <Slide products={products} title="Discounts for you" timer={false}/>
          <Slide products={products} title="Suggesting Items" timer={false}/>
          <Slide products={products} title="Top Selection" timer={false}/>
          <Slide products={products} title="Recommended Items" timer={false}/>
          <Slide products={products} title="Trending Offers" timer={false}/>
          <Slide products={products} title="Season's top picks" timer={false}/>
          <Slide products={products} title="Top Deals on Accessories" timer={false}/>
        </Component>
        
    </>
  )
}

export default Home