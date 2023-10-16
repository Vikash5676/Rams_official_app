import './App.css';
import { HashRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './pages/Dashboard/Dashboard';
import { useState } from 'react';
import LoginPage from './pages/LoginPage/LoginPage';
import MaterialTable from './pages/MaterialTable/MaterialTable';
import AllWorker from './pages/AllEmpPage/AllEmp';
import PpeTable from './pages/PpeTable/PpeTable';
import SafteyObservation from './pages/SafetyObservation/SafetyObservation';
import VehicleData from './pages/VehicleData/VehicleData';
import VehicleDetails from './pages/VehichelDetails/VehicleDetails';
import Footer from './components/Footer/Footer';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const PrivateWrapper = () => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
  };

  return (
    <HashRouter>
      <Navbar setAuth={setIsAuthenticated} />
      <Routes>
        <Route element={<PrivateWrapper />}>
          <Route path="/" element={<Dashboard />} />
          <Route path='/material' element={<MaterialTable />} />
          <Route path='/all-emp' element={<AllWorker />} />
          <Route path='/ppe-table' element={<PpeTable />} />
          <Route path='/safety-table' element={<SafteyObservation />} />
          <Route path='/vehicle-data' element={<VehicleData />} />
          <Route path='/vehicle-entry' element={<VehicleDetails />} />
        </Route>
        <Route path='/login' element={<LoginPage isAuth={setIsAuthenticated} />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
}

export default App;
