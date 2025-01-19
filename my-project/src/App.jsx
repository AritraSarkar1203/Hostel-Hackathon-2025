import React, { useState } from 'react';
import LoginForm from './assets/Componenets/LoginForm.jsx';
import Navigation from './assets/Componenets/Navigation.jsx';
import ComplaintsView from './assets/Componenets/ComplaintsView.jsx';
import UpdatesView from './assets/Componenets/UpdatesView.jsx';

const SUPERVISORS = [
  { id: 1, username: 'sup1', password: 'pass123' },
  { id: 2, username: 'sup2', password: 'pass456' },
  { id: 3, username: 'sup3', password: 'pass789' },
  { id: 4, username: 'sup4', password: 'pass012' },
];

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('complaints');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    const supervisor = SUPERVISORS.find(
      (s) => s.username === username && s.password === password
    );

    if (supervisor) {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setActiveTab('complaints');
  };

  // If not logged in, show the login form
  if (!isLoggedIn) {
    return (
      <LoginForm
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        handleLogin={handleLogin}
        error={error}
      />
    );
  }

  // If logged in, show the main dashboard
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        username={username}
        handleLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'complaints' ? <ComplaintsView /> : <UpdatesView />}
      </main>
    </div>
  );
};

export default App;
