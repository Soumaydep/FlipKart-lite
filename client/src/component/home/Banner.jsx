import React from 'react';
import {styled} from '@mui/material'
import Carousel from 'react-multi-carousel';
import {bannerData} from '../../constants/data';
import "react-multi-carousel/lib/styles.css";

const Image = styled('img')(({theme})=> ({
    width:'100%',
    height:280,

    [theme.breakpoints.down('md')]:{
      objectFit:'cover',
      height:180
    }
}));



const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };





const Banner = () => {
  return (
    <Carousel
    responsive={responsive}
    swipeable={false}
    draggable={false}
    infinite={true}
    autoPlay={true}
    autoPlaySpeed={4000}
    keyBoardControl={true}
    slidesToSlide={1}
    >
        {
           bannerData.map((data)=>
           {
            return(
                <Image 
                  src={data.url}
                  alt="bannerimg"
                />
            )
           })

        }

    </Carousel>    
  )
}

export default Banner