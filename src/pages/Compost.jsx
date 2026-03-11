import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import Layout from '../components/layout/Layout';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Compost = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Fetch products in category 'Compost' or 'Agriculture'
      const response = await api.get('products/');
      const agricultureProducts = response.data.filter(p => 
        p.category === 'Compost' || p.category === 'Agriculture'
      );
      setProducts(agricultureProducts);
    } catch (err) {
      setError('Failed to fetch agriculture products.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container-custom py-16">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Sustainable Agriculture Hub</h1>
            <p className="text-gray-600">Organic manure, fertilizers, and eco-friendly pesticides for our farmers.</p>
          </div>
          <Link to="/orders" className="btn-secondary">View My Orders</Link>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center py-24">
            <LoadingSpinner size="large" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <div key={product.id} className="card hover:shadow-lg transition-all flex flex-col h-full">
                <div className="h-48 bg-primary-100 flex items-center justify-center rounded-t-lg mb-4">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover rounded-t-lg" />
                  ) : (
                    <span className="text-primary-500 font-bold text-lg uppercase tracking-widest">{product.category}</span>
                  )}
                </div>
                
                <div className="p-4 flex-1 flex flex-col">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h2>
                  <p className="text-gray-600 mb-4 text-sm flex-1">{product.description}</p>
                  
                  <div className="flex justify-between items-center mt-auto">
                    <p className="text-2xl text-primary-600 font-bold">UGX {Number(product.price).toLocaleString()}</p>
                    <span className={`text-xs px-2 py-1 rounded ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </span>
                  </div>

                  <div className="flex gap-2 mt-6">
                    <Link to={`/compost/${product.id}`} className="btn-secondary flex-1 text-center py-2">
                      Details
                    </Link>
                    <button className="btn-primary flex-1 py-2">Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {products.length === 0 && !isLoading && !error && (
          <div className="text-center py-24">
            <p className="text-gray-500 italic text-lg">No agriculture products available at the moment.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Compost;
