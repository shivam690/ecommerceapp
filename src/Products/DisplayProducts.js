import React , { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAtom,atom } from "jotai";
// import { customerIdAtom } from '../Atoms/atoms';
// import { emailAtom } from '../login';
import Fetchdata from "../components/Fetchdata";
import Swal from 'sweetalert2';


import {
  Card,CardContent,AppBar,Typography,Container,Grid,Button,Toolbar,TextField,Alert
} from '@mui/material';
import './DisplayProducts.css';
const productIdAtom=atom('');
var id="";
const ProductList = () => {
  const email=localStorage.getItem("emailId");
  const [products, setProducts] = useState([]);
  const [showAlert, setShowAlert] = useState(true);
  const [categories, setCategories] = useState([]);
  // const[emailId]=useAtom(emailAtom);
  // const[customerid,setCustomerid]=useAtom(customerIdAtom);  
  const[customerid,setCustomerid]=useState();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate=useNavigate();
  const[productId, setProductId]=useAtom(productIdAtom);
  const products1 = Fetchdata();
  const imageUrls= ["https://www.startech.com.bd/image/cache/catalog/laptop-accessories/keyboard/lenovo-g-430/lenovo-g-430-01-228x228.webp",
  "https://www.startech.com.bd/image/cache/catalog/laptop/apple/macbook-pro/m2-chip/macbook-pro-13-inch-m2-silver-228x228.jpg",
 "https://www.startech.com.bd/image/cache/catalog/smart-watch/realme/dizo-watch-2-sports/dizo-watch-2-sports-red-228x228.webp",
   
   "https://www.startech.com.bd/image/cache/catalog/laptop/apple/macbook-air/space-gray/13-inch/macbook-air-13-3-inch-228x228.webp",
   "https://www.startech.com.bd/image/cache/catalog/laptop/apple/macbook-air/space-gray/13-inch/macbook-air-13-3-inch-228x228.webp",
  "https://www.startech.com.bd/image/cache/catalog/smart-watch/g-tide/s1-lite/s1-lite-01-228x228.webp",
    "https://www.startech.com.bd/image/cache/catalog/earphone/havit/hv-tw935/hv-tw935-true-wireless-earbuds-01-228x228.jpg",
    "https://www.startech.com.bd/image/cache/catalog/gadget/studio-equipment/casio/sa46/sa46-01-228x228.jpg"
  ];

const mergedProducts = products.map((product, index) => ({
...product,
imgUrl: imageUrls[index] || ""
}));
 
  

  useEffect( 
    () => {
      getCutomerDetails();
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
      return mergedProducts.filter(product => product.name === searchQuery);
    }
    return mergedProducts;
  };
  async function getCutomerDetails(){
    try {
      const encodedEmail = encodeURIComponent(localStorage.getItem("emailId"));
      console.log(encodedEmail);
      const response = await axios.get(
        `http://localhost:8080/api/v1/customer/${encodedEmail}`
      );
      if(response.status===200)
      setCustomerid(response.data.customerId);
      
  
       
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
 
  const addCart=async(item)=>{
    try{
      console.log(customerid,"CustomerId fron AddCart")
      
      const response= await axios.post("http://localhost:8080/api/v1/cart",{
        "customerId":customerid,
        "productId":item.id,
        "quantity":1
      })

      if(localStorage.getItem("emailId")!=null)
      Swal.fire("Ok", "Product added Successfully", "success");
  
    }
    catch (error){
      Swal.fire("Eroor", "Please Login to Add Items", "error");
    }
  }

  const searchProducts = () => {
    if (searchQuery) {
      return mergedProducts.filter(product =>
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
                variant="filled"
                color='secondary'
                style={{marginRight:"10px"}}

              />
              <button  className="btn" onClick={()=>{ navigatetoCart() }}>cart</button>
             
            </Toolbar>
          </AppBar>
          <Grid container spacing={2}>
            {searchProducts().map(product => (
              <Grid item xs={12} sm={6} md={4} key={product.productId}>
                <Card className="product-card">
                  <CardContent>
                  <img src={product.imgUrl}/>
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