import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './BudgetTracker.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const defaultCategoryLimits = {
  Venue: 30000,
  Catering: 25000,
  Photography: 15000,
  Decoration: 10000,
  Dress: 10000,
  Misc: 10000,
  Entertainment: 8000, // New category
  Invitations: 5000    // New category
};

const categories = Object.keys(defaultCategoryLimits);

// Budget tips content
const budgetTips = [
  "Book venues and vendors early to lock in lower rates.",
  "Consider off-season dates for discounts.",
  "DIY decorations to save on costs.",
  "Limit guest list to reduce catering expenses.",
  "Compare multiple photographers for the best deal."
];

const BudgetTracker = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', cost: '', category: categories[0] });
  const [editIndex, setEditIndex] = useState(null);
  const [showTips, setShowTips] = useState(false);

  const totalBudget = Object.values(defaultCategoryLimits).reduce((a, b) => a + b, 0);
  const spent = items.reduce((acc, item) => acc + item.cost, 0);
  const remaining = totalBudget - spent;

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = () => {
    if (!newItem.name || !newItem.cost || isNaN(newItem.cost)) return;
    const updatedCost = parseFloat(newItem.cost);
    const categoryTotal = items
      .filter((item) => item.category === newItem.category)
      .reduce((acc, curr) => acc + curr.cost, 0);

    if (editIndex !== null) {
      const updated = [...items];
      updated[editIndex] = { ...newItem, cost: updatedCost };
      setItems(updated);
      setEditIndex(null);
    } else {
      if (categoryTotal + updatedCost > defaultCategoryLimits[newItem.category]) {
        alert(`Warning: Adding ${newItem.name} exceeds ${newItem.category} budget limit of ₹${defaultCategoryLimits[newItem.category]}!`);
      }
      setItems([...items, { ...newItem, cost: updatedCost }]);
    }
    setNewItem({ name: '', cost: '', category: categories[0] });
  };

  const handleEdit = (index) => {
    setNewItem(items[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const groupedByCategory = categories.map((cat) => ({
    category: cat,
    total: items.filter((item) => item.category === cat).reduce((acc, curr) => acc + curr.cost, 0),
    limit: defaultCategoryLimits[cat]
  }));

  const chartData = {
    labels: groupedByCategory.map((c) => c.category),
    datasets: [
      {
        label: 'Spending',
        data: groupedByCategory.map((c) => c.total),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#8BC34A', 
          '#9C27B0', '#FF9800', '#4CAF50', '#E91E63'
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow better scaling
    devicePixelRatio: 1, // Prevent canvas size issues
    animation: {
      animateScale: true,
      duration: 1200,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: { font: { size: 14 } }
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ₹${context.raw.toLocaleString()}`,
        },
      },
    },
  };

  const headers = [
    { label: 'Item Name', key: 'name' },
    { label: 'Category', key: 'category' },
    { label: 'Cost', key: 'cost' },
  ];

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    const canvas = document.getElementById('budgetChart');
    if (canvas) {
      const resizeCanvas = () => {
        const container = canvas.parentElement;
        const maxSize = 6000; // Lowered for safety
        canvas.width = Math.min(container.clientWidth, maxSize);
        canvas.height = Math.min(container.clientHeight, maxSize);
      };
      window.addEventListener('resize', resizeCanvas);
      resizeCanvas();
      return () => window.removeEventListener('resize', resizeCanvas);
    }
  }, []);

  return (
    <div className="budget-container">
      <header>
        <h1>Wedding Budget Planner</h1>
        <p className="tagline">Craft your dream wedding, step by step</p>
      </header>

      <section className="budget-form">
        <h2>Add Expense</h2>
        <div className="form-grid">
          <input
            type="text"
            name="name"
            placeholder="Item name"
            value={newItem.name}
            onChange={handleChange}
          />
          <input
            type="number"
            name="cost"
            placeholder="Cost (₹)"
            value={newItem.cost}
            onChange={handleChange}
          />
          <select name="category" value={newItem.category} onChange={handleChange}>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
          <button onClick={handleAddOrUpdate}>{editIndex !== null ? 'Update' : 'Add'}</button>
        </div>
      </section>

      <section className="summary">
        <h2>Budget Overview</h2>
        <div className="summary-grid">
          <p><strong>Total Budget:</strong> ₹{totalBudget.toLocaleString()}</p>
          <p><strong>Total Spent:</strong> ₹{spent.toLocaleString()}</p>
          <p className={remaining < 0 ? 'over-budget' : ''}>
            <strong>Remaining:</strong> ₹{remaining.toLocaleString()}
            {remaining < 0 && <span className="warning"> (Over Budget!)</span>}
          </p>
        </div>
      </section>

      <section className="category-progress">
        <h2>Category Spending</h2>
        <div className="progress-grid">
          {groupedByCategory.map((group, index) => {
            const percent = Math.min((group.total / group.limit) * 100, 100).toFixed(0);
            return (
              <div key={index} className="progress-card">
                <strong>{group.category}</strong>
                <div className="progress-bar">
                  <div
                    className={`fill ${group.total > group.limit ? 'over-limit' : ''}`}
                    style={{ width: `${percent}%` }}
                  >
                    {percent}%
                  </div>
                </div>
                <p>₹{group.total.toLocaleString()} / ₹{group.limit.toLocaleString()}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="chart">
        <h2>Spending Distribution</h2>
        <div className="chart-wrapper">
          <Pie id="budgetChart" data={chartData} options={chartOptions} />
        </div>
      </section>

      <section className="item-list">
        <h2>Expense Details</h2>
        <div className="actions">
          <CSVLink data={items} headers={headers} filename="wedding-budget.csv" className="export-btn">
            Export to CSV
          </CSVLink>
          <button onClick={handlePrint} className="print-btn">🖨️ Print</button>
        </div>
        {items.length === 0 ? (
          <p className="no-items">No expenses added yet. Start planning!</p>
        ) : (
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                <span>{item.name}</span>
                <span>{item.category}</span>
                <span>₹{item.cost.toLocaleString()}</span>
                <div className="actions">
                  <button onClick={() => handleEdit(index)}>✏️</button>
                  <button onClick={() => handleDelete(index)}>❌</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="budget-tips">
        <h2 onClick={() => setShowTips(!showTips)} className="toggle-tips">
          Budget Tips {showTips ? '▲' : '▼'}
        </h2>
        {showTips && (
          <ul>
            {budgetTips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default BudgetTracker;