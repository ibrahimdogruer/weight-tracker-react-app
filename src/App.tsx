import './styles/styles.css'

import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './contexts/AuthProvider';
import Header from './components/Header';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Header />
          <AppRoutes />

          <ToastContainer
            position="bottom-right" autoClose={3000} hideProgressBar={false}
            newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss
            draggable theme='dark' />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
