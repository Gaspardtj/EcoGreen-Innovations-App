import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const MemberDashboard = () => {
  const { user } = useAuth();

  // Mock data
  const recentActivities = [
    { id: 1, type: 'Waste Request', date: '2024-01-15', status: 'Completed' },
    { id: 2, type: 'Donation', date: '2024-01-10', status: 'Processed' },
    { id: 3, type: 'Compost Order', date: '2024-01-05', status: 'Delivered' },
  ];

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-8">Welcome, {user?.name}!</h1>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="card bg-primary-50">
          <h3 className="font-semibold mb-2">Waste Requests</h3>
          <p className="text-2xl font-bold text-primary-600">3</p>
          <Link to="/waste-requests" className="text-primary-600 text-sm">View all →</Link>
        </div>
        
        <div className="card bg-green-50">
          <h3 className="font-semibold mb-2">Compost Orders</h3>
          <p className="text-2xl font-bold text-green-600">2</p>
          <Link to="/orders" className="text-green-600 text-sm">View all →</Link>
        </div>
        
        <div className="card bg-blue-50">
          <h3 className="font-semibold mb-2">Donations</h3>
          <p className="text-2xl font-bold text-blue-600">UGX 45,000</p>
          <Link to="/donate" className="text-blue-600 text-sm">Donate more →</Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivities.map(activity => (
              <div key={activity.id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium">{activity.type}</p>
                  <p className="text-sm text-gray-500">{activity.date}</p>
                </div>
                <span className={`px-2 py-1 rounded text-sm ${
                  activity.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link to="/waste-request" className="block btn-primary text-center">Request Waste Pickup</Link>
            <Link to="/compost" className="block btn-secondary text-center">Buy Compost</Link>
            <Link to="/donate" className="block btn-secondary text-center">Make a Donation</Link>
            <Link to="/volunteer" className="block btn-secondary text-center">Become a Volunteer</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;