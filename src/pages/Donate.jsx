import React, { useState } from 'react';

const Donate = () => {
  const [amount, setAmount] = useState('');
  const [project, setProject] = useState('');

  const projects = [
    { id: 1, name: 'Waste Collection Program', description: 'Support waste collection in refugee settlements' },
    { id: 2, name: 'Recycling Initiative', description: 'Help us set up recycling facilities' },
    { id: 3, name: 'Community Clean-ups', description: 'Fund regular community clean-up events' },
    { id: 4, name: 'Compost Production', description: 'Support our composting program' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle donation submission
    console.log('Donation:', { amount, project });
  };

  return (
    <div className="container-custom py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Make a Donation</h1>
      <p className="text-xl text-gray-600 mb-12">Support our environmental projects in Kyangwali Refugee Settlement</p>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-2xl font-semibold mb-6">Donation Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Project</label>
              <select 
                value={project} 
                onChange={(e) => setProject(e.target.value)}
                className="input-field"
                required
              >
                <option value="">Choose a project</option>
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Donation Amount (UGX)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="input-field"
                placeholder="Enter amount"
                required
                min="1000"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Information</label>
              <input
                type="text"
                placeholder="Full Name"
                className="input-field mb-2"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                className="input-field mb-2"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="input-field"
                required
              />
            </div>
            
            <button type="submit" className="btn-primary w-full">
              Donate Now
            </button>
          </form>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-6">Our Projects</h2>
          <div className="space-y-4">
            {projects.map(project => (
              <div key={project.id} className="card">
                <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
                <p className="text-gray-600">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;