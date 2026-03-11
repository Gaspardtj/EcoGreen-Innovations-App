import React, { useState } from 'react';
import api from '../api/axios';
import Layout from '../components/layout/Layout';
import LoadingSpinner from '../components/common/LoadingSpinner';

const CropDetection = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState(null);
  const [error, setError] = useState('');
  const [cropType, setCropType] = useState('maize');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setDiagnosis(null);
      setError('');
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setIsLoading(true);
    setError('');

    // Prepare form data
    const formData = new FormData();
    formData.append('image', image);
    formData.append('crop_type', cropType);

    try {
      // API call to the backend
      const response = await api.post('diagnoses/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      // Simulate analysis delay
      setTimeout(() => {
        setDiagnosis(response.data);
        setIsLoading(false);
      }, 2000);

    } catch (err) {
      setError('Analysis failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container-custom py-16 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Crop Disease Detection</h1>
          <p className="text-xl text-gray-600">
            Upload a photo of your crop for an instant AI-powered diagnosis and treatment recommendations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Upload Section */}
          <div className="card p-8">
            <h2 className="text-xl font-bold mb-6">Step 1: Upload Photo</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Crop Type</label>
              <select 
                value={cropType} 
                onChange={(e) => setCropType(e.target.value)}
                className="input-field"
              >
                <option value="maize">Maize (Corn)</option>
                <option value="beans">Beans</option>
                <option value="cassava">Cassava</option>
                <option value="tomatoes">Tomatoes</option>
                <option value="coffee">Coffee</option>
              </select>
            </div>

            <div 
              className="border-2 border-dashed border-primary-300 rounded-xl p-8 text-center bg-primary-50 hover:bg-primary-100 transition-colors cursor-pointer"
              onClick={() => document.getElementById('crop-input').click()}
            >
              {preview ? (
                <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded-lg shadow-md mb-4" />
              ) : (
                <div className="py-8 text-primary-400">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <p className="text-lg font-medium">Click to upload photo</p>
                  <p className="text-sm">JPEG, PNG supported</p>
                </div>
              )}
              <input 
                id="crop-input" 
                type="file" 
                className="hidden" 
                accept="image/*" 
                onChange={handleImageChange}
              />
            </div>

            <button 
              disabled={!image || isLoading}
              onClick={handleAnalyze}
              className="w-full mt-8 btn-primary disabled:opacity-50 flex items-center justify-center py-4 text-lg"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="small" className="mr-3" />
                  Analyzing Crop...
                </>
              ) : 'Analyze Photo'}
            </button>
          </div>

          {/* Results Section */}
          <div className="flex flex-col">
            <h2 className="text-xl font-bold mb-6">Step 2: Diagnosis Results</h2>
            
            {!diagnosis && !isLoading && (
              <div className="flex-1 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center bg-gray-50 text-gray-400 p-8 text-center italic">
                Results will appear here once the analysis is complete.
              </div>
            )}

            {isLoading && (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="animate-pulse bg-primary-200 h-1 w-full rounded-full mb-8"></div>
                <p className="text-primary-600 font-medium animate-bounce">Our AI is analyzing the leaf patterns...</p>
              </div>
            )}

            {diagnosis && (
              <div className="flex-1 card p-8 border-l-8 border-yellow-500 animate-fade-in">
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary-500 bg-primary-50 px-2 py-1 rounded">Diagnosis Result</span>
                  <h3 className="text-2xl font-black text-gray-900 mt-2">{diagnosis.disease_name || "Possible Maize Leaf Blight"}</h3>
                  <div className="flex items-center mt-2">
                    <div className="h-2 w-32 bg-gray-200 rounded-full mr-3">
                      <div className="h-2 bg-green-500 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                    <span className="text-sm font-bold text-green-600">92% Confidence</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm uppercase">Description</h4>
                    <p className="text-gray-600 leading-relaxed mt-1">
                      Characteristic long, elliptical grayish-green or tan lesions that parallel the leaf veins. 
                      Starts from the lower leaves and moves up as the plant matures.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-800 text-sm uppercase">Treatment Recommendations</h4>
                    <p className="text-gray-600 leading-relaxed mt-1">
                      Apply organic bio-fungicides. Practice crop rotation with non-host crops like legumes. 
                      Remove and destroy heavily infected plant residues.
                    </p>
                  </div>

                  <div className="pt-6 border-t border-gray-100">
                    <h4 className="font-bold text-gray-800 mb-4">Recommended Eco-Products</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-primary-50 rounded-lg">
                        <span className="font-medium text-primary-900">EcoGreen Bio Fungicide (1L)</span>
                        <button className="text-sm font-bold text-primary-600 hover:text-primary-700">Add to Cart</button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-primary-50 rounded-lg">
                        <span className="font-medium text-primary-900">Organic Plant Booster</span>
                        <button className="text-sm font-bold text-primary-600 hover:text-primary-700">Add to Cart</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="flex-1 bg-red-50 text-red-600 p-8 rounded-xl border border-red-200 flex items-center justify-center text-center">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CropDetection;
