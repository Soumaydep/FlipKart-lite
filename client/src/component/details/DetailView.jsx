import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../redux/actions/productActions";
import { useParams } from "react-router-dom";
import { Box,styled, Grid } from "@mui/material";
import ActionItem from "./ActionItem";
import ProductDetail from "./ProductDetail";

const Component = styled(Box)`
  background: #f2f2f2;
  margin-top: 55px;
`;

const Container = styled(Grid)(({theme}) => ({
  background: '#ffffff',
  display: 'flex',
  [theme.breakpoints.down('md')]:{
    margin:0
  }
}));

const RightContainer = styled(Grid)`
  margin-top: 50px;
  padding-left: 25px;
  &p > {
    margin-top: 10px;
  }
`;

const DetailView = () => {
  const fassured =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png";

  const { id } = useParams();

  const dispatch = useDispatch();

  const { loading, product } = useSelector((state) => state.getProductDetails);

  useEffect(() => {
    if (product && id !== product.id) dispatch(getProductDetails(id));
  }, [dispatch, product, id, loading]);

  console.log(product);

  return (
    <Component>
      {product && Object.keys(product).length && (
        <Container container>
          <Grid item lg={4} md={4} sm={8} xs={12}>
            <ActionItem product={product} />
          </Grid>
          <RightContainer item lg={4} md={4} sm={8} xs={12}>
            <ProductDetail product={product}/>
          </RightContainer>
        </Container>
      )}
    </Component>
  );
};

export default DetailView;
