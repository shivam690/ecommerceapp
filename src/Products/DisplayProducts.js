import React , { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAtom,atom } from "jotai";
import { customerIdAtom } from '../Atoms/atoms';


import {
  Card,CardContent,AppBar,Typography,Container,Grid,Button,Toolbar,TextField,
} from '@mui/material';
import './DisplayProducts.css';
const productIdAtom=atom('');
var id="";
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const[customerid]=useAtom(customerIdAtom);  
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate=useNavigate();
  const[productId, setProductId]=useAtom(productIdAtom);

  useEffect( 
    () => {
    axios.get('http://localhost:8080/api/v1/products')
      .then(response => {
        setProducts(response.data);
        
      })
      .catch(error => {
        console.error(error);
      });

    axios.get('http://localhost:8080/api/v1/category/${serchQuery}')
      .then(response => {
        setCategories(response.data);
        
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filterProducts = () => {
    if (selectedCategory) {
      return products.filter(product => product.category === selectedCategory);
    }
    return products;
  };
  const addCart=async(item)=>{
    try{
      console.log(customerid,"CustomerId")

      const response= await axios.post("http://localhost:8080/api/v1/cart",{
        "customerId":customerid ,
        "productId":item.id,
        "quantity":1
      })

      console.log(response,"respnse");
    }
    catch (error){
      console.log(error);
    }
  }

  const searchProducts = () => {
    if (searchQuery) {
      return filterProducts().filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filterProducts();
  };

  const navigatetoCart=()=>{
    navigate("/cart");
  }
 
 
  
 
  const navigateToProdDetail=()=>{
    setProductId(id);
    navigate("/prodDetail");
  }
  return (
    <div>
      <div>
        <Container maxWidth="lg">
          <AppBar position="static">
          
            <Toolbar>
            
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                My Store
              </Typography>
             
              <TextField
                label="Search by Category"
                value={searchQuery}
                onChange={handleSearchInputChange}
                variant="outlined"
                color='secondary'
                style={{marginRight:"10px"}}

              />
              <Button color='secondary' onClick={()=>{ navigatetoCart() }}>cart</Button>
             
            </Toolbar>
          </AppBar>
          <Grid container spacing={2}>
            {searchProducts().map(product => (
              <Grid item xs={12} sm={6} md={4} key={product.productId}>
                <Card className="product-card">
                  <CardContent>
                    <Typography variant="h6" component="h2">{product.name}</Typography>
                    <Typography>{product.description}</Typography>
                    <Typography className="price">Price: Rs {product.productPrice}</Typography>
                  </CardContent>
                  <Button variant="contained" color="primary" className="action-button" onClick={()=>{addCart(product)}}>Add to Cart </Button >
                  <Button variant="contained" color="secondary" className="action-button" onClick={()=>{
                   id=product.id
                    navigateToProdDetail();
                    
                  }}>View Product </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </div>)}
    export {productIdAtom};
    export default ProductList;