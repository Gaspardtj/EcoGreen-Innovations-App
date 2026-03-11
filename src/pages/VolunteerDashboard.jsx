import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import Layout from '../components/layout/Layout';
import LoadingSpinner from '../components/common/LoadingSpinner';

const CollectorDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('pickups/'); // Django filters by collector automatically in our view
      setTasks(response.data);
    } catch (err) {
      setError('Failed to fetch assigned tasks.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (taskId, nextStatus) => {
    try {
      await api.patch(`pickups/${taskId}/update_status/`, { status: nextStatus });
      fetchTasks(); // Refresh
      alert(`Status updated to ${nextStatus.replace('_', ' ')}!`);
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const getNextStatus = (currentStatus) => {
    switch(currentStatus) {
      case 'assigned': return 'on_the_way';
      case 'on_the_way': return 'collected';
      case 'collected': return 'completed';
      default: return null;
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'assigned': return 'Start Journey';
      case 'on_the_way': return 'Mark as Collected';
      case 'collected': return 'Mark as Completed';
      default: return null;
    }
  };

  return (
    <Layout>
      <div className="container-custom py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Collector Workcenter</h1>
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">
            {tasks.filter(t => t.status !== 'completed').length} Active Tasks
          </span>
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
          <div className="space-y-6">
            {tasks.length === 0 ? (
              <div className="card p-12 text-center text-gray-500 italic">
                No tasks assigned to you yet. Good job!
              </div>
            ) : (
              tasks.map(task => (
                <div key={task.id} className={`card p-6 border-l-8 ${task.status === 'completed' ? 'border-green-500 opacity-75' : 'border-blue-500 shadow-md'}`}>
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Request #{task.id}</span>
                        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs font-bold">{task.waste_type}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{task.address}</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <p><strong>Phone:</strong> {task.phone_number}</p>
                        <p><strong>Amount:</strong> {task.estimated_amount}</p>
                        <p><strong>Time:</strong> {task.pickup_date} at {task.pickup_time}</p>
                        {task.notes && <p className="col-span-2"><strong>Notes:</strong> {task.notes}</p>}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 md:w-48">
                      <div className="bg-gray-50 p-3 rounded text-center">
                        <p className="text-xs uppercase text-gray-500 font-bold mb-1">Current Status</p>
                        <p className="font-bold text-primary-700 uppercase">{task.status.replace('_', ' ')}</p>
                      </div>
                      
                      {task.latitude && (
                        <a 
                          href={`https://www.google.com/maps/dir/?api=1&destination=${task.latitude},${task.longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary text-center py-2 text-sm flex items-center justify-center gap-2"
                        >
                          📍 Navigate
                        </a>
                      )}

                      {getNextStatus(task.status) && (
                        <button 
                          onClick={() => handleUpdateStatus(task.id, getNextStatus(task.status))}
                          className="btn-primary py-2 text-sm"
                        >
                          {getStatusLabel(task.status)}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CollectorDashboard;
