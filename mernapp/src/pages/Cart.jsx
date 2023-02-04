import React from 'react';
import {useCart, useDispatchCart} from '../components/ContextReducer';

export default function Cart() {

    let data = useCart();
    console.log("TYPE",typeof data);    
    console.log("DATA", data);

    let dispatch = useDispatchCart();
    let email = localStorage.getItem("email");

    if(data.length === 0) {
        return(
            <div>
                <div className='m-5 w-100 text-center text-white fs-1'>This Cart is Empty!</div>
            </div>
        )
    }

    let totalPrice = data.reduce((total, food) => total + food.price, 0)

    const handleCheckOut = async() => {
      const response = await fetch('http://localhost:5000/api/cartData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          data: data,
          date: "Fri Jan 25 2023"
        })
      })

      if(response.status === 200) {
        dispatch({type: "DROP"})
      }
      const backendResp = await response.json();
      console.log("From Cart",backendResp);
    }

  return (
    <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>
          <thead className='text-success fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody className='text-white fs-6'>
            {data.map((food, index) => (
              <tr>
                <th scope='row' >{index + 1}</th>
                <td >{food.name}</td>
                <td>{food.quantity}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td ><button type="button" className="btn p-0 text-white" onClick={() => { dispatch({ type: "REMOVE", index: index }) }}>Delete</button> </td>
                </tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2 text-white'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
        </div>
      </div>
  )
}