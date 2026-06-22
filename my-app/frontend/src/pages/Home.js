import React, { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import './Home.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaRing, FaCalendarCheck, FaCamera, FaEnvelope, FaInstagram, FaTwitter } from 'react-icons/fa';

function Home() {
  // Countdown Timer State
  const calculateTimeLeft = () => {
    const targetDate = new Date('2025-12-31T00:00:00');
    const now = new Date();
    const difference = targetDate - now;

    return difference > 0
      ? {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      : { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Newsletter Form State
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setFormStatus('Thank you for subscribing!');
      setEmail('');
      setTimeout(() => setFormStatus(''), 3000);
    } else {
      setFormStatus('Please enter a valid email.');
    }
  };

  // Testimonials Carousel State
  const testimonials = [
    { quote: 'TheWedding made our planning effortless and fun!', couple: 'Emma & Liam', img: 'https://img.pikbest.com/png-images/love-icon-vector---heart-linear-fill-sign-icon_1425894.png!sw800' },
    { quote: 'Found our dream venue in days!', couple: 'Aisha & Mark', img: 'https://img.pikbest.com/png-images/love-icon-vector---heart-linear-fill-sign-icon_1425894.png!sw800' },
    { quote: 'Every detail was perfect, thanks to TheWedding!', couple: 'Sofia & James', img: 'https://img.pikbest.com/png-images/love-icon-vector---heart-linear-fill-sign-icon_1425894.png!sw800' }
  ];
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="home-container">
      <Banner />

      {/* Hero Section */}
      <section className="hero" role="banner">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <h1>Where Your Forever Begins.</h1>
          <p>From the first “yes” to the final dance, we design weddings that feel timeless, personal, and unforgettable.</p>
          <div className="hero-buttons">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="primary-btn"
              aria-label="Start planning your wedding"
            >
              Start Planning <FaHeart />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="secondary-btn"
              aria-label="Explore wedding vendors"
            >
              Explore Vendors
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Countdown Timer */}
      <section className="countdown" aria-live="polite">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Countdown to Your Forever <FaRing />
        </motion.h2>
        <div className="timer">
          {['days', 'hours', 'minutes', 'seconds'].map((unit, i) => (
            <motion.div
              key={unit}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.2 }}
            >
              <span>{timeLeft[unit]}</span>
              <p>{unit.charAt(0).toUpperCase() + unit.slice(1)}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Highlight */}
      <section className="features">
        <h2>Why Choose TheWedding?</h2>
        <div className="feature-cards">
          {[
            { title: 'Personalized Planning', desc: 'Tailored tools for your vision.', icon: <FaCalendarCheck /> },
            { title: 'Trusted Vendors', desc: 'Connect with top professionals.', icon: <FaCamera /> },
            { title: 'Budget Tracker', desc: 'Smart tools to manage costs.', icon: <FaRing /> },
          ].map((feature, i) => (
            <motion.div
              className="feature-card"
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Vendors Highlight */}
      <section className="vendors">
        <h2>Discover Top Wedding Vendors</h2>
        <div className="vendor-cards">
          {[
            { name: 'Photographers', desc:'Capture every moment', img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc' },
            { name: 'Venues', desc: 'Find the perfect setting.', img: 'https://cdn.colorexpertsbd.com/wp-content/uploads/2023/05/Garden-or-Park-wedding-backdrops.webp' },
            { name: 'Caterers', desc: 'Delight with exquisite cuisine.', img: 'https://nilacaterers.com/wp-content/uploads/2024/09/nila-august.jpg' },
            { name: 'Florists', desc: 'Stunning floral designs.', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtFU8_ALeX185sPoLp68HSSmTJNsnBYY3IzQ&s' }
          ].map((vendor, i) => (
            <motion.div
              className="vendor-card"
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="vendor-image" style={{ backgroundImage: `url(${vendor.img})` }}></div>
              <h3>{vendor.name}</h3>
              <p>{vendor.desc}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="vendor-btn"
                aria-label={`View ${vendor.name}`}
              >
                View {vendor.name}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="testimonials">
        <h2>Real Love Stories</h2>
        <div className="testimonial-carousel">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              className="testimonial-card"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <div className="testimonial-image" style={{ backgroundImage: `url(${testimonials[currentTestimonial].img})` }}></div>
              <p>"{testimonials[currentTestimonial].quote}"</p>
              <h4>– {testimonials[currentTestimonial].couple}</h4>
            </motion.div>
          </AnimatePresence>
          <div className="carousel-dots">
            {testimonials.map((_, i) => (
              <span
                key={i}
                className={`dot ${i === currentTestimonial ? 'active' : ''}`}
                onClick={() => setCurrentTestimonial(i)}
                aria-label={`View testimonial ${i + 1}`}
              ></span>
            ))}
          </div>
        </div>
      </section>

      {/* Step-by-Step Planner */}
      <section className="planner">
        <h2>Your Wedding in 4 Simple Steps</h2>
        <div className="steps">
          {[
            { step: 'Sign Up', desc: 'Create your free account.', icon: <FaHeart /> },
            { step: 'Build Your Plan', desc: 'Customize your vision.', icon: <FaRing /> },
            { step: 'Track Everything', desc: 'Manage tasks and budget.', icon: <FaCalendarCheck /> },
            { step: 'Celebrate', desc: 'Enjoy your perfect day!', icon: <FaCamera /> },
          ].map((step, i) => (
            <motion.div
              className="step"
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="step-icon">{step.icon}</div>
              <span>{i + 1}</span>
              <h3>{step.step}</h3>
              <p>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Inspiration Gallery */}
      <section className="gallery">
        <h2>Wedding Inspiration</h2>
        <div className="gallery-grid">
          {[
            { style: 'boho', img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc' },
            { style: 'classic', img: 'https://vinesoftheyarravalley.com.au/wp-content/uploads/2020/06/bride-and-groom-scaled.jpg' },
            { style: 'modern', img: 'https://greenweddingshoes.com/wp-content/uploads/2022/08/18-A-Touch-of-India-Styled-Shoot.jpg' },
          ].map((item, i) => (
            <motion.div
              className="gallery-item"
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="gallery-image" style={{ backgroundImage: `url(${item.img})` }}></div>
              <p>{item.style.charAt(0).toUpperCase() + item.style.slice(1)} Weddings</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="newsletter">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Stay Inspired <FaEnvelope />
        </motion.h2>
        <p>Join our newsletter for wedding tips, trends, and exclusive offers.</p>
        <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            aria-label="Email for newsletter"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="newsletter-btn"
          >
            Subscribe
          </motion.button>
        </form>
        {formStatus && (
          <motion.p
            className={`form-status ${formStatus.includes('Thank') ? 'success' : 'error'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {formStatus}
          </motion.p>
        )}
      </section>

      {/* Social Media */}
      <section className="social">
        <h2>Join Our Community</h2>
        <div className="social-links">
          <motion.a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            aria-label="Follow us on Instagram"
          >
            <FaInstagram />
          </motion.a>
          <motion.a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            aria-label="Follow us on Twitter"
          >
            <FaTwitter />
          </motion.a>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Begin Your Love Story
        </motion.h2>
        <p>Let us make your wedding day unforgettable.</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="cta-btn"
          aria-label="Join now for free"
        >
          Join Now for Free
        </motion.button>
      </section>
    </div>
  );
}

export default Home;