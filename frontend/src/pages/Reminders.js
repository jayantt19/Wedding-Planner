import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Reminders.css';

const Reminders = () => {
  const [reminders, setReminders] = useState([
    { id: 1, text: 'Book venue', dueDate: '2025-05-01', completed: false, category: 'Venue', priority: 'High' },
    { id: 2, text: 'Meet photographer', dueDate: '2025-05-02', completed: true, category: 'Photography', priority: 'Medium' },
    { id: 3, text: 'Dress fitting', dueDate: '2025-05-01', completed: false, category: 'Beauty', priority: 'Low' },
  ]);
  const [newReminder, setNewReminder] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [newCategory, setNewCategory] = useState('General');
  const [newPriority, setNewPriority] = useState('Medium');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortBy, setSortBy] = useState('dueDate'); // New: Sort option
  const [showOverdue, setShowOverdue] = useState(false); // New: Toggle overdue reminders

  const categories = ['General', 'Venue', 'Catering', 'Beauty', 'Photography', 'Entertainment', 'Invitations'];
  const priorities = ['Low', 'Medium', 'High'];

  const addReminder = () => {
    if (!newReminder || !newDueDate) return;
    const newId = reminders.length ? Math.max(...reminders.map(r => r.id)) + 1 : 1;
    setReminders([
      ...reminders,
      { id: newId, text: newReminder, dueDate: newDueDate, completed: false, category: newCategory, priority: newPriority }
    ]);
    setNewReminder('');
    setNewDueDate('');
    setNewCategory('General');
    setNewPriority('Medium');
  };

  const toggleCompleted = (id) => {
    setReminders(reminders.map(r => r.id === id ? { ...r, completed: !r.completed } : r));
  };

  const deleteReminder = (id) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  const handleExport = () => {
    const headers = ['ID', 'Task', 'Due Date', 'Completed', 'Category', 'Priority'];
    const rows = reminders.map(r => [r.id, r.text, r.dueDate, r.completed ? 'Yes' : 'No', r.category, r.priority]);
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wedding-reminders.csv';
    a.click();
  };

  const sortedReminders = [...reminders].sort((a, b) => {
    if (sortBy === 'dueDate') return new Date(a.dueDate) - new Date(b.dueDate);
    if (sortBy === 'priority') return priorities.indexOf(b.priority) - priorities.indexOf(a.priority);
    return a.text.localeCompare(b.text); // Sort by text
  });

  const filteredReminders = sortedReminders.filter(r => {
    const matchesDate = new Date(r.dueDate).toDateString() === selectedDate.toDateString();
    const matchesCategory = filterCategory === 'All' || r.category === filterCategory;
    const matchesOverdue = !showOverdue || (new Date(r.dueDate) < new Date() && !r.completed);
    return matchesDate && matchesCategory && matchesOverdue;
  });

  const overdueReminders = reminders.filter(r => new Date(r.dueDate) < new Date() && !r.completed);

  const total = reminders.length;
  const completed = reminders.filter(r => r.completed).length;
  const pending = total - completed;

  // Mark dates with reminders
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const hasReminder = reminders.some(r => new Date(r.dueDate).toDateString() === date.toDateString());
      return hasReminder ? <span className="reminder-dot"></span> : null;
    }
  };

  return (
    <div className="reminders-container">
      <header>
        <h1>Wedding Task Manager</h1>
        <p className="tagline">Stay on top of your big day</p>
      </header>

      <section className="summary">
        <div className="summary-stats">
          <span>Total: {total}</span>
          <span>Pending: {pending}</span>
          <span>Completed: {completed}</span>
          <span className="overdue">Overdue: {overdueReminders.length}</span>
        </div>
        <button className="export-btn" onClick={handleExport}>Export to CSV</button>
      </section>

      <section className="reminder-form">
        <h2>Add New Task</h2>
        <div className="form-grid">
          <input
            type="text"
            placeholder="Task (e.g., Book caterer)"
            value={newReminder}
            onChange={e => setNewReminder(e.target.value)}
          />
          <input
            type="date"
            value={newDueDate}
            onChange={e => setNewDueDate(e.target.value)}
          />
          <select value={newCategory} onChange={e => setNewCategory(e.target.value)}>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
          <select value={newPriority} onChange={e => setNewPriority(e.target.value)}>
            {priorities.map((p, idx) => (
              <option key={idx} value={p}>{p}</option>
            ))}
          </select>
          <button onClick={addReminder}>Add Task</button>
        </div>
      </section>

      <section className="calendar-container">
        <div className="calendar-controls">
          <h2>Task Calendar</h2>
          <div className="filters">
            <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
              <option value="All">All Categories</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="dueDate">Sort by Date</option>
              <option value="priority">Sort by Priority</option>
              <option value="text">Sort by Task Name</option>
            </select>
            <label>
              <input
                type="checkbox"
                checked={showOverdue}
                onChange={e => setShowOverdue(e.target.checked)}
              />
              Show Overdue Only
            </label>
          </div>
        </div>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileContent={tileContent}
          className="calendar"
        />
        <div className="calendar-reminders">
          <h3>Tasks for {selectedDate.toDateString()}</h3>
          {filteredReminders.length > 0 ? (
            <ul>
              {filteredReminders.map((r) => (
                <li key={r.id} className={`calendar-task priority-${r.priority.toLowerCase()}`}>
                  <span
                    onClick={() => toggleCompleted(r.id)}
                    className={`task-text ${r.completed ? 'done' : ''}`}
                  >
                    {r.text} ({r.category})
                  </span>
                  <div className="task-actions">
                    <span className="task-status">{r.completed ? '✅' : '⏳'}</span>
                    <button onClick={() => deleteReminder(r.id)} className="delete-btn">🗑️</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-tasks">No tasks scheduled for this date.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Reminders;