import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment'; // Importing moment.js for date formatting

const ComplaintsView = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [error, setError] = useState('');
  const category = 'Carpentry'; // Updated category name

  // Fetch complaints based on the filter
  const fetchComplaints = async (filter) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/complaints/supervisor/:${category}`
      );
      setComplaints(response.data);
    } catch (err) {
      console.error('Error fetching complaints:', err);
      setError(err.response?.data?.message || 'Error fetching complaints');
    }
    setLoading(false);
  };

  // Fetch complaints initially based on the filter
  useEffect(() => {
    fetchComplaints(activeFilter);  
  }, [activeFilter]);

  useEffect(() => {
    console.log('Complaints data:', complaints);  // Debugging complaints state
  }, [complaints]);

  // Handle filter button click
  const handleButtonClick = (filter) => {
    setActiveFilter(filter);
  };

  // Helper function to format date using moment.js
  const formatDate = (date) => {
    const formattedDate = moment(date).isValid() ? moment(date).format('YYYY-MM-DD') : 'Invalid Date';
    return formattedDate;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-teal-600 mb-6">Student Complaints</h2>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => handleButtonClick('all')}
          className={`px-4 py-2 rounded-md ${activeFilter === 'all' ? 'bg-teal-500 text-white' : 'bg-gray-200'}`}
        >
          All Complaints
        </button>
        <button
          onClick={() => handleButtonClick('active')}
          className={`px-4 py-2 rounded-md ${activeFilter === 'active' ? 'bg-teal-500 text-white' : 'bg-gray-200'}`}
        >
          Active Complaints
        </button>
      </div>

      <div className="text-custom-grey text-center py-8">
        {loading ? (
          <p className="text-lg">Loading complaints...</p>
        ) : error ? (
          <p className="text-lg text-red-500">{error}</p>
        ) : complaints.length === 0 ? (
          <p className="text-lg">No complaints available at the moment.</p>
        ) : (
          <ul>
            {complaints.map((complaint) => (
              <li key={complaint._id} className="mb-4">
                <div className="bg-gray-100 p-4 rounded-lg shadow-md hover:bg-teal-50 transition duration-300 ease-in-out">
                  <p className="text-xl font-semibold text-teal-800">{complaint.Title}</p>
                  <p className="text-md text-gray-700">{complaint.Description}</p>
                  <p className="text-xs text-gray-500">
                    Date: {formatDate(complaint.ComplaintDate)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
        <p className="text-sm mt-2">Complaints will appear here once connected to the backend.</p>
      </div>
    </div>
  );
};

export default ComplaintsView;
