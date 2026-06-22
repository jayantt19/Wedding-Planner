import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {FaDownload, FaPrint } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import { Pie } from 'react-chartjs-2';
import 'react-toastify/dist/ReactToastify.css';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import './GuestList.css';

Chart.register(ArcElement, Tooltip, Legend);

const GuestList = () => {
  const [guests, setGuests] = useState([]);
  const [visibleGuests, setVisibleGuests] = useState(6);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rsvp, setRsvp] = useState(false);
  const [table, setTable] = useState('');
  const [dietary, setDietary] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const handleAddGuest = () => {
    if (!name || !email) {
      toast.error('Please fill in name and email');
      return;
    }

    const newGuest = {
      id: Date.now(),
      name,
      email,
      rsvp,
      table: table || `Table ${Math.floor(Math.random() * 10 + 1)}`,
      dietary: dietary || 'None',
    };

    setGuests([newGuest, ...guests]);
    setName('');
    setEmail('');
    setRsvp(false);
    setTable('');
    setDietary('');
    toast.success('Guest added successfully!');
  };

  const handleDelete = (id) => {
    setGuests(guests.filter((g) => g.id !== id));
    toast.info('Guest removed');
  };

  const handleToggleRsvp = (id) => {
    setGuests(guests.map((g) => (g.id === id ? { ...g, rsvp: !g.rsvp } : g)));
    toast.success('RSVP updated');
  };

  const handleUpdateTable = (id, newTable) => {
    setGuests(guests.map((g) => (g.id === id ? { ...g, table: newTable } : g)));
    toast.success('Table updated');
  };

  const getInitials = (name) => name.split(' ').map((n) => n[0]).join('').toUpperCase();

  const handleExport = () => {
    const csvContent =
      'Name,Email,RSVP,Table,Dietary\n' +
      guests
        .map((g) => `${g.name},${g.email},${g.rsvp ? 'Yes' : 'No'},${g.table},${g.dietary}`)
        .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'guestlist.csv';
    link.click();
  };

  const handlePrint = () => window.print();

  const filteredGuests = guests
    .filter((g) => {
      const matchSearch =
        g.name.toLowerCase().includes(search.toLowerCase()) ||
        g.email.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === 'all' || (filter === 'yes' && g.rsvp) || (filter === 'no' && !g.rsvp);
      return matchSearch && matchFilter;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'table') return a.table.localeCompare(b.table);
      return 0;
    });

  const chartData = {
    labels: ['Attending', 'Not Attending'],
    datasets: [
      {
        data: [guests.filter((g) => g.rsvp).length, guests.filter((g) => !g.rsvp).length],
        backgroundColor: ['#d63384', '#f8bbd0'],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <div className="guestlist-container">
      {/* Hero Section */}
      <section className="guestlist-hero" role="banner">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Manage Your Wedding Guest List</h1>
          <p>
            Effortlessly track RSVPs, assign tables, and visualize your guest data—all in one place.
          </p>
        </motion.div>
      </section>

      {/* Guest Form */}
      <section className="guest-form">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Add a Guest</h2>
          <div className="form-inputs">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-label="Guest name"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Guest email"
            />
            <input
              type="text"
              placeholder="Table (e.g., Table 1)"
              value={table}
              onChange={(e) => setTable(e.target.value)}
              aria-label="Table assignment"
            />
            <input
              type="text"
              placeholder="Dietary Preferences"
              value={dietary}
              onChange={(e) => setDietary(e.target.value)}
              aria-label="Dietary preferences"
            />
            <label>
              <input type="checkbox" checked={rsvp} onChange={(e) => setRsvp(e.target.checked)} />
              RSVP Confirmed
            </label>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddGuest}
            >
              Add Guest
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Guest Actions */}
      <section className="guest-actions">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <input
            type="text"
            placeholder="Search by name/email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search guests"
          />
          <select value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter by RSVP">
            <option value="all">All Guests</option>
            <option value="yes">RSVP Yes</option>
            <option value="no">RSVP No</option>
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} aria-label="Sort by">
            <option value="name">Sort by Name</option>
            <option value="table">Sort by Table</option>
          </select>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleExport}>
            <FaDownload /> Export CSV
          </motion.button>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handlePrint}>
            <FaPrint /> Print
          </motion.button>
        </motion.div>
      </section>

      {/* Guest List */}
      <motion.section
        className="guest-list"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredGuests.slice(0, visibleGuests).map((g) => (
          <motion.div className="guest-card" key={g.id} variants={itemVariants}>
            <div className="guest-avatar">{getInitials(g.name)}</div>
            <h3>{g.name}</h3>
            <p><strong>Email:</strong> {g.email}</p>
            <p><strong>Table:</strong> 
              <select
                value={g.table}
                onChange={(e) => handleUpdateTable(g.id, e.target.value)}
                aria-label={`Table for ${g.name}`}
              >
                {Array.from({ length: 10 }, (_, i) => `Table ${i + 1}`).map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </p>
            <p><strong>Dietary:</strong> {g.dietary}</p>
            <p>
              <strong>RSVP:</strong>{' '}
              <span
                className={`rsvp-toggle ${g.rsvp ? 'yes' : 'no'}`}
                onClick={() => handleToggleRsvp(g.id)}
              >
                {g.rsvp ? 'Attending' : 'Not Attending'}
              </span>
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="delete"
              onClick={() => handleDelete(g.id)}
            >
              Delete
            </motion.button>
          </motion.div>
        ))}
      </motion.section>

      {visibleGuests < filteredGuests.length && (
        <div className="export-btn">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setVisibleGuests((prev) => prev + 6)}
          >
            Show More
          </motion.button>
        </div>
      )}

      {/* Quick Stats */}
      <section className="quick-stats">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          Quick Stats
        </motion.h2>
        <motion.div
          className="stats-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={itemVariants}>
            <h3>Total Guests</h3>
            <p>{guests.length}</p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h3>Attending</h3>
            <p>{guests.filter((g) => g.rsvp).length}</p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h3>Not Attending</h3>
            <p>{guests.filter((g) => !g.rsvp).length}</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Chart Section */}
      <section className="chart-section">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          RSVP Breakdown
        </motion.h2>
        <Pie data={chartData} options={{ maintainAspectRatio: false }} height={300} />
      </section>

      {/* Tips Section */}
      <section className="tips-section">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          Tips for Managing Your Guest List
        </motion.h2>
        <motion.ul
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.li variants={itemVariants}>
            <strong>Start Early:</strong> Send invitations 6-8 weeks in advance to track RSVPs.
          </motion.li>
          <motion.li variants={itemVariants}>
            <strong>Set Reminders:</strong> Follow up with guests who haven’t responded a week before the deadline.
          </motion.li>
          <motion.li variants={itemVariants}>
            <strong>Plan Seating:</strong> Use table assignments to ensure a smooth event flow.
          </motion.li>
          <motion.li variants={itemVariants}>
            <strong>Track Dietary Needs:</strong> Note preferences to coordinate with your caterer.
          </motion.li>
        </motion.ul>
      </section>

      <ToastContainer position="top-right" autoClose={3000}/>
    </div>
  );
};

export default GuestList;