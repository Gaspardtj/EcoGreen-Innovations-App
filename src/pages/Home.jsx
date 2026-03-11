import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
  const features = [
    {
      name: 'Waste Collection',
      description: 'Request waste pickup and help keep our community clean',
      icon: 'ðŸ—‘ï¸',
      link: '/waste-request',
      bgColor: 'bg-green-100',
      textColor: 'text-primary-600'
    },
    {
      name: 'Buy Compost',
      description: 'Purchase organic compost manure for your farm',
      icon: 'ðŸŒ±',
      link: '/compost',
      bgColor: 'bg-brown-100',
      textColor: 'text-brown-600'
    },
    {
      name: 'Donate',
      description: 'Support environmental projects in refugee settlements',
      icon: 'â¤ï¸',
      link: '/donate',
      bgColor: 'bg-red-100',
      textColor: 'text-red-600'
    },
    {
      name: 'Volunteer',
      description: 'Join our community of environmental volunteers',
      icon: 'ðŸ‘¥',
      link: '/volunteer',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600'
    }
  ];

  const impactMetrics = [
    { label: 'Waste Collected', value: '15,000 kg', icon: 'ðŸ—‘ï¸' },
    { label: 'Compost Produced', value: '5,000 kg', icon: 'ðŸŒ±' },
    { label: 'Active Volunteers', value: '120+', icon: 'ðŸ‘¥' },
    { label: 'Projects Completed', value: '25', icon: 'âœ…' }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white">
        <div className="container-custom py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Together for a{' '}
              <span className="text-primary-600">Greener Africa</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              Join EcoGreen Innovations in transforming waste into opportunity. 
              Supporting Kyangwali Refugee Settlement and communities across Uganda 
              through sustainable environmental practices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn-primary text-lg px-8 py-3">
                Get Started
              </Link>
              <Link to="/impact" className="btn-secondary text-lg px-8 py-3">
                See Our Impact
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {impactMetrics.map((metric) => (
              <div key={metric.label} className="text-center">
                <div className="text-4xl mb-2">{metric.icon}</div>
                <div className="text-2xl font-bold text-primary-600">{metric.value}</div>
                <div className="text-gray-600">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How You Can Make a Difference
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every action counts in our mission to create a sustainable future
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.name} className="card hover:shadow-xl transition-shadow">
                <div className={`${feature.bgColor} w-16 h-16 rounded-lg flex items-center justify-center mb-6`}>
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.name}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <Link 
                  to={feature.link} 
                  className={`inline-flex items-center ${feature.textColor} hover:opacity-80 font-medium`}
                >
                  Learn more 
                  <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Join the Movement?
          </h2>
          <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
            Whether you want to volunteer, donate, or purchase compost, 
            your participation makes our mission possible.
          </p>
          <Link 
            to="/register" 
            className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Join EcoGreen Today
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
