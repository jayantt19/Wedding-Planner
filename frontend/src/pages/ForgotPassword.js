import React, { useState, useEffect } from 'react';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Initialize AOS for animations
  useEffect(() => {
    if (window.AOS) {
      window.AOS.init({ duration: 1000, once: true });
    }
  }, []);

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const validateEmail = () => {
    if (!email) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(email)) return 'Invalid email format';
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailError = validateEmail();
    if (emailError) {
      setError(emailError);
      return;
    }
    // Simulate password reset request
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 4000);
    console.log('Password reset requested for:', email);
  };

  return (
    <div className="forgot-password-container">
      <header className="forgot-password-header" data-aos="fade-down">
        <h1>Reset Your Password</h1>
        <p>Enter your email address to receive a password reset link.</p>
      </header>

      <section className="forgot-password-form-wrapper" data-aos="fade-up">
        <form className="forgot-password-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={email}
              onChange={handleChange}
              required
            />
            {error && <span className="error">{error}</span>}
          </div>

          <button type="submit" className="submit-btn">Send Reset Link</button>
          {submitted && (
            <p className="success-msg">
              A reset link has been sent to your email!
            </p>
          )}
        </form>

        <div className="auth-links">
          <p>
            Remembered your password? <a href="/login">Log In</a>
          </p>
          <p>
            Need an account? <a href="/signin">Sign Up</a>
          </p>
        </div>

        <div className="support-info">
          <p>
            Having trouble?{' '}
            <a href="/contact">Contact our support team</a>.
          </p>
        </div>
      </section>

      <footer className="forgot-password-footer" data-aos="fade-up" data-aos-delay="200">
        <p>
          By continuing, you agree to our{' '}
          <a href="/terms">Terms of Service</a> and{' '}
          <a href="/privacy">Privacy Policy</a>.
        </p>
      </footer>
    </div>
  );
};

export default ForgotPassword;