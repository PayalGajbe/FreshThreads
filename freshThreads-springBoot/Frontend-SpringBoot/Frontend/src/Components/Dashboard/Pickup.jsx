// import React from 'react'
// import Header from './PickupDashBoard/Header'
// import Sidebar from './PickupDashBoard/Sidebar'
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import OrderDetails from './PickupDashBoard/OrderDetails'
// import DeliveryManProfile from './PickupDashBoard/DeliveryManProfile'
// import CompletedOrders from './PickupDashBoard/CompletedOrders';


// const User = () => {
//   return (
//       <div className="d-flex">
//       {/* Sidebar */}
//       {/* <Sidebar /> */}

//       {/* Main Content */}
//       <div className="flex-grow-1">
//         {/* Header */}
//         <Header />

//         {/* Order Details */}
//         <DeliveryManProfile/>
//         <OrderDetails />
//         <CompletedOrders/>
//         {/* made by payal Gajbe*/}
//       </div>
//     </div>


//   )
// }

// export default User




import React, { useEffect, useState } from 'react';
import axios from 'axios';

const User = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/orders'); // Replace with your API URL
        setOrders(response.data);
      } catch (err) {
        setError('Failed to fetch orders.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Orders List</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-4 py-2 border">Order ID</th>
              {/* <th className="px-4 py-2 border">UserId</th> */}
              <th className="px-4 py-2 border">Total Amount (RS)</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">orderDate</th>
              <th className="px-4 py-2 border">shopId</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="text-center">
                <td className="px-4 py-2 border">{order.id}</td>
                {/* <td className="px-4 py-2 border">{order.userId}</td> */}
                <td className="px-4 py-2 border">${order.totalAmount}</td>
                <td className="px-4 py-2 border">{order.status}</td>
                <td className="px-4 py-2 border">{order.orderDate}</td>
                <td className="px-4 py-2 border">{order.shopId}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default User;



