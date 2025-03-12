import React, { useState } from 'react';
import axios from 'axios';
import Video2 from '../assets/tennis.mp4';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if email or password is empty
    if (!formData.email || !formData.password) {
      setErrorMessage('Please fill in both email and password.');
      return;
    }

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/login`, formData);
      localStorage.setItem('token', data.token);
      console.log('Backend URL:', import.meta.env.VITE_REACT_APP_BACKEND_BASEURL);
      setShowSuccessPopup(true); // Show success popup
      setErrorMessage(''); // Clear any previous error

      setTimeout(() => {
        setShowSuccessPopup(false);
        navigate('/main');
      }, 2000);
    } catch (err) {
      if (err.response) {
        // Check for 401 or 400 status — typical for invalid credentials
        if (err.response.status === 401 || err.response.status === 400) {
          setErrorMessage('Invalid email or password.');
        } else {
          setErrorMessage('Error logging in.');
        }
      } else {
        setErrorMessage('Error logging in.');
      }
    }
  };

  return (
    <div className="w-full h-screen text-white flex justify-center items-center relative">
      <div className='overlay'></div>
      <video src={Video2} autoPlay loop muted></video>

      <form onSubmit={handleSubmit} className="form bg-gray-900 gap-2 max-w-90 w-90 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <h2 className='text-center text-3xl font-bold'>Login</h2>

        <h3 className='mt-4'>Enter Email</h3>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
          type="email"
          placeholder="Email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        <h3>Enter Password</h3>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline mb-5"
          type="password"
          placeholder="Password"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />

        <button
          className="bg-transparent hover:bg-amber-400 text-white font-semibold hover:text-black py-2 px-4 border border-white hover:border-transparent duration-300 cursor-pointer"
          type="submit"
        >
          Login
        </button>

        <Link to="/signup">
          <h2 className='hover:underline'>Register Now</h2>
        </Link>
        <Link to="/home">
          <h2 className='hover:underline'>Back to Home</h2>
        </Link>
      </form>

      {errorMessage && (
        <div className="fixed bottom-5 right-5 bg-red-600 text-white p-4 rounded-lg shadow-lg">
          {errorMessage}
        </div>
      )}

      {showSuccessPopup && (
        <div className="fixed bottom-5 right-5 bg-green-600 text-white p-4 rounded-lg shadow-lg">
          Login successful! Redirecting...
        </div>
      )}
    </div>
  );
};

export default Login;
