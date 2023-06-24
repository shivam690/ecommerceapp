import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./ProductDetail.css"
import { productIdAtom ,cus} from './DisplayProducts';
import { Typography, Container, Button } from '@mui/material';
import { useAtom } from 'jotai';
import { customerIdAtom } from '../Atoms/atoms';

function ProductDetailsPage() {
  
  const [product, setProduct] = useState(null);
  const[productId]=useAtom(productIdAtom);
  const[customerid]=useAtom(customerIdAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/product/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const addCart=async()=>{
    try{
      const response= await axios.post("http://localhost:8080/api/v1/cart",{
        customerId:customerid,
        productId:productId,
        quantity:"1"
      })
      console.log(productId,"PId");
      console.log(customerid,"CustomerId");
    }
    catch (error){
      console.log(error);
    }
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="md" className="container">
      <Typography variant="h4" gutterBottom className="heading">
        Product Details
      </Typography>
      <Typography variant="h6" gutterBottom className='name'>
        Name:     {product.name}
      </Typography>
      <Typography variant="body1" gutterBottom className='description'>
        Description:     {product.description}
      </Typography>
      <Typography variant="body1" className='txt' gutterBottom>
        Price:     {product.productPrice}
      </Typography>

      <Typography variant="body1" className='txt' gutterBottom>
        Color:     {product.colour}
      </Typography>
      <Typography variant="body1" className='txt' gutterBottom>
        Available Stock:     {product.availQuantity}
      </Typography>
      <Button color='primary' onClick={()=>{
        addCart();
      }}>Add to Cart</Button>
    </Container>
  );
}

export default ProductDetailsPage;
