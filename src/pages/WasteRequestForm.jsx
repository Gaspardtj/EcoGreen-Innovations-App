import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Layout from '../components/layout/Layout';
import LoadingSpinner from '../components/common/LoadingSpinner';

const WasteRequestForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    waste_type: '',
    estimated_amount: '',
    pickup_date: '',
    pickup_time: '',
    address: '',
    phone_number: '',
    notes: '',
    latitude: '',
    longitude: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await api.post('pickups/', formData);
      if (response.status === 201) {
        navigate('/waste-requests');
      }
    } catch (err) {
      setError(err.response?.data ? Object.values(err.response.data).flat().join(', ') : 'Failed to create request');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFormData({
          ...formData,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        alert('Location captured!');
      }, (err) => {
        alert('Failed to get location. Please allow location access.');
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <Layout>
      <div className="container-custom py-12">
        <div className="max-w-2xl mx-auto card">
          <h1 className="text-3xl font-bold mb-6">Request Waste Pickup</h1>
          <p className="text-gray-600 mb-8">Fill in the details below to schedule a waste collection.</p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Waste Type</label>
                <select
                  name="waste_type"
                  required
                  value={formData.waste_type}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">Select type</option>
                  <option value="Organic">Organic / Food Waste</option>
                  <option value="Plastic">Plastic</option>
                  <option value="Paper">Paper / Cardboard</option>
                  <option value="Electronic">Electronic (e-waste)</option>
                  <option value="Mixed">Mixed Waste</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Amount</label>
                <select
                  name="estimated_amount"
                  required
                  value={formData.estimated_amount}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">Select amount</option>
                  <option value="Small Bag">Small Bag</option>
                  <option value="Large Bag">Large Bag</option>
                  <option value="Multiple Bags">Multiple Bags</option>
                  <option value="Truck Load">Truck Load</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
                <input
                  type="date"
                  name="pickup_date"
                  required
                  value={formData.pickup_date}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Time</label>
                <input
                  type="time"
                  name="pickup_time"
                  required
                  value={formData.pickup_time}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Address</label>
              <textarea
                name="address"
                required
                rows="3"
                value={formData.address}
                onChange={handleChange}
                className="input-field"
                placeholder="Village, Street, Building..."
              ></textarea>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone_number"
                  required
                  value={formData.phone_number}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="+256..."
                />
              </div>
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={handleGetLocation}
                  className="w-full md:w-auto px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm font-medium transition-colors"
                >
                  📍 Pin GPS Location
                </button>
              </div>
            </div>

            {formData.latitude && (
              <p className="text-xs text-green-600">Location captured: {formData.latitude}, {formData.longitude}</p>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
              <textarea
                name="notes"
                rows="2"
                value={formData.notes}
                onChange={handleChange}
                className="input-field"
                placeholder="Any special instructions for the collector?"
              ></textarea>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary disabled:opacity-50"
              >
                {isLoading ? <LoadingSpinner size="small" /> : 'Schedule Pickup'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default WasteRequestForm;
