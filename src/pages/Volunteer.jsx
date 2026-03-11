import React from 'react';
import { Link } from 'react-router-dom';

const Volunteer = () => {
  const opportunities = [
    {
      title: 'Waste Collection Volunteer',
      description: 'Help collect waste from community members and transport to recycling center.',
      commitment: 'Flexible hours',
      locations: ['Kyangwali', 'Kikuube']
    },
    {
      title: 'Community Clean-up Organizer',
      description: 'Organize and lead community clean-up events in different zones.',
      commitment: 'Weekends',
      locations: ['Kyangwali']
    },
    {
      title: 'Environmental Educator',
      description: 'Teach community members about waste management and composting.',
      commitment: '2-3 hours/week',
      locations: ['Kyangwali', 'Kikuube']
    },
    {
      title: 'Compost Production Assistant',
      description: 'Help in turning waste into compost at our production center.',
      commitment: 'Flexible hours',
      locations: ['Kyangwali']
    }
  ];

  return (
    <div className="container-custom py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Become a Volunteer</h1>
      <p className="text-xl text-gray-600 mb-8">Join our team of dedicated volunteers making a difference</p>
      
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="card bg-primary-50">
          <h2 className="text-2xl font-semibold mb-4">Why Volunteer?</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-primary-600">✓</span>
              <span>Make a positive impact on the environment</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600">✓</span>
              <span>Learn about waste management and composting</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600">✓</span>
              <span>Connect with like-minded community members</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600">✓</span>
              <span>Gain valuable experience and skills</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600">✓</span>
              <span>Receive a certificate of appreciation</span>
            </li>
          </ul>
        </div>
        
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Requirements</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-primary-600">•</span>
              <span>Must be 18 years or older</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600">•</span>
              <span>Available for at least 4 hours per week</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600">•</span>
              <span>Passionate about environmental conservation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600">•</span>
              <span>Willing to work in a team</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600">•</span>
              <span>Reliable and committed</span>
            </li>
          </ul>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-6">Available Opportunities</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {opportunities.map((opp, index) => (
          <div key={index} className="card hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-2">{opp.title}</h3>
            <p className="text-gray-600 mb-4">{opp.description}</p>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Commitment:</span> {opp.commitment}</p>
              <p><span className="font-medium">Locations:</span> {opp.locations.join(', ')}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <Link to="/register" className="btn-primary px-8 py-3 text-lg">
          Apply to Volunteer
        </Link>
        <p className="text-gray-500 mt-4">
          Already registered? <Link to="/login" className="text-primary-600 hover:text-primary-700">Login</Link> to see your tasks
        </p>
      </div>
    </div>
  );
};

export default Volunteer;