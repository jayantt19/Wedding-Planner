import React from "react";
import "./Pricing.css";

const Pricing = () => {
  return (
    <div className="pricing-container">
      <section className="pricing-header" data-aos="fade-down">
        <h1>Elegant Wedding Packages</h1>
        <p>Curated to bring your dream wedding to life, no matter your style or budget.</p>
      </section>

      <section className="pricing-description" data-aos="fade-up">
        <p>
          From intimate gatherings to lavish celebrations, our expert planners craft every detail—venue selection, decor, vendor coordination, and more—to ensure your day is unforgettable.
        </p>
      </section>

      <div className="pricing-cards" data-aos="fade-up" data-aos-delay="200">
        {packages.map((pkg, index) => (
          <div key={index} className="pricing-card">
            <h2>{pkg.title}</h2>
            <p className="price">{pkg.price}</p>
            <ul>
              {pkg.features.map((feature, i) => (
                <li key={i}><span className="check">✔</span> {feature}</li>
              ))}
            </ul>
            <button className="choose-btn">Choose Plan</button>
          </div>
        ))}
      </div>

      <section className="compare-section" data-aos="fade-up" data-aos-delay="400">
        <h2>Compare Our Packages</h2>
        <div className="compare-table">
          <div className="table-row table-head">
            <div>Features</div>
            {packages.map((p, i) => (
              <div key={i}>{p.title}</div>
            ))}
          </div>
          {comparisonFeatures.map((feature, i) => (
            <div key={i} className="table-row">
              <div>{feature.name}</div>
              {feature.included.map((val, j) => (
                <div key={j}>{val ? "✔" : "—"}</div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="trust-section" data-aos="fade-up" data-aos-delay="600">
        <h2>Trusted by Couples Worldwide</h2>
        <div className="stats">
          <div>
            <h3>500+</h3>
            <p>Happy Clients</p>
          </div>
          <div>
            <h3>150+</h3>
            <p>Venues Covered</p>
          </div>
          <div>
            <h3>10+</h3>
            <p>Years of Excellence</p>
          </div>
        </div>
      </section>

      {/* New: Testimonials */}
      <section className="testimonials" data-aos="fade-up" data-aos-delay="800">
        <h2>What Our Couples Say</h2>
        <div className="testimonial-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <p>“{testimonial.text}”</p>
              <h4>{testimonial.name}</h4>
              <span>{testimonial.date}</span>
            </div>
          ))}
        </div>
      </section>

      {/* New: FAQs */}
      <section className="pricing-faqs" data-aos="fade-up" data-aos-delay="1000">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <h3>{faq.q}</h3>
              <p>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pricing-note" data-aos="fade-up" data-aos-delay="1200">
        <h2>Need a Custom Plan?</h2>
        <p>Let’s create a package tailored just for you. Reach out to discuss your vision!</p>
        <a href="/contact" className="contact-link">Get a Custom Quote</a>
      </section>
    </div>
  );
};

const packages = [
  {
    title: "Basic Bliss",
    price: "$2,500",
    features: [
      "Venue Selection Assistance",
      "Basic Theme Decor",
      "Vendor Coordination",
      "Wedding Day Timeline",
    ],
  },
  {
    title: "Premium Celebration",
    price: "$5,500",
    features: [
      "Dedicated Personal Coordinator",
      "Custom Decor Design",
      "Full Vendor Management",
      "Photography & Videography Included",
    ],
  },
  {
    title: "Elite Experience",
    price: "$9,000+",
    features: [
      "Destination Wedding Planning",
      "Bridal Styling & Makeup",
      "Luxury Accommodation Arrangements",
      "Complete Event Management",
    ],
  },
];

const comparisonFeatures = [
  { name: "Venue Assistance", included: [true, true, true] },
  { name: "Custom Decor", included: [false, true, true] },
  { name: "Photography & Videography", included: [false, true, true] },
  { name: "Travel & Hospitality", included: [false, false, true] },
  { name: "Personal Coordinator", included: [false, true, true] },
];

const testimonials = [
  { text: "They made our day magical and stress-free!", name: "Sarah & James", date: "June 2024" },
  { text: "The Premium package was worth every penny!", name: "Aisha & Raj", date: "August 2024" },
  { text: "Elite Experience exceeded our wildest dreams.", name: "Emma & Liam", date: "March 2025" },
];

const faqs = [
  { q: "What’s included in each package?", a: "Check the comparison table above for a detailed breakdown!" },
  { q: "Can I mix features from different plans?", a: "Yes, contact us for a custom package tailored to your needs." },
  { q: "Do you offer payment plans?", a: "Absolutely, we provide flexible payment options—reach out to discuss!" },
];

export default Pricing;