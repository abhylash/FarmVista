import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import '../styles/auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    region: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Check password strength
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    if (!password) {
      setPasswordStrength(null);
      return;
    }

    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) {
      setPasswordStrength({ level: 'weak', text: 'Weak password', color: '#ef4444' });
    } else if (strength <= 3) {
      setPasswordStrength({ level: 'medium', text: 'Medium password', color: '#f59e0b' });
    } else {
      setPasswordStrength({ level: 'strong', text: 'Strong password', color: '#22c55e' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/register', formData);
      login(response.data.user, response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      {/* Background Elements */}
      <div className="register-background">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
        <div className="bg-grid"></div>
      </div>

      {/* Main Content */}
      <div className="register-card">
        {/* Header */}
        <div className="register-header">
          <div className="logo-container">
            <span className="logo-icon">🌾</span>
            <span className="logo-text">FarmVista</span>
          </div>
          <h2 className="register-title">Create Your Account</h2>
          <p className="register-subtitle">
            Join thousands of farmers making smarter decisions
          </p>
        </div>

        {/* Form Container */}
        <div className="form-container">
          {/* Error Alert */}
          {error && (
            <div className="error-alert">
              <div className="error-icon">
                <svg className="icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="error-content">
                <p className="error-text">{error}</p>
              </div>
            </div>
          )}

          {/* Register Form */}
          <form className="register-form" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                <span className="label-icon">👤</span>
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="form-input"
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                <span className="label-icon">📧</span>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="farmer@example.com"
                className="form-input"
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                <span className="label-icon">🔒</span>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Create a strong password"
                className="form-input"
                minLength="6"
              />
              
              {/* Password Strength Indicator */}
              {passwordStrength && (
                <div className="password-strength">
                  <div className="strength-bar">
                    <div 
                      className={`strength-fill ${passwordStrength.level}`}
                    ></div>
                  </div>
                  <p className="strength-text" style={{ color: passwordStrength.color }}>
                    {passwordStrength.text}
                  </p>
                </div>
              )}
              <p className="helper-text">Minimum 6 characters recommended</p>
            </div>

            {/* Region */}
            <div className="form-group">
              <label htmlFor="region" className="form-label">
                <span className="label-icon">📍</span>
                Region <span className="optional-badge">Optional</span>
              </label>
              <input
                type="text"
                id="region"
                name="region"
                value={formData.region}
                onChange={handleChange}
                placeholder="e.g., Punjab, Maharashtra"
                className="form-input"
              />
              <p className="helper-text">Helps us provide region-specific advice</p>
            </div>

            {/* Terms & Conditions */}
            <div className="terms-container">
              <label className="terms-checkbox">
                <input type="checkbox" required />
                <span className="terms-text">
                  I agree to the <a href="#" className="terms-link">Terms of Service</a> and{' '}
                  <a href="#" className="terms-link">Privacy Policy</a>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="form-submit">
              <button
                type="submit"
                className="submit-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <span className="arrow-icon">→</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="form-divider">
            <div className="divider-line"></div>
            <span className="divider-text">Or sign up with</span>
            <div className="divider-line"></div>
          </div>

          {/* Social Sign Up */}
          <div className="social-signup">
            <button className="social-button">
              <svg className="social-icon" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
              </svg>
              <span>Google</span>
            </button>

            <button className="social-button">
              <svg className="social-icon" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.699 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.14 18.2 20 14.45 20 10.017 20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
              <span>GitHub</span>
            </button>
          </div>

          {/* Login Link */}
          <div className="login-link">
            <p className="login-text">
              Already have an account?{' '}
              <Link to="/login" className="login-cta">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="float-icon icon-1">🌱</div>
        <div className="float-icon icon-2">🚜</div>
        <div className="float-icon icon-3">☀️</div>
        <div className="float-icon icon-4">💧</div>
        <div className="float-icon icon-5">🌽</div>
      </div>
    </div>
  );
};

export default Register;
