import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Cart.css";
import { Box, Typography, Button } from "@mui/material";
import { AppBar, Toolbar } from "@mui/material";
import Img from "../Products/product_img.avif";
import { useAtom } from "jotai";
import { customerIdAtom, emailAtom } from "../Atoms/atoms";


 function Cart1() {
  const [items, setCartItems] = useState([]);
 const [cusId, setCusId]=useState();
 const[allProduct,setAllProducts]=useState();
 const[items2,setItems2]=useState();
  const [emailId] = useAtom(emailAtom);
  const[addressId,setAddressId]=useState();
  const[customerid, setCustomerid]=useAtom(customerIdAtom)
  // console.log("emailId", emailId);
  const combinedItems=[];


  useEffect(() => {
    fetchCartItems(cusId);
    setCustomerid(cusId);
    fetchAllProducts();   
    getCutomerDetails();
   
   
  }, [cusId]);

 


  async function getCutomerDetails(){
    try {
      const encodedEmail = encodeURIComponent(emailId);
      console.log(encodedEmail);
      const response = await axios.get(
        `http://localhost:8080/api/v1/customer/${emailId}`
      );
      
       setCusId(response.data.customerId);
       
       setAddressId(response.data.address[0].addressId);
       setTimeout(() => {
        
         console.log(cusId,"CUsId");
       }, 2000);
       
       
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  async function fetchCartItems (cusid) {
    try {
      
      const config = {
        headers: { customerId: cusid}
      };
      const response = await axios.get(
        "http://localhost:8080/api/v1/cart",
        config
      );
      setCartItems(response.data.cartItems);
      setItems2(response.data.cartItems);
      console.log(response.data.cartItems);
    } catch (error) {
      console.error(error);
    }
  }

  function fetchAllProducts() {
    axios.get('http://localhost:8080/api/v1/products')
      .then(response => {
        setAllProducts(response.data);
        
      })
      .catch(error => {
        console.error(error);
      });
    }

 

  

  const getProductInfo = async (productid) => {
    const response = await axios
      .get(`http://localhost:8080/api/v1/product/${productid}`)
      .then((resp) => {
        console.log(resp);
        return resp;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleQuantity(opr, item) {

    
    const config = {
      headers: {
        customerId: cusId,
        productId: item.productId,
        operationType: opr,
      },
    };
    axios
      .put("http://localhost:8080/api/v1/cart/update", "", config)
      .then((res) => {
        console.log(res);
        fetchCartItems(cusId);
      })
      .catch((err) => console.log(err));
  }

  function deleteItem(item) {
    const config = {
      headers: {
        customerId: cusId,
      },
    };
    const encodedid = encodeURIComponent(item.id);
    axios
      .delete(`http://localhost:8080/api/v1/cart/${encodedid}`, config)
      .then((response) => {
        console.log(response);
        fetchCartItems(cusId);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCheckOut() {
    axios
      .post("http://localhost:8080/api/v1/orders", {
        customerId: cusId,
        shippingAddressId: addressId,
      })
      .then((resp) => {
        console.log(resp);
        console.log("CheckOut");
      })
      .catch((err) => {
        console.log(err);
      });
  }


  function deleteAll() {
    const config = {
      headers: { customerId: cusId },
    };
    axios
      .delete("http://localhost:8080/api/v1/cart/delete", config)
      .then((res) => {console.log(res);
        fetchCartItems(cusId);})
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Store
          </Typography>
          <Button color="secondary" onClick={() => handleCheckOut()}>
            Checkout Now
          </Button>
        </Toolbar>
      </AppBar>
      <div className="cart">
        <Typography variant="h4" className="cart-title">
          Cart
        </Typography>
        {items?.map((item) => (
          
          <Box
            key={item.id}
            className="cart-item"
            sx={{ border: 2, borderColor: "secondary.main" }}
          >
            <img src={Img} className="cart-item-image" />
            
            {(() => {
                         const product = allProduct.find(productItem => productItem.id === item.productId);
                          return (
                            <>
                              <h3 style={{color:"blueviolet"}}>{product.name} Brand: {product.brand} Price : {product.price}</h3>

                            </>
                          );


                     })()}

            <Button
            style={{ margin: "0 20px"  }}
              variant="outlined"
              color="primary"
              className="cart-item-button"
              onClick={() => handleQuantity(true, item)}
            >
              +
            </Button>
            <Typography variant="body1" style={{ margin: "0 8px" }}>
              {item.quantity}
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              className="cart-item-button"
              onClick={() => handleQuantity(false, item)}
            >
              -
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              className="cart-item-button"
              onClick={() => deleteItem(item)}
            >
              Delete
            </Button>
          </Box>
        ))}

        {items?.length === 0 && (
          <Typography variant="body1">Cart is empty.</Typography>
        )}
        <div>
          {items?.length > 0 && (
            <Button
              variant="contained"
              color="secondary"
              onClick={deleteAll}
              className="cart-clear-button"
            >
              Clear Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}


export default Cart1;
