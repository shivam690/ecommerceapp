
import ProductList from './Products/DisplayProducts';
import Login1 from './login';
import ProfileData from './ProfileData';
import ProductDetailsPage from './Products/ProductDetail';
import { BrowserRouter,  Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
 import Cart1 from './Cart/Cart1';
 import Home from './Home';
 import ContactForm from "./Contact";
 import SignUp1 from './SignUP1';


function App() {
  
  return (
   
   <>
   <BrowserRouter>
    <Navbar/>
      <Routes>
      
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactForm/>} />
        <Route path='signup' element={<SignUp1/>}/>

        <Route path='prodDetail' element={<ProductDetailsPage/>}/>
        <Route path="/login" element={<Login1 />} />
       < Route path="/display" element={<ProductList/>}/>
        <Route path="/ProfileData" element={<ProfileData />} />
        <Route path='/cart' element={<Cart1/>}/>
        
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;


