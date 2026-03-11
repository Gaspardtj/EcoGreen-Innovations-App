import React from 'react';
import { useParams, Link } from 'react-router-dom';

const CompostDetail = () => {
  const { id } = useParams();
  
  // Mock product data - replace with API call
  const product = {
    id: id,
    name: 'Organic Compost Manure',
    price: 15000,
    description: 'High-quality organic compost produced from biodegradable waste. Perfect for farming and gardening.',
    weight: '10kg',
    availability: 'In Stock',
    features: [
      '100% organic',
      'Rich in nutrients',
      'Improves soil structure',
      'Eco-friendly',
      'Locally produced'
    ]
  };

  return (
    <div className="container-custom py-16">
      <Link to="/compost" className="text-primary-600 hover:text-primary-700 mb-4 inline-block">
        ← Back to Products
      </Link>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="card">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl text-primary-600 font-bold mb-4">UGX {product.price.toLocaleString()}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Key Features:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="font-medium">Quantity:</label>
              <select className="input-field w-24">
                {[1,2,3,4,5].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
            
            <button className="btn-primary w-full">Add to Cart</button>
            <button className="btn-secondary w-full">Buy Now</button>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Product Details</h2>
            <table className="w-full">
              <tbody>
                <tr className="border-b">
                  <td className="py-2 font-medium">Weight:</td>
                  <td className="py-2">{product.weight}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-medium">Type:</td>
                  <td className="py-2">Organic</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-medium">Availability:</td>
                  <td className="py-2 text-green-600">{product.availability}</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Delivery:</td>
                  <td className="py-2">Cash on Delivery / Pickup</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="card bg-primary-50">
            <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
            <p className="text-gray-700 mb-2">We offer two delivery options:</p>
            <ul className="list-disc list-inside text-gray-600">
              <li>Pickup from our center in Kyangwali</li>
              <li>Delivery to your location (additional fee may apply)</li>
            </ul>
            <p className="mt-4 text-sm text-gray-500">Payment: Cash on Delivery / Pickup</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompostDetail;