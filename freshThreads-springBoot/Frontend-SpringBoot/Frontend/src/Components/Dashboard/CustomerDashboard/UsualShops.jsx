import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UsualShops() {
  const [shops, setShops] = useState([]);
  const [orderDetails, setOrderDetails] = useState({ shopId: '' });

  // Fetch all shop details on component mount
  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get('http://localhost:8080/shops');
        console.log(response.data);
        setShops(response.data);
      } catch (error) {
        console.error('Error fetching shops:', error);
      }
    };

    fetchShops();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setOrderDetails({ ...orderDetails, [e.target.name]: e.target.value });
  };

  // Handle order submission
  const handleOrder = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/orders', orderDetails);
      alert('Order placed successfully!');
      setOrderDetails({ shopId: '' }); // Reset input field
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Shop Details</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Shop ID</th>
            <th className="border p-2">Shop Name</th>
            <th className="border p-2">Owner Name</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {shops.map((shop) => (
            <tr key={shop.id}>
              <td className="border p-2">{shop.id}</td>
              <td className="border p-2">{shop.shopName}</td>
              <td className="border p-2">{shop.ownerName}</td>
              <td className="border p-2">{shop.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="text-xl font-semibold mt-6">Place an Order</h3>
      <form onSubmit={handleOrder} className="mt-4">
        <label className="block mb-2">Enter Shop ID to Order:</label>
        <input
          type="text"
          name="shopId"
          value={orderDetails.shopId}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter Shop ID"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}

export default UsualShops;
