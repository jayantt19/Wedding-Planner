import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Banner.css';

function Banner() {
  // Initialize AOS for animations
  useEffect(() => {
    if (window.AOS) {
      window.AOS.init({ duration: 1000, once: true });
    }
  }, []);

  return (
    <div className="banner">
      <div className="banner-overlay"></div>
      <div className="banner-content">
        <h1 data-aos="fade-up" data-aos-delay="100">
          Plan Your Dream Wedding
        </h1>
        <p data-aos="fade-up" data-aos-delay="300">
          Let us bring your vision to life with elegance and ease.
        </p>
        <div className="banner-cta" data-aos="fade-up" data-aos-delay="500">
          <Link to="/pricing" className="cta-btn primary">
            Explore Packages
          </Link>
          <Link to="/contact" className="cta-btn secondary">
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Banner;