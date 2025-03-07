import React, { useState } from 'react';
import axios from 'axios';
import Video2 from '../assets/tennis.mp4';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', email: '', phone: '', password: '' });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/signup', formData);
      setShowSuccessPopup(true); // Show success popup
      setTimeout(() => {
        setShowSuccessPopup(false);
        navigate('/login');
      }, 3000); // Auto-hide and navigate after 3 seconds
    } catch (err) {
      alert(err.response?.data?.error || 'Error signing up');
    }
  };

  return (
    <div className="w-full h-screen text-white flex justify-center items-center relative">
      <div className="overlay"></div>
      <video src={Video2} autoPlay loop muted></video>

      <form className="form bg-gray-900 gap-2 max-w-90 w-90 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col relative z-10" onSubmit={handleSubmit}>
        <h2 className="text-center text-3xl font-bold">Signup</h2>

        <h3 className="mt-4">Enter Username</h3>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline mb-2" type="text" placeholder="Username" onChange={(e) => setFormData({ ...formData, username: e.target.value })} required />

        <h3>Enter Email</h3>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline mb-2" type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />

        <h3>Enter Phone Number</h3>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline mb-2" type="tel" placeholder="Phone Number" onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />

        <h3>Enter Password</h3>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline mb-2" type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />

        <button className="bg-transparent hover:bg-amber-400 text-white font-semibold hover:text-black py-2 px-4 border border-white hover:border-transparent duration-300 cursor-pointer"
          type="submit">Signup</button>

        <Link to="/login">
          <h2 className="hover:underline">Already have an account? Login</h2>
        </Link>

        <Link to="/home">
          <h2 className="hover:underline">Back to Home</h2>
        </Link>
      </form>

      {showSuccessPopup && (
        <div className="fixed bottom-5 right-5 bg-green-700 p-4 rounded-lg shadow-lg z-50 flex items-center justify-between gap-4 w-80">
          <p className="text-white text-lg">New User Registered Successfully</p>
        </div>
      )}
    </div>
  );
};

export default Signup;
