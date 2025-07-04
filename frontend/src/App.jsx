import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';

function App() {
  const [page, setPage] = useState('login');

  return (
    <div style={{ maxWidth: 400, margin: '40px auto' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 20 }}>
        <button onClick={() => setPage('login')}>Login</button>
        <button onClick={() => setPage('signup')}>Signup</button>
      </div>
      <div style={{ marginTop: 30 }}>
        {page === 'login' ? <Login /> : <Signup />}
      </div>
    </div>
  );
}

export default App;
