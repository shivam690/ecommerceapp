
import ProductList from './Products/DisplayProducts';
import DisplayProduct from './Products/DisplayProducts';
import Login from './Authentication/Login';
import ProfileData from './ProfileData';
import { BrowserRouter,  Route, Routes } from 'react-router-dom';
import SignUp1 from './Authentication/SignUP1';
import ProductDetails from './Products/ProductDetail';
 import Cart1 from './Cart/Cart1';

 
import Navbar from './components/Navbar';
import { Home } from '@mui/icons-material';
import { Test } from './New';

function App() {
  

  return (
   
   <>
   
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/cart" element={<Cart1/>}/>
    <Route path="/profile" element={<ProfileData/>}/>
    <Route path="/prodDetail" element={<ProductDetails/>}/>
    <Route path="/display" element={<DisplayProduct/>}/>
    <Route path="/test" element={<Test/>}/>

   </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;


