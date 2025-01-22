import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import dotenv from 'dotenv';




const UpdatesView = () => {
  const [updateText, setUpdateText] = useState('');
  const [messages, setMessages] = useState([]);

  // Fetch messages from the server
  
  
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('https://hostel-hackathon-2025-3.onrender.com/messages/getMessages');

        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error.message);
      }
    };
  
    fetchMessages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     
      const response = await axios.post('https://hostel-hackathon-2025-3.onrender.com/messages/createMessage', {
        content: updateText,
      });
      console.log('New message added:', response.data);
      setMessages([response.data, ...messages]);
      setUpdateText('');
    } catch (error) {
      console.error('Error submitting update:', error.response?.data || error.message);
    }
  };
  

  const groupMessagesByDate = () => {
    return messages.reduce((groups, message) => {
      const date = dayjs(message.createdAt).format('YYYY-MM-DD');
      if (!groups[date]) groups[date] = [];
      groups[date].push(message);
      return groups;
    }, {});
  };

  const groupedMessages = groupMessagesByDate();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col h-screen">
      <div className="flex-1 overflow-auto">
        <h3 className="text-xl font-semibold mb-4 text-center">Latest Updates</h3>
        {Object.keys(groupedMessages).map((date) => (
          <div key={date} className="mb-4">
            <h4 className="text-lg font-bold mb-2">{dayjs(date).format('MMMM D, YYYY')}</h4>
            <div className="flex flex-wrap gap-4">
              {groupedMessages[date].map((message) => (
                <div key={message._id} className="bg-gray-100 p-4 rounded-lg shadow-md w-fit max-w-xs">
                  <p className="text-sm text-gray-700">{message.content}</p>
                  <span className="text-xs text-gray-500 block mt-2">{dayjs(message.createdAt).format('hh:mm A')}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 border-t pt-4">
        <h2 className="text-2xl font-bold text-custom-teal mb-4 text-center">Post Update</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            value={updateText}
            onChange={(e) => setUpdateText(e.target.value)}
            placeholder="Enter your update message here..."
            className="w-full p-3 border rounded-lg focus:outline-none focus:border-custom-light-teal min-h-[100px]"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 hover:from-teal-400 hover:to-blue-500 transform hover:scale-105"
            disabled={!updateText.trim()}
          >
            🚀 Post Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatesView;