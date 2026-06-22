import React, { useState, useEffect } from 'react';
import './Login.css';


const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Initialize AOS for animations
  useEffect(() => {
    if (window.AOS) {
      window.AOS.init({ duration: 1000, once: true });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Simulate login
    setSubmitted(true);
    setFormData({ email: '', password: '' });
    setTimeout(() => setSubmitted(false), 3000);
    console.log('Login attempted:', formData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="login-container">
      <header className="login-header" data-aos="fade-down">
        <h1>Welcome Back</h1>
        <p>Log in to continue planning your dream wedding.</p>
      </header>

      <section className="login-form-wrapper" data-aos="fade-up">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group password-group">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <i
              className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} password-toggle`}
              onClick={togglePasswordVisibility}
            ></i>
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <button type="submit" className="submit-btn">Log In</button>
          {submitted && <p className="success-msg">Logged in successfully!</p>}
        </form>

        <div className="auth-links">
          <p>
            <a href="/forgot-password">Forgot Password?</a>
          </p>
          <p>
            Don’t have an account? <a href="/signin">Sign Up</a>
          </p>
        </div>

        <div className="social-login">
          <p>Or continue with:</p>
          <div className="social-buttons">
            <button className="social-btn google">
              <i className="fab fa-google"></i> Google
            </button>
            <button className="social-btn facebook">
              <i className="fab fa-facebook-f"></i> Facebook
            </button>
          </div>
        </div>
      </section>

      <footer className="login-footer" data-aos="fade-up" data-aos-delay="200">
        <p>
          By logging in, you agree to our <a href="/terms">Terms of Service</a> and{' '}
          <a href="/privacy">Privacy Policy</a>.
        </p>
      </footer>
    </div>
  );
};

export default Login;