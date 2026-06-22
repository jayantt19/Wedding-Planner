import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaStar, FaCalendarCheck } from 'react-icons/fa';
import './Service.css';

const Service = () => {
  // Animation variants for smooth, fast transitions
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Quick stagger for grid items
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }, // Fast and smooth
    },
  };

  return (
    <div className="service-container">
      {/* Hero Section */}
      <section className="service-hero" role="banner">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Our Premium Wedding Services</h1>
          <p>
            From vision to victory, our comprehensive wedding services ensure your day is unforgettable. Let us handle the
            details while you cherish every moment.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hero-btn"
            aria-label="Explore our wedding services"
          >
            Discover More <FaHeart />
          </motion.button>
        </motion.div>
      </section>

      {/* Service Grid */}
      <section className="service-grid">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              img={service.img}
              title={service.title}
              desc={service.desc}
              variants={itemVariants}
            />
          ))}
        </motion.div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          Why Choose TheWedding?
        </motion.h2>
        <motion.div
          className="why-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {[
            {
              title: 'Tailored Expertise',
              desc: 'Personalized planning to match your unique love story.',
              icon: <FaHeart />,
            },
            {
              title: 'Seamless Execution',
              desc: 'Flawless coordination from start to finish.',
              icon: <FaCalendarCheck />,
            },
            {
              title: 'Trusted Partners',
              desc: 'Access to top-tier vendors worldwide.',
              icon: <FaStar />,
            },
          ].map((point, i) => (
            <motion.div key={i} className="why-card" variants={itemVariants}>
              <div className="why-icon">{point.icon}</div>
              <h3>{point.title}</h3>
              <p>{point.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Experience Section */}
      <section className="service-experience">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          What Sets Us Apart
        </motion.h2>
        <motion.div
          className="experience-points"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {[
            {
              title: 'Over a Decade of Joy',
              desc: '12+ years crafting timeless weddings with passion.',
            },
            {
              title: '600+ Love Stories',
              desc: 'Trusted by couples worldwide for their dream days.',
            },
            {
              title: 'Global Expertise',
              desc: 'From tropical beaches to European castles, we plan anywhere.',
            },
          ].map((point, i) => (
            <motion.div key={i} variants={itemVariants}>
              <h3>{point.title}</h3>
              <p>{point.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          Words from Our Couples <FaStar />
        </motion.h2>
        <motion.div
          className="testimonial-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {[
            {
              quote: 'TheWedding made our day magical and stress-free!',
              couple: 'Emma & Liam',
            },
            {
              quote: 'Every detail was perfect, thanks to their expertise.',
              couple: 'Aisha & Mark',
            },
            {
              quote: 'A dream come true, from start to finish.',
              couple: 'Sofia & James',
            },
          ].map((testimonial, i) => (
            <motion.div key={i} className="testimonial-card" variants={itemVariants}>
              <p>“{testimonial.quote}”</p>
              <h4>— {testimonial.couple}</h4>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="service-cta">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2>Let’s Craft Your Perfect Day</h2>
          <p>
            Ready to start planning? Contact us for a personalized consultation and let’s make your dream wedding a reality.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cta-btn"
            aria-label="Get started with wedding planning"
          >
            Get Started Now
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

const services = [
  {
    title: 'Full Wedding Planning',
    desc: 'Comprehensive planning from vision to execution, ensuring a stress-free experience.',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2_iN6zimwZ2d-gX1yDT4QC_5wSqHZeqirU5Euuk0u8HU4MmnrghCrKZ4&s=10',
  },
  {
    title: 'Event Styling & Design',
    desc: 'Custom themes and decor to create a stunning ambiance tailored to your style.',
    img: 'https://juancarlo.ph/wp-content/uploads/2019/01/grand-reception-styling-setups-new-02.jpg',
  },
  {
    title: 'Budget Management',
    desc: 'Smart financial planning to maximize elegance within your budget.',
    img: 'https://www.bookeventz.com/blog/wp-content/uploads/wedding-budget-planning.jpeg',
  },
  {
    title: 'Vendor Coordination',
    desc: 'Seamless management of top vendors for every wedding detail.',
    img: 'https://itsmy.wedding/images/blog/kochi/wedding-planner-kochi-coordination.webp',
  },
  {
    title: 'Photography & Videography',
    desc: 'Professional captures to preserve your memories forever.',
    img: 'https://www.studiomemorylane.com/wp-content/uploads/2019/09/Tips-to-shoot-awesome-wedding-video.jpg',
  },
  {
    title: 'Luxury Bridal Assistance',
    desc: 'Personalized support for the bride, from gown selection to pampering.',
    img: 'https://images.unsplash.com/photo-1517263904808-5dc91e3e7044',
  },
  {
    title: 'Guest Experience Management',
    desc: 'Ensuring your guests enjoy every moment with curated hospitality.',
    img: 'https://www.weddingsbyneerajkamra.com/images/services/hospitality.jpg',
  },
  {
    title: 'Destination Wedding Planning',
    desc: 'Expert planning for unforgettable weddings anywhere in the world.',
    img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc',
  },
];

const ServiceCard = ({ img, title, desc, variants }) => (
  <motion.div className="service-card" variants={variants}>
    <img src={img} alt={`${title} service`} loading="lazy" />
    <h3>{title}</h3>
    <p>{desc}</p>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="card-btn"
      aria-label={`Learn more about ${title}`}
    >
      Learn More
    </motion.button>
  </motion.div>
);

export default Service;