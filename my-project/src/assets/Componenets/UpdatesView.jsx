import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

const UpdatesView = () => {
  const [updateText, setUpdateText] = useState('');
  const [messages, setMessages] = useState([]);

  // Fetch messages from the server
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:5500/messages/getMessages');
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5500/messages/createMessage', {
        content: updateText,
      });
      setMessages([response.data, ...messages]); // Update state with the new message
      setUpdateText('');
    } catch (error) {
      console.error('Error submitting update:', error);
    }
  };

  // Group messages by date
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
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-custom-teal mb-6">Post Update</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            value={updateText}
            onChange={(e) => setUpdateText(e.target.value)}
            placeholder="Enter your update message here..."
            className="w-full p-3 border rounded-lg focus:outline-none focus:border-custom-light-teal min-h-[150px]"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!updateText.trim()}
        >
          Post Update
        </button>
      </form>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Latest Updates</h3>
        {Object.keys(groupedMessages).map((date) => (
          <div key={date} className="mb-4">
            <h4 className="text-lg font-bold mb-2">{dayjs(date).format('MMMM D, YYYY')}</h4>
            <ul>
              {groupedMessages[date].map((message) => (
                <li key={message._id} className="border-b py-2">
                  {message.content}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpdatesView;