import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Admissions from './pages/Admissions';
import Gallery from './pages/Gallery';
import Events from './pages/Events';
import Contact from './pages/Contact';
import Login from './pages/Portal/Login';
import Register from './pages/Portal/Register';
import DashboardLayout from './pages/Portal/DashboardLayout';
import DashboardHome from './pages/Portal/DashboardHome';
import Students from './pages/Portal/Students';
import Teachers from './pages/Portal/Teachers';
import Classes from './pages/Portal/Classes';
import Subjects from './pages/Portal/Subjects';
import Attendance from './pages/Portal/Attendance';
import Grades from './pages/Portal/Grades';
import Timetable from './pages/Portal/Timetable';
import Fees from './pages/Portal/Fees';
import './styles/global.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/admissions" element={<Admissions />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />

        {/* Portal */}
        <Route path="/portal/login" element={<Login />} />
        {/* Register route removed */}
        <Route path="/portal/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="students" element={<Students />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="classes" element={<Classes />} />
          <Route path="user-management" element={require('./pages/Portal/UserManagement').default} />
          <Route path="subjects" element={<Subjects />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="grades" element={<Grades />} />
          <Route path="timetable" element={<Timetable />} />
          <Route path="fees" element={<Fees />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
