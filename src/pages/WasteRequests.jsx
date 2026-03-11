import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import Layout from '../components/layout/Layout';
import LoadingSpinner from '../components/common/LoadingSpinner';

const WasteRequests = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await api.get('pickups/');
      setRequests(response.data);
    } catch (err) {
      setError('Failed to fetch requests. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'approved': return 'bg-green-100 text-green-700';
      case 'assigned': return 'bg-blue-100 text-blue-700';
      case 'on_the_way': return 'bg-indigo-100 text-indigo-700';
      case 'collected': return 'bg-teal-100 text-teal-700';
      case 'completed': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatStatus = (status) => {
    return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <Layout>
      <div className="container-custom py-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">My Waste Requests</h1>
          <Link to="/waste-request/new" className="btn-primary">
            New Request
          </Link>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">
            {error}
          </div>
        )}

        <div className="card">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="large" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Waste Type</th>
                    <th className="text-left py-3 px-4">Amount</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map(request => (
                    <tr key={request.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{request.pickup_date}</td>
                      <td className="py-3 px-4">{request.waste_type}</td>
                      <td className="py-3 px-4">{request.estimated_amount}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-sm ${getStatusColor(request.status)}`}>
                          {formatStatus(request.status)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-primary-600 hover:text-primary-700">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {requests.length === 0 && !error && (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">No waste requests found.</p>
                  <Link to="/waste-request/new" className="text-primary-600 hover:text-primary-700 font-medium">
                    Create your first request
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default WasteRequests;
