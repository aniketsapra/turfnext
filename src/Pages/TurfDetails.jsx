import React, { useState } from 'react';
import { useParams , useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { turfList } from '../Data/Data';
import Button from '../Components/Button';
import Modal from '../Components/Modal';

function TurfDetails() {
  const { id } = useParams();
  const turf = turfList.find((turf) => turf.id.toString() === id);
  const navigate = useNavigate();
  const [selectedActivity, setSelectedActivity] = useState('');
  const [selectedTimeslot, setSelectedTimeslot] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  if (!turf) {
    return (
      <div className="bg-gray-800 h-screen flex justify-center items-center">
        <h1 className="text-white text-2xl">Turf not found</h1>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setPopupMessage('Please log in first.');
      setShowPopup(true);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          turf: turf.name,
          activity: selectedActivity,
          timeslot: selectedTimeslot,
          date: selectedDate,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setPopupMessage('Booking confirmed!');
        setShowPopup(true);
        setTimeout(() => navigate('/profile'), 2000); // Auto-redirect after 2 seconds
      } else {
        setPopupMessage(data.error || 'Booking slot not available.');
        setShowPopup(true);
      }
    } catch (err) {
      setPopupMessage('Something went wrong. Please try again.');
      setShowPopup(true);
    }
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <div className="bg-gray-900 min-h-screen p-10 text-white flex flex-col md:flex-row gap-10">
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{turf.name}</h1>
            <img src={turf.image} alt={turf.name} className="w-full mt-4 shadow-lg" />
            <p className="text-lg mt-2">Rating: {turf.rating} / 5 ⭐</p>
          </div>

          <div className="flex-1 md:p-10">
            <h2 className="text-xl font-semibold">Available Capacity: {turf.capacity}</h2>
            <h2 className="text-xl font-semibold my-2">Price: {turf.price}</h2>
            <h2 className="text-xl font-semibold">Available Activities:</h2>

            <div className="flex flex-wrap items-center gap-2 my-4">
              {turf.activities.map((activity, index) => (
                <span key={index} className="flex items-center">
                  <input
                    type="radio"
                    id={`activity-${index}`}
                    name="activity-selection"
                    value={activity}
                    className="hidden peer"
                    onChange={() => setSelectedActivity(activity)}
                    required
                  />
                  <label
                    htmlFor={`activity-${index}`}
                    className="inline-flex items-center font-bold text-md justify-center w-30 md:w-40 h-12 text-center p-3 text-white bg-gray-800 border border-white cursor-pointer peer-checked:text-black peer-checked:border-black peer-checked:bg-amber-300 hover:bg-gray-200 hover:text-black hover:border-black duration-300"
                  >
                    {activity}
                  </label>
                </span>
              ))}
            </div>

            <div>
              <label className="text-xl font-semibold block text-white mb-2">Select a Timeslot</label>
              <select
                id="timeslots"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3"
                onChange={(e) => setSelectedTimeslot(e.target.value)}
                required
              >
                <option value="">Select a timeslot</option>
                {turf.timeSlots.map((slot, index) => (
                  <option key={index} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>

              <div className="relative max-w-sm">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                  </svg>
                </div>
                <input
                  type="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Select date"
                  onChange={(e) => setSelectedDate(e.target.value)}
                  required
                />
              </div>

              <div className="text-lg mt-4">
                <Button label="Confirm Booking" type="submit" onClick={handleSubmit} />
              </div>
            </div>

            <div className="mt-4">
              <h2 className="text-xl font-semibold">Description:</h2>
              <p className="mt-2">{turf.description}</p>
              <p className="mt-2 text-sm text-gray-300">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s.
              </p>
            </div>
          </div>
        </div>
      </form>
      {showPopup && <Modal message={popupMessage} onClose={() => setShowPopup(false)} />}
      <Footer />
    </div>
  );
}

export default TurfDetails;
