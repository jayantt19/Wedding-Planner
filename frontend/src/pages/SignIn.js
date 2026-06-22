import React, { useState, useEffect } from 'react';
import './SignIn.css';

const SignIn = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.confirmPassword !== formData.password) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitted(true);
    setFormData({ fullName: '', email: '', password: '', confirmPassword: '' });
    setTimeout(() => setSubmitted(false), 3000);
    console.log('Sign-up attempted:', formData);
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') setShowPassword((prev) => !prev);
    else setShowConfirmPassword((prev) => !prev);
  };

  return (
    <div className="signin-container">
      <header className="signin-header" data-aos="fade-down">
        <h1>Create Your Account</h1>
        <p>Start planning your dream wedding with us today.</p>
      </header>

      <section className="signin-form-wrapper" data-aos="fade-up">
        <form className="signin-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            {errors.fullName && <span className="error">{errors.fullName}</span>}
          </div>

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
              onClick={() => togglePasswordVisibility('password')}
            ></i>
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div className="form-group password-group">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <i
              className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'} password-toggle`}
              onClick={() => togglePasswordVisibility('confirm')}
            ></i>
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="submit-btn">Sign Up</button>
          {submitted && <p className="success-msg">Account created successfully!</p>}
        </form>

        <div className="social-signup">
          <p>Or sign up with:</p>
          <div className="social-buttons">
            <button className="social-btn google">
              <i className="fab fa-google"></i> Google
            </button>
            <button className="social-btn facebook">
              <i className="fab fa-facebook-f"></i> Facebook
            </button>
          </div>
        </div>

        <div className="auth-links">
          <p>
            Already have an account? <a href="/login">Log In</a>
          </p>
        </div>
      </section>

      <footer className="signin-footer" data-aos="fade-up" data-aos-delay="200">
        <p>
          By signing up, you agree to our <a href="/terms">Terms of Service</a> and{' '}
          <a href="/privacy">Privacy Policy</a>.
        </p>
      </footer>
    </div>
  );
};

export default SignIn;