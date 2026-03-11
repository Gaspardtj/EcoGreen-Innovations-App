import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import Layout from '../../components/layout/Layout';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('pickups');
  const [pickups, setPickups] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [collectors, setCollectors] = useState([]);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (activeTab === 'pickups') {
        const response = await api.get('pickups/');
        setPickups(response.data);
        const usersResponse = await api.get('users/');
        setCollectors(usersResponse.data.filter(u => u.role === 'collector'));
      } else if (activeTab === 'users') {
        const response = await api.get('users/');
        setUsers(response.data);
      } else if (activeTab === 'products') {
        const response = await api.get('products/');
        setProducts(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch admin data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAssignCollector = async (pickupId, collectorId) => {
    try {
      await api.patch(`pickups/${pickupId}/`, { collector: collectorId, status: 'assigned' });
      fetchData(); // Refresh
      alert('Collector assigned!');
    } catch (err) {
      alert('Failed to assign collector');
    }
  };

  return (
    <Layout>
      <div className="container-custom py-12">
        <h1 className="text-3xl font-bold mb-8">Admin Command Center</h1>

        {/* Tabs */}
        <div className="flex border-b mb-8 overflow-x-auto">
          {['pickups', 'users', 'products', 'analytics'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium capitalize whitespace-nowrap ${activeTab === tab ? 'border-b-2 border-primary-600 text-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-24">
            <LoadingSpinner size="large" />
          </div>
        ) : (
          <div className="card">
            {activeTab === 'pickups' && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left p-4">Request ID</th>
                      <th className="text-left p-4">User</th>
                      <th className="text-left p-4">Waste Type</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Assigned To</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pickups.map(p => (
                      <tr key={p.id} className="border-b">
                        <td className="p-4 font-mono">#{p.id}</td>
                        <td className="p-4">{p.user}</td>
                        <td className="p-4">{p.waste_type}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-xs uppercase font-bold ${p.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="p-4">
                          {p.collector ? collectors.find(c => c.id === p.collector)?.username || p.collector : 'None'}
                        </td>
                        <td className="p-4">
                          <select 
                            onChange={(e) => handleAssignCollector(p.id, e.target.value)}
                            className="text-xs border rounded p-1"
                            value={p.collector || ''}
                          >
                            <option value="">Assign Collector</option>
                            {collectors.map(c => (
                              <option key={c.id} value={c.id}>{c.username}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left p-4">Username</th>
                      <th className="text-left p-4">Email</th>
                      <th className="text-left p-4">Role</th>
                      <th className="text-left p-4">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u.id} className="border-b">
                        <td className="p-4 font-bold">{u.username}</td>
                        <td className="p-4">{u.email}</td>
                        <td className="p-4 text-xs">
                          <span className="px-2 py-1 bg-gray-100 rounded">{u.role}</span>
                        </td>
                        <td className="p-4 text-gray-500">{new Date().toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'products' && (
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.map(product => (
                    <div key={product.id} className="border rounded-lg p-4">
                      <h3 className="font-bold">{product.name}</h3>
                      <p className="text-xs text-gray-500">{product.category}</p>
                      <p className="text-primary-600 font-bold mt-2">UGX {Number(product.price).toLocaleString()}</p>
                      <div className="mt-4 flex gap-2">
                        <button className="text-xs bg-gray-100 px-2 py-1 rounded">Edit</button>
                        <button className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-8 btn-primary">Add New Product</button>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="p-12 text-center">
                <p className="text-gray-500 italic">Analytics dashboard coming soon with real-time charts.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminDashboard;
