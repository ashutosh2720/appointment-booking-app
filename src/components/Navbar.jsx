import React from 'react'
import '../styles/Nav.css'
import logo from '../../public/vite.svg'
const Navbar = () => {
  return (
    <div className='nav-main'>
        <div className="logo"><img style={{height:'50px'}} src="https://www.pngitem.com/pimgs/m/613-6136271_book-an-appointment-sign-hd-png-download.png" alt="" /></div>
        <div className="nav-links">
            <p>Menu</p>
            <p>Contact Us</p>
            <p className='share-link'>Share Link</p>
        </div>
      
    </div>
  )
}

export default Navbar
