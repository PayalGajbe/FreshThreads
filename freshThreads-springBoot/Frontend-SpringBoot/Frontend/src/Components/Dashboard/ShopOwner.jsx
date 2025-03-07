// import React, { useState } from "react";
// import OrderDetails from "./ShopOwnerDashboard/SOrderDetails";
// import PickupOverview from "./ShopOwnerDashboard/SPickupOverview";
// import PaymentStatus from "./ShopOwnerDashboard/SPaymentStatus";
// import ShopDetails from "./ShopOwnerDashboard/SShopDetails";

// const ShowOwnerDashboard = () => {
//   const [orders, setOrders] = useState([
//     { id: "001", user: "Ace", status: "Ready", payment: "paid" },
//     { id: "002", user: "Ben", status: "Cleaning", payment: "pending" },
//     { id: "003", user: "Charlie", status: "Not Started", payment: "pending" },
//   ]);

//   const [pickups] = useState([
//     { id: "P001", location: "loc A", time: "10:00 AM" },
//     { id: "P002", location: "loc B", time: "11:00 AM" },
//   ]);

//   const [payments, setPayments] = useState({
//     completed: 1, // Initially calculate based on orders array
//     pending: 2,
//   });

//   const [shop] = useState({
//     name: "Anil",
//     address: "123 High St, Mumbai",
//     rating: 4.5,
//     dailyOrders: 45,
//     pendingOrders: 5,
//   });

//   // Function to update the status of an order
//   const updateOrderStatus = (id, newStatus) => {
//     const updatedOrders = orders.map((order) =>
//       order.id === id ? { ...order, status: newStatus } : order
//     );
//     setOrders(updatedOrders);
//   };

//   // Function to update the payment status of an order
//   const updateOrderPayment = (id, newPayment) => {
//     const updatedOrders = orders.map((order) =>
//       order.id === id ? { ...order, payment: newPayment } : order
//     );
//     setOrders(updatedOrders);

//     // Recalculate payments
//     const completed = updatedOrders.filter((order) => order.payment === "paid")
//       .length;
//     const pending = updatedOrders.filter((order) => order.payment === "pending")
//       .length;

//     setPayments({ completed, pending });
//   };

//   return (
//     <div className="container-fluid py-4">
//       <div className="row d-flex justify-content-center">
//         <div className="col-md-12">
//           <h3>Owner Dashboard</h3>
//           <hr />
//           <ShopDetails shop={shop} />
//         </div>
//         <div className="col-md-12">
//           <OrderDetails
//             orders={orders}
//             updateOrderStatus={updateOrderStatus}
//             updateOrderPayment={updateOrderPayment}
//           />
//         </div>
//         <div className="col-md-12">
//           <PickupOverview pickups={pickups} />
//         </div>
//         <div className="col-md-12">
//           <PaymentStatus payments={payments} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShowOwnerDashboard;



// Install Axios if you haven't:
// npm install axios

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShopDetails } from '../../features/shopSlice';
import { useParams } from 'react-router-dom';

const ShowOwnerDashboard = () => {
  const dispatch = useDispatch();
  const shopDetails = useSelector((state) => state.shop.details);
  // const { shopId } = useParams();

   const shopId = 7; // Replace with the actual shop ID or fetch it dynamically

  useEffect(() => {
    if (shopId) {
      dispatch(fetchShopDetails(shopId)); // Pass the shopId here
    }
  }, [dispatch, shopId]);

  return (
    <div>
      <h2>Shop Details</h2>
      {Object.keys(shopDetails).length > 0 ? (
        <div>
          <p><strong>Name:</strong> {shopDetails?.shopName}</p>
          <p><strong>Location:</strong> {shopDetails?.status}</p>
          <p><strong>Owner:</strong> {shopDetails?.ownerName}</p>
        </div>
      ) : (
        <p>No shop details found.</p>
      )}
    </div>
  );
};

export default ShowOwnerDashboard;
