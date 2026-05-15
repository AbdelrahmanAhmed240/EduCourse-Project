import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CourseProvider } from './context/CourseContext';
import NavigationBar from './components/NavigationBar'; 
import Home from './pages/Home';
import Generator from './pages/Generator';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Plans from './pages/Plans';

function App() {
  return (
    <CourseProvider>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generate" element={<Generator />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/plans" element={<Plans />} />
        </Routes>
      </Router>
    </CourseProvider>
  );
}

export default App;