// ProfilePage.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [popupMessage, setPopupMessage] = useState('')
  const [popupType, setPopupType] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const userResponse = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(userResponse.data);

        const bookingsResponse = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/bookings/user/${userResponse.data.uniqueId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(bookingsResponse.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchUserData();
  }, []);

  const handleDelete = async (bookingId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBookings(bookings.filter((booking) => booking._id !== bookingId));
      showPopup('Booking cancelled successfully!', 'success');
    } catch (err) {
      console.error('Error deleting booking:', err);
      showPopup('Failed to cancel booking.', 'error');
    }
  };

  const showPopup = (message, type) => {
    setPopupMessage(message);
    setPopupType(type);
    setTimeout(() => {
      setPopupMessage('');
      setPopupType('');
    }, 3000); // Hide popup after 3 seconds
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row h-screen p-8 gap-8 bg-gray-800">
        {/* User Details - 1/3 of screen */}
        <div className="md:w-1/3 bg-gray-900 p-6 text-white shadow-lg rounded-lg">
        <div className='flex justify-center items-center'>
          <AccountCircleRoundedIcon sx={{ fontSize: 100 }} />
        </div>
          <h1 className="text-2xl flex justify-center items-center font-bold mb-4">User Profile</h1>
          {userData ? (
            <div>
              <p><strong>Username: </strong><span className='text-amber-300'> {userData.username}</span></p>
              <p><strong>Email: </strong><span className='text-amber-300'> {userData.email}</span></p>
              <p><strong>Phone Number: </strong><span className='text-amber-300'> {userData.phone}</span></p>
              <p><strong>Unique ID: </strong><span className='text-amber-300'> {userData.uniqueId}</span></p>
            </div>
          ) : (
            <p>Loading user data...</p>
          )}
        </div>

        {/* Bookings - 2/3 of screen with scrolling */}
        <div className="md:w-2/3 bg-gray-900 p-6 text-white shadow-lg rounded-lg max-h-[calc(100vh-100px)] overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Bookings</h2>
          {bookings.length > 0 ? (
            <ul className="space-y-4">
              {bookings.map((booking) => (
                <li key={booking._id} className="flex justify-between items-center p-4 border shadow-sm bg-gray-800">
                  <div>
                    <p><strong>Turf:</strong> {booking.turf}</p>
                    <p><strong>Activity:</strong> {booking.activity}</p>
                    <p><strong>Date:</strong> {booking.date}</p>
                    <p><strong>Time Slot:</strong> {booking.timeslot}</p>
                  </div>
                  <DeleteOutlineIcon 
                    onClick={() => handleDelete(booking._id)} 
                    style={{ fontSize: '2.5rem', cursor: 'pointer' }} 
                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-700"
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p>No bookings found.</p>
          )}
        </div>
      </div>
      <Footer />

      {popupMessage && (
        <div
          className={`fixed bottom-5 right-5 p-4 border-2 border-white shadow-lg text-white ${
            popupType === 'success' ? 'bg-gray-900' : 'bg-red-600'
          }`}
        >
          {popupMessage}
        </div>
      )}

    </div>
  );
}

export default ProfilePage;
