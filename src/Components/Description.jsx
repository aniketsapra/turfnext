import React from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MapIcon from '@mui/icons-material/Map';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';

const Description = () => {
  return (
    <div>
     <div className='bg-amber-400 md:flex md:p-27 '>
        <div className='flex flex-col items-center p-10'>
            <MapIcon sx={{ fontSize: 60 }} />
            <h2 className='text-2xl pt-3'>Search</h2>
            <p className='text-center pt-3'>Are you looking to play after work, organize your Sunday Five's football match? Explore the largest network of sports facilities whole over the India.</p>
        </div>
        <div className='flex flex-col items-center p-10'>
            <CalendarMonthIcon sx={{ fontSize: 60 }}/>
            <h2 className='text-2xl pt-3'>Book</h2>
            <p className='text-center pt-3'>Once you’ve found the perfect ground, court or gym, Connect with the venue through the Book Now Button to make online booking & secure easier payment.</p>
        </div>
        <div className='flex flex-col items-center p-10'>
            <SportsBasketballIcon sx={{ fontSize: 60 }}/>
            <h2 className='text-2xl pt-3'>Play</h2>
            <p className='text-center pt-3'>You’re the hero, you’ve found a stunning turf or court, booked with ease and now its time to play. The scene is set for your epic match.</p>
        </div>
     </div>

    </div>
  );
};

export default Description;