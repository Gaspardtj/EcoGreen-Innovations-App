import React from 'react';

const OrderHistory = () => {
  return (
    <div className="container-custom py-16">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      <div className="card">
        <p className="text-gray-600">You haven't placed any orders yet.</p>
      </div>
    </div>
  );
};

export default OrderHistory;