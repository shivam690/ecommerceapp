
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "./Navbar.css"; 
import { useEffect ,useState} from "react";

const Navbar = () => {  
  const navigate=useNavigate();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("emailId");
    setIsLoggedIn(email !== null);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("emailId");
    navigate("/login");
    setIsLoggedIn(false);
  };
  
 
  return (<div>
     { isLoggedIn ? (
    <div className="navbar-container">
      <nav className="navbar">
        <div>
          <Link to="/" className="navbar-logo">
            E-Cart
          </Link>
        </div>
        <ul className="navbar-list">
          <li>
            <NavLink exact to="/" className="navbar-link">
              Home
            </NavLink>
          </li>
         
         
          <li>
            <NavLink to="/Contact" className="navbar-link">
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink to="/display" className="navbar-link">
             ProductList
            </NavLink>
          </li>

        
          <li>
            <NavLink to="/ProfileData" className="navbar-link">
              ProfileData
            </NavLink>
          </li>
          
            <li>
              <button
                onClick={handleLogout}
                style={{ padding: "10px", color: "grey" }}
              >
                Logout
              </button>
            </li>
        

          
        </ul>
      </nav>
    </div>):
    
    <div className="navbar-container">
    <nav className="navbar">
      <div>
        <Link to="/" className="navbar-logo">
          E-Cart
        </Link>
      </div>
      <ul className="navbar-list">
        <li>
          <NavLink exact to="/" className="navbar-link">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/signup" className="navbar-link">
            SignUp
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" className="navbar-link">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/Contact" className="navbar-link">
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink to="/display" className="navbar-link">
           ProductList
          </NavLink>
        </li>
      </ul>
    </nav>
  </div>}
    </div>
  );
};

export default Navbar;
