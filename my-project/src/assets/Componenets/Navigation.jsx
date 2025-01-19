import React from 'react';

const Navigation = ({ activeTab, setActiveTab, username, handleLogout }) => {
  return (
    <nav className="bg-blue-600 text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-lg font-bold">Welcome, {username}!</h1>
        <div className="space-x-4">
          <button
            onClick={() => setActiveTab('complaints')}
            className={`py-2 px-4 rounded ${
              activeTab === 'complaints'
                ? 'bg-blue-800'
                : 'hover:bg-blue-700'
            }`}
          >
            Complaints
          </button>
          <button
            onClick={() => setActiveTab('updates')}
            className={`py-2 px-4 rounded ${
              activeTab === 'updates'
                ? 'bg-blue-800'
                : 'hover:bg-blue-700'
            }`}
          >
            Updates
          </button>
          <button
            onClick={handleLogout}
            className="py-2 px-4 bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
