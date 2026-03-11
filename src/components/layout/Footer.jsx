import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">EcoGreen Innovations</h3>
            <p className="text-gray-400">
              Empowering communities through environmental sustainability in Kyangwali Refugee Settlement and across Uganda.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/impact" className="text-gray-400 hover:text-white transition-colors">Impact</Link></li>
              <li><Link to="/donate" className="text-gray-400 hover:text-white transition-colors">Donate</Link></li>
              <li><Link to="/compost" className="text-gray-400 hover:text-white transition-colors">Buy Compost</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Get Involved</h4>
            <ul className="space-y-2">
              <li><Link to="/volunteer" className="text-gray-400 hover:text-white transition-colors">Volunteer</Link></li>
              <li><Link to="/waste-request" className="text-gray-400 hover:text-white transition-colors">Request Pickup</Link></li>
              <li><Link to="/awareness" className="text-gray-400 hover:text-white transition-colors">Learn More</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Kyangwali Refugee Settlement</li>
              <li>Kikuube District, Uganda</li>
              <li>info@ecogreeninnovations.africa</li>
              <li>+256 XXX XXX XXX</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} EcoGreen Innovations Africa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;