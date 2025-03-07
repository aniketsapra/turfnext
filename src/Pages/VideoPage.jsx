import React from 'react'
import VideoBG from '../assets/ball.mp4'
import Button from '../Components/Button'
import { Link } from 'react-router-dom'

function VideoPage() {
  return (
    <div className='videomain'>
      <div className='overlay'></div>
      <video src={VideoBG} autoPlay loop muted></video>
      <div className='content text-right'>
        <h1 className='text-3xl md:text-6xl pr-10'>Seamless bookings, Ultimate play</h1>
        <p className='font-bold text-4xl md:text-8xl pt-5 pr-30 pb-5'>Turf<span className='text-amber-300 italic'>Sync</span></p>
        <div className='md:text-xl pr-32'>
        <Link to='/home'>
        <Button label='Book Your Play'></Button>
        </Link>
        </div>
      </div>
    </div>
  )
}

export default VideoPage
