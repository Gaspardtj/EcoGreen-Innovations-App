import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import Layout from '../components/layout/Layout';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Impact = () => {
  const [stats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEnvironmentalData();
  }, []);

  const fetchEnvironmentalData = async () => {
    try {
      const response = await api.get('environmental/live_stats/');
      setStats(response.data);
    } catch (err) {
      setError('Failed to fetch environmental data.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container-custom py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Environmental Impact Dashboard</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-time environmental indicators for Uganda and Africa. 
            Tracking air quality, carbon emissions, and temperature changes.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-24">
            <LoadingSpinner size="large" />
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stats.map((item) => (
              <div key={item.id} className="card p-6 border-t-4 border-primary-500 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                      {item.parameter}
                    </h3>
                    <p className="text-lg font-bold text-gray-900">{item.location}</p>
                  </div>
                  <span className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded">
                    Live
                  </span>
                </div>
                
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-extrabold text-primary-600">{item.value}</span>
                  <span className="ml-2 text-xl text-gray-500 font-medium">{item.unit}</span>
                </div>

                <div className="pt-4 border-t border-gray-100 mt-auto">
                  <p className="text-xs text-gray-400">
                    Last updated: {new Date(item.last_updated).toLocaleString()}
                  </p>
                  {item.source && (
                    <p className="text-xs text-gray-400">Source: {item.source}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-20 card bg-primary-900 text-white p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Collective Goal</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            To reduce plastic waste in Kyangwali by 40% by 2027 and increase climate literacy among 10,000 households.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm w-40">
              <p className="text-3xl font-bold">12.5k</p>
              <p className="text-sm text-primary-200 uppercase">Trees Planted</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm w-40">
              <p className="text-3xl font-bold">4.2t</p>
              <p className="text-sm text-primary-200 uppercase">Plastic Recycled</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm w-40">
              <p className="text-3xl font-bold">850</p>
              <p className="text-sm text-primary-200 uppercase">Eco-Farmers</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Impact;
