import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Contact.css';

const Contact = () => {
  const formRef = useRef();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm('your_service_id', 'your_template_id', formRef.current, 'your_user_id')
      .then(() => {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      })
      .catch((err) => console.error('EmailJS Error:', err));
  };

  // FAQ content
  const faqs = [
    { q: 'How soon will I get a response?', a: 'We aim to reply within 24-48 hours.' },
    { q: 'Can you help with international weddings?', a: 'Yes, we specialize in both local and destination weddings!' },
    { q: 'What services do you offer?', a: 'Full planning, vendor coordination, budgeting, and more.' },
  ];

  return (
    <div className="contact-page">
      <header className="contact-header" data-aos="fade-down">
        <h1>Plan Your Perfect Wedding With Us 💍</h1>
        <p>Have questions or ready to start? Contact our team—we’re here to make your dream day a reality.</p>
      </header>

      <div className="contact-content">
        {/* Contact Form */}
        <section className="form-card" data-aos="fade-right">
          <h2>Send Us a Message</h2>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="form-grid">
              <input
                name="name"
                placeholder="Your Name"
                onChange={handleChange}
                value={formData.name}
                required
              />
              <input
                name="email"
                placeholder="Your Email"
                type="email"
                onChange={handleChange}
                value={formData.email}
                required
              />
              <input
                name="phone"
                placeholder="Your Phone (Optional)"
                type="tel"
                onChange={handleChange}
                value={formData.phone}
              />
              <textarea
                name="message"
                placeholder="Tell us about your wedding..."
                rows="5"
                onChange={handleChange}
                value={formData.message}
                required
              ></textarea>
              <button type="submit" className="submit-btn">Send Message</button>
            </div>
            {submitted && <p className="success-msg">Thank you! Your message has been sent successfully.</p>}
          </form>
        </section>

        {/* Contact Info */}
        <section className="contact-info" data-aos="fade-left">
          <h2>Get in Touch</h2>
          <ul className="info-list">
            <li><i className="fas fa-map-marker-alt"></i> 123 Bridal Lane, Love City, CA 98765</li>
            <li><i className="fas fa-envelope"></i> <a href="mailto:support@thewedding.com">support@thewedding.com</a></li>
            <li><i className="fas fa-phone"></i> <a href="tel:+11234567890">+1 (123) 456-7890</a></li>
            <li><i className="fas fa-clock"></i> Mon – Fri: 9 AM – 6 PM (PST)</li>
          </ul>

          <div className="social-links">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-pinterest-p"></i></a>
            </div>
          </div>
        </section>
      </div>

      {/* Additional Content: Quick Help & FAQs */}
      <section className="extra-content" data-aos="fade-up">
        <div className="quick-help">
          <h3>Need Assistance With?</h3>
          <ul>
            <li><span>💐</span> Finding the Perfect Vendors</li>
            <li><span>💌</span> Crafting Elegant Invitations</li>
            <li><span>📅</span> Building Your Timeline</li>
            <li><span>💸</span> Managing Your Budget</li>
          </ul>
        </div>
        <div className="faqs">
          <h3>Frequently Asked Questions</h3>
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <h4>{faq.q}</h4>
              <p>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Embedded Google Map */}
      <section className="map-container" data-aos="zoom-in">
        <h2>Find Us</h2>
        <iframe
          title="Office Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509325!2d-122.41941548468144!3d37.77492977975966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808f7e0b0c1f%3A0x9d8e6e8e9e8e8e8e!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1631234567890"
          loading="lazy"
          allowFullScreen
        ></iframe>
      </section>
    </div>
  );
};

export default Contact;