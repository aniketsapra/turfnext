import React from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'
import Video3 from '../assets/basketball.mp4'
function Hero() {
  return (
    <div>
      <div className='videomain'>
          <div className='herooverlay'></div>
          <video src={Video3} autoPlay loop muted></video>
          <div className='absolute w-full h-full top-0 flex flex-col justify-center text-white herofont text-right p-10 mt-7'>
          <h1 className='text-4xl md:text-7xl md:font-bold'>
            <span className='hidden md:inline'>Lock Your Slot, <span className='text-amber-300'>Own the Field!</span></span>
            <span className='md:hidden'>Lock Your Slot<br /><span className='text-amber-300'>Own the Field!</span></span>
          </h1>
            <h2 className='text-xl md:text-5xl md:font-bold'>
              Seamless Turf Booking at Your Fingertips.
            </h2>
          </div>
      </div>
    <div className="hero herofont text-white p-20 md:p-50">
      <h1 className='text-3xl md:text-7xl md:font-bold'>
      Turf Grounds In Delhi
      </h1>
      <p className='md:text-3xl text-2xl md:font-bold mt-2'>Explore the best in class turf grounds in Delhi.<br /> Book slots at your nearest turfs with ease and play as per your convenience.
      </p>
      <div className='text-2xl mt-4 md:text-4xl'>
      <Link to='/main'>
      <Button label='Explore Now'></Button>
      </Link>
      </div>      
    </div>
  </div>
  )
}

export default Hero
