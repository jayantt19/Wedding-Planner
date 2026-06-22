import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaStar, FaEnvelope } from 'react-icons/fa';
import './About.css';

const About = () => {
  // Animation variants for faster, smoother effects
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Reduced stagger delay for quicker sequencing
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }, // Faster duration
    },
  };

  return (
    <div className="about-container">
      {/* Hero */}
      <section className="about-hero" role="banner">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }} // Faster hero animation
        >
          <h1>About TheWedding</h1>
          <p>
            Crafting timeless love stories with elegance, passion, and precision.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hero-btn"
            aria-label="Learn more about our services"
          >
            Discover Our Journey <FaHeart />
          </motion.button>
        </motion.div>
      </section>

      {/* Our Mission */}
      <section className="about-section mission">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} // Trigger earlier on scroll
        >
          <motion.h2 variants={itemVariants}>Our Mission</motion.h2>
          <motion.p variants={itemVariants}>
            At TheWedding, we’re dedicated to turning your vision into a breathtaking reality. Our mission is to create
            celebrations that resonate with your unique love story, blending creativity, meticulous planning, and heartfelt
            care to ensure every moment sparkles.
          </motion.p>
        </motion.div>
      </section>

      {/* Our Philosophy */}
      <section className="about-section philosophy">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 variants={itemVariants}>Our Philosophy</motion.h2>
          <motion.p variants={itemVariants}>
            We believe every wedding is a canvas for love, painted with personal touches and cherished memories. From the
            smallest detail to the grandest gesture, we craft experiences that reflect your personality and dreams,
            ensuring your day is as extraordinary as your journey together.
          </motion.p>
        </motion.div>
      </section>

      {/* Story Behind the Brand */}
      <section className="about-section story">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 variants={itemVariants}>Our Story</motion.h2>
          <motion.p variants={itemVariants}>
            Founded in 2012 by Alicia Bennett, TheWedding began with a simple dream: to make every couple’s love story
            shine. What started as a boutique planning service has grown into a globally recognized brand, orchestrating
            over 500 weddings across continents—from opulent palace affairs to intimate seaside vows. Our heart remains in
            creating moments that last a lifetime.
          </motion.p>
        </motion.div>
      </section>

      {/* Milestones */}
      <section className="milestones">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4 }} // Faster heading animation
          viewport={{ once: true }}
        >
          Our Journey in Love
        </motion.h2>
        <motion.div
          className="milestone-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {[
            { year: '2012', desc: 'Founded TheWedding with our first event.' },
            { year: '2015', desc: 'Planned 100th wedding, expanding internationally.' },
            { year: '2018', desc: 'Launched online planning tools.' },
            { year: '2023', desc: 'Celebrated 500th wedding milestone.' },
          ].map((milestone, i) => (
            <motion.div key={i} className="milestone-card" variants={itemVariants}>
              <h3>{milestone.year}</h3>
              <p>{milestone.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Our Approach */}
      <section className="about-section approach">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 variants={itemVariants}>How We Work</motion.h2>
          <motion.ul className="steps" variants={containerVariants}>
            <motion.li variants={itemVariants}>
              <strong>1. Discover</strong> – We listen to your story, dreams, and vision to create a personalized plan.
            </motion.li>
            <motion.li variants={itemVariants}>
              <strong>2. Design</strong> – Our team crafts a bespoke concept, from venues to decor, tailored to you.
            </motion.li>
            <motion.li variants={itemVariants}>
              <strong>3. Execute</strong> – Seamless coordination ensures every detail shines on your big day.
            </motion.li>
            <motion.li variants={itemVariants}>
              <strong>4. Celebrate</strong> – Relax and enjoy as we bring your love story to life.
            </motion.li>
          </motion.ul>
        </motion.div>
      </section>

      {/* Meet Our Team */}
      <section className="team-section">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          Meet Our Dream Makers
        </motion.h2>
        <motion.div
          className="team-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {[
            {
              name: 'Alicia Bennett',
              role: 'Founder & Lead Designer',
              img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxqoEwr5Pg4Af4wmLLDN8s4mYY-_XQg5WG6IiwQQFHV1eZLVzx-mmfrvQ&s=10',
            },
            {
              name: 'Marcus Liu',
              role: 'Event Coordinator',
              img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
            },
            {
              name: 'Sophia Reyes',
              role: 'Floral Architect',
              img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlJttY3EIk84q8-Pm_ETh__AOXXTX2tOZWb0x-ugyYKSBI7-NUx3XsDVm5&s=10',
            },
            {
              name: 'James Bond',
              role: 'Client Experience Manager',
              img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNyxwD6CuZnkMpULwMQt7Zpf7orUYhMnsFODFxsDpRUhUTB1h3p0WmWVJx&s=10',
            },
          ].map((member, i) => (
            <motion.div key={i} className="team-member" variants={itemVariants}>
              <motion.img
                src={member.img}
                alt={`${member.name}, ${member.role}`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }} // Faster hover
              />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="testimonial-section">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          Client Love <FaStar />
        </motion.h2>
        <motion.div
          className="testimonial-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {[
            { quote: 'TheWedding turned our vision into a magical reality. Every detail was perfect!', couple: 'Meera & Sam' },
            { quote: 'Stress-free planning and a flawless day—couldn’t ask for more!', couple: 'Tania & Chris' },
            { quote: 'Their creativity and care made our wedding unforgettable.', couple: 'Lila & Ethan' },
          ].map((testimonial, i) => (
            <motion.div key={i} className="testimonial-card" variants={itemVariants}>
              <p>“{testimonial.quote}”</p>
              <h4>— {testimonial.couple}</h4>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Contact Teaser */}
      <section className="contact-teaser">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2>Ready to Start Planning?</h2>
          <p>
            Connect with our team to discuss your vision and begin your journey to a perfect wedding day.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="contact-btn"
            aria-label="Contact us for wedding planning"
          >
            Get in Touch <FaEnvelope />
          </motion.button>
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="about-cta">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2>Let’s Create Your Dream Day</h2>
          <p>
            From intimate gatherings to grand celebrations, we’re here to make your wedding uniquely yours.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cta-btn"
            aria-label="Schedule a wedding consultation"
          >
            Schedule Your Consultation
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default About;