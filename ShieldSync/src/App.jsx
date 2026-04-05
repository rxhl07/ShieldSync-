import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Arena from './pages/Arena';
import { ROUTES } from './utils/constants';
import { ThemeProvider } from './contexts/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={ROUTES.LANDING} element={<Landing />} />
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTES.ARENA} element={<Arena />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
