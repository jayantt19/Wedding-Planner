// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homes from './pages/Home';
import About from './pages/About';
import Service from './pages/Service';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import GuestList from './pages/GuestList';
import BudgetTracker from './pages/BudgetTracker';
import Reminders from './pages/Reminders';
import Navbar from './components/Navbar';
import Pricing from './pages/Pricing';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';



export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homes />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/guestlist" element={<GuestList />} />
        <Route path="/budget" element={<BudgetTracker />} />
        <Route path="/reminders" element={<Reminders />} />
        <Route path="/Pricing" element={<Pricing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

