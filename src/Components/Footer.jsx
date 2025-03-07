import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 text-l">
    <div className="container mx-auto text-center">
    <div className='md:flex items-center justify-around'>
        <div className='p-10'>
        <p className='footerlogo text-3xl font-bold md:text-5xl'>Turf<span className='text-amber-300 italic'>Sync</span></p>
        </div>
        <div className='md:p-10'>
          <Link to='/home'><h2 className="hover:text-gray-400 cursor-pointer">Home</h2></Link>
          <Link to='/about'><h2 className="hover:text-gray-400 cursor-pointer">About Us</h2></Link>
          <h2 className="hover:text-gray-400 cursor-pointer">Careers</h2>
          <Link to='/main'><h2 className="hover:text-gray-400 cursor-pointer">Book Now</h2></Link>
          <h2 className="hover:text-gray-400 cursor-pointer">Blogs</h2>
        </div>
        <div className='flex flex-col items-center gap-1.5 justify-center p-10'>
          <h2>aniketsapra2000@gmail.com</h2>
          <h2>+91 99531-66850</h2>
          <div className='flex gap-x-2'>
            <a href='https://github.com/aniketsapra' target='_blank' className="hover:text-gray-400 cursor-pointer">
              <GitHubIcon sx={{ fontSize: 30 }}/>
            </a>
            <a href='https://instagram.com' target='_blank' className="hover:text-gray-400 cursor-pointer">
              <InstagramIcon sx={{ fontSize: 30 }}/>
              </a>
            <a href='https://facebook.com' target='_blank' className="hover:text-gray-400 cursor-pointer">
              <FacebookIcon sx={{ fontSize: 30 }}/>
              </a>
            <a href='https://youtube.com' target='_blank' className="hover:text-gray-400 cursor-pointer">
              <YouTubeIcon sx={{ fontSize: 30 }}/>
              </a>
            <a href='https://x.com' target='_blank' className="hover:text-gray-400 cursor-pointer">
              <XIcon sx={{ fontSize: 30 }}/>
              </a>
            <a href='https://www.linkedin.com/in/aniketsapra/' target='_blank' className="hover:text-gray-400 cursor-pointer">
              <LinkedInIcon sx={{ fontSize: 30 }}/>
              </a>
          </div>
        </div>
    </div>

      <p className="text-sm">&copy; {new Date().getFullYear()} TurfSync. All rights reserved.</p>

      <div className="flex justify-center space-x-4 mt-2">
        <a href="#" className="hover:text-gray-400">Privacy Policy</a>
        <a href="#" className="hover:text-gray-400">Terms of Service</a>
        <a href="#" className="hover:text-gray-400">Contact Us</a>
      </div>

    </div>
  </footer>
  )
}

export default Footer
