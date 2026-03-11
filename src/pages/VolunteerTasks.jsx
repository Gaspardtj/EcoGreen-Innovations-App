import React, { useState } from 'react';

const VolunteerTasks = () => {
  const [tasks] = useState([
    { id: 1, location: 'Zone A, Kyangwali', wasteType: 'Mixed', date: '2024-03-05', time: '09:00', status: 'Assigned' },
    { id: 2, location: 'Zone B, Kyangwali', wasteType: 'Organic', date: '2024-03-05', time: '14:00', status: 'Assigned' },
    { id: 3, location: 'Zone C, Kyangwali', wasteType: 'Plastic', date: '2024-03-06', time: '10:00', status: 'Pending' },
  ]);

  // eslint-disable-next-line no-unused-vars
  const [selectedTask, setSelectedTask] = useState(null);

  const handleAcceptTask = (taskId) => {
    console.log('Accepting task:', taskId);
    // API call to accept task
  };

  const handleCompleteTask = (taskId) => {
    console.log('Completing task:', taskId);
    // API call to mark task as complete
  };

  return (
    <div className="container-custom py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">My Volunteer Tasks</h1>
      <p className="text-xl text-gray-600 mb-8">View and manage your assigned waste collection tasks</p>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="card text-center">
          <p className="text-gray-600 mb-2">Assigned Tasks</p>
          <p className="text-3xl font-bold text-primary-600">2</p>
        </div>
        <div className="card text-center">
          <p className="text-gray-600 mb-2">Completed This Week</p>
          <p className="text-3xl font-bold text-green-600">1</p>
        </div>
        <div className="card text-center">
          <p className="text-gray-600 mb-2">Pending Tasks</p>
          <p className="text-3xl font-bold text-yellow-600">1</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {tasks.map(task => (
          <div key={task.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Pickup at {task.location}</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>Waste Type: {task.wasteType}</p>
                  <p>Date: {task.date} at {task.time}</p>
                  <p>Status: 
                    <span className={`ml-2 px-2 py-1 rounded text-xs ${
                      task.status === 'Assigned' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {task.status}
                    </span>
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2 w-full md:w-auto">
                {task.status === 'Pending' && (
                  <button 
                    onClick={() => handleAcceptTask(task.id)}
                    className="btn-primary flex-1 md:flex-none"
                  >
                    Accept Task
                  </button>
                )}
                {task.status === 'Assigned' && (
                  <>
                    <button className="btn-secondary flex-1 md:flex-none">
                      View Details
                    </button>
                    <button 
                      onClick={() => handleCompleteTask(task.id)}
                      className="btn-primary flex-1 md:flex-none"
                    >
                      Mark Complete
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {tasks.length === 0 && (
          <div className="text-center py-8 card">
            <p className="text-gray-500">No tasks assigned yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VolunteerTasks;