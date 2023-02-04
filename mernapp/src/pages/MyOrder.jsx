// import React from 'react'
// import { useEffect, useState } from 'react';

// export default function MyOrder() {

//     const [orders, setOrders] = useState([]);

//     async function fetchdata() {
//         let response = await fetch('http://localhost:5000/api/myOrder', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
    
//             body: JSON.stringify({email: localStorage.getItem('email')})
//         })
    
//         let backendResp = await response.json();
//         console.log(backendResp);

//         setOrders([...orders, backendResp.data])
//     }

//     useEffect(()=> {
//         fetchdata()
//     },[])



//   return (
//     <div>
//         {orders.length ?
//         orders.map((ele, idx)=> {
//             return(
//                 <div key={idx}>
//                     {ele[0].date}
//                 </div>
//             )
//         })
//         : null}
//     </div>
//   )
// }
