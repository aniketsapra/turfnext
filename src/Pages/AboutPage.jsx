import React from 'react'
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';


function AboutPage() {
  return (
    <div>
      <Navbar />
      <div className='bg-gray-900 h-150 flex justify-center items-center min-h-screen'>
      <div className='text-center text-gray-400 font-bold text-sm m-3 md:text-xl md:m-20'>
      Welcome to TurfSync — your ultimate solution for hassle-free turf bookings! We know how frustrating it can be to find and secure a sports ground, especially when time slots clash or schedules get mixed up. That’s why we built TurfSync — a seamless platform that lets you book your favorite playgrounds with just a few clicks.
    <br />
      With real-time availability, secure login, and instant confirmation, TurfSync ensures you never miss a game again. Whether you're planning a friendly match or organizing a tournament, we make turf management simple, smart, and stress-free.
    <br />
      Join the TurfSync community today and take the first step towards a smoother, smarter way to play!
      </div>
      </div>
      <Footer />
    </div>
  )
}

export default AboutPage
