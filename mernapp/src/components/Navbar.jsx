import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import {useCart} from '../components/ContextReducer';
import Modal from '../Modal';
import Cart from '../pages/Cart';
import { useState } from 'react';

export default function Navbar() {

  const [cartView, setCartView] = useState(false);

  let cart = useCart();
  // console.log("CART",cart);

  const navigate = useNavigate();

  const handlingLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('email');
    navigate('/login')
  }

  return (
    <nav className="nav bg-success p-2 navbar-expand-lg" >
      <div className='navbar-nav me-auto'>
        <div><Link className="nav-link active text-warning fw-bolder fs-5" to="/">LETS EAT</Link></div>
        <div className='ms-5'><Link className="nav-link text-white" to="/">Home</Link></div>
        {/* {
          localStorage.getItem("authToken") ?
          <div className='ms-5'><Link className="nav-link active text-white " to="/myorder">My Orders</Link></div>
          : ""
        } */}
      </div>
      
      {
        !localStorage.getItem("authToken") ? 
        <div className='d-flex'>
          <Link className="text-success btn bg-white mx-1" to="/login">Log in</Link>
          <Link className="text-success btn bg-white mx-1" to="/createuser">Sign up</Link>
        </div>
        : 
        <div>
          <div className='text-success btn bg-white mx-1' onClick={()=>setCartView(true)}>Cart Items {" "}
            <Badge pill bg='danger'>{cart.length}</Badge>
          </div>

          {cartView ? <Modal onClose = {()=> {setCartView(false)}}><Cart /></Modal> : null}
          <div className='text-success btn bg-white mx-1' onClick={handlingLogout}>Logout</div>
        </div>
      }
    </nav>
  )
}