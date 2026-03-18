import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import '../styles/form.css';

const AddFarm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    farmName: '',
    location: {
      latitude: '',
      longitude: '',
      city: '',
      state: '',
    },
    soilType: '',
    crop: '',
    cropStage: '',
    areaSqMeters: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = {
        ...formData,
        location: {
          ...formData.location,
          latitude: parseFloat(formData.location.latitude) || 0,
          longitude: parseFloat(formData.location.longitude) || 0,
        },
        areaSqMeters: parseFloat(formData.areaSqMeters) || 0,
      };

      await api.post('/farms', data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add farm');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <div className="form-header">
          <div className="header-icon">🌾</div>
          <h1>Add New Farm</h1>
          <p>Register your farm and start getting AI-powered farming advice</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>🌱 Farm Information</h2>

            <div className="form-group">
              <label htmlFor="farmName">Farm Name <span className="required">*</span></label>
              <input
                type="text"
                id="farmName"
                name="farmName"
                value={formData.farmName}
                onChange={handleInputChange}
                required
                placeholder="e.g., Green Valley Farm"
                className="input"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="crop">Crop Type <span className="required">*</span></label>
                <input
                  type="text"
                  id="crop"
                  name="crop"
                  value={formData.crop}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Tomato, Rice, Wheat"
                  className="input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="soilType">Soil Type <span className="required">*</span></label>
                <select
                  id="soilType"
                  name="soilType"
                  value={formData.soilType}
                  onChange={handleInputChange}
                  required
                  className="input"
                >
                  <option value="">Select soil type</option>
                  <option value="Loamy">Loamy</option>
                  <option value="Sandy">Sandy</option>
                  <option value="Clayey">Clayey</option>
                  <option value="Silty">Silty</option>
                  <option value="Peaty">Peaty</option>
                  <option value="Chalky">Chalky</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="cropStage">Crop Stage <span className="required">*</span></label>
                <select
                  id="cropStage"
                  name="cropStage"
                  value={formData.cropStage}
                  onChange={handleInputChange}
                  required
                  className="input"
                >
                  <option value="">Select crop stage</option>
                  <option value="Germination">Germination</option>
                  <option value="Vegetative">Vegetative</option>
                  <option value="Flowering">Flowering</option>
                  <option value="Fruiting">Fruiting</option>
                  <option value="Maturity">Maturity</option>
                  <option value="Harvest">Harvest</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="areaSqMeters">Farm Area (sq meters) <span className="required">*</span></label>
                <input
                  type="number"
                  id="areaSqMeters"
                  name="areaSqMeters"
                  value={formData.areaSqMeters}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., 5000"
                  step="0.01"
                  className="input"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>📍 Location Details</h2>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="latitude">Latitude <span className="required">*</span></label>
                <input
                  type="number"
                  id="latitude"
                  name="location.latitude"
                  value={formData.location.latitude}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., 13.1939"
                  step="0.0001"
                  className="input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="longitude">Longitude <span className="required">*</span></label>
                <input
                  type="number"
                  id="longitude"
                  name="location.longitude"
                  value={formData.location.longitude}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., 77.5941"
                  step="0.0001"
                  className="input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="location.city"
                  value={formData.location.city}
                  onChange={handleInputChange}
                  placeholder="e.g., Bangalore"
                  className="input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  name="location.state"
                  value={formData.location.state}
                  onChange={handleInputChange}
                  placeholder="e.g., Karnataka"
                  className="input"
                />
              </div>
            </div>

            <p className="help-text">
              <span className="help-icon">💡</span>
              Tip: Find coordinates using Google Maps by right-clicking on your farm location and selecting the numbers
            </p>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Adding farm...' : '🌾 Add Farm'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFarm;
