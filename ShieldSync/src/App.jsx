import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Arena from './pages/Arena';
import Login from './pages/Login'; // Import the new Login page
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext'; // Import Auth Provider
import ProtectedRoute from './components/common/ProtectedRoute'; // Import Bouncer

function App() {
  return (
    <ThemeProvider>
      <AuthProvider> {/* Wrap the app in the AuthProvider */}
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* Public Routes */}
              <Route index element={<Landing />} />
              <Route path="login" element={<Login />} />

              {/* Protected Routes - Locked behind the Bouncer! */}
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="arena"
                element={
                  <ProtectedRoute>
                    <Arena />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;