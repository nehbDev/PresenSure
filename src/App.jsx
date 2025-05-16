// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import StudentsPage from "./pages/Admin/StudentsPage";
import InstructorPage from "./pages/Admin/InstructorPage";
import SchedulePage from "./pages/Admin/SchedulePage";
import AttendancePage from "./pages/Admin/AttendancePage";
import AppealsPage from "./pages/Admin/AppealsPage";
import DashboardPage from "./pages/Instructor/DashboardPage";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/instructors" element={<InstructorPage />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/appeals" element={<AppealsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
