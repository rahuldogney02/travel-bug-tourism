import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faYoutube, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faMapMarker, faPhone } from '@fortawesome/free-solid-svg-icons';
import BackToTopButton from './BackToTopButton';

const Footer = () => {
  return (
    <>
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="w-full">
            <div className="flex flex-col sm:flex-row sm:justify-between items-center py-4 space-y-4 sm:space-y-0">
              <div className="flex items-center">
                <span className="me-2">
                  <FontAwesomeIcon icon={faPhone} />
                </span>
               <span className="me-2">Speak to our Travel Expert</span><a href="tel:+919340988422" className="text-blue-400 hover:text-blue-300">+91 9340988422</a>
              </div>
              <div className="flex items-center">
                <span className="me-2">Follow Us :</span>
                <div className="flex space-x-2">
                  <a href="https://www.facebook.com/" target="_blank" className="text-white"><FontAwesomeIcon icon={faFacebook} className="w-6 h-6" /></a>
                  <a href="https://www.youtube.com/" target="_blank" className="text-white"><FontAwesomeIcon icon={faYoutube} className="w-6 h-6" /></a>
                  <a href="https://www.instagram.com//" target="_blank" className="text-white"><FontAwesomeIcon icon={faInstagram} className="w-6 h-6" /></a>
                  <a href="#" target="_blank" className="text-white"><FontAwesomeIcon icon={faMapMarker} className="w-6 h-6" /></a>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6">
              <div className="w-full">
                <h4 className="text-lg font-semibold mb-4 text-white">Contact Us</h4>
                <div className="flex mt-3 mb-3">
                  <div className="flex-shrink-0">
                    <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="14.5" cy="14.5" r="14.5" fill="#11664d" />
                      <path d="M14.0002 14.6666C13.5581 14.6666 13.1342 14.4911 12.8217 14.1785C12.5091 13.8659 12.3335 13.442 12.3335 13C12.3335 12.558 12.5091 12.134 12.8217 11.8215C13.1342 11.5089 13.5581 11.3333 14.0002 11.3333C14.4422 11.3333 14.8661 11.5089 15.1787 11.8215C15.4912 12.134 15.6668 13 15.6668 13C15.6668 13.2188 15.6237 13.4356 15.54 13.6378C15.4562 13.84 15.3334 14.0237 15.1787 14.1785C15.0239 14.3333 14.8402 14.456 14.638 14.5398C14.4358 14.6235 14.219 14.6666 14.0002 14.6666ZM14.0002 8.33331C12.7625 8.33331 11.5755 8.82498 10.7003 9.70015C9.82516 10.5753 9.3335 11.7623 9.3335 13C9.3335 16.5 14.0002 21.6666 14.0002 21.6666C14.0002 21.6666 18.6668 16.5 18.6668 13C18.6668 11.7623 18.1752 10.5753 17.3 9.70015C16.4248 8.82498 15.2378 8.33331 14.0002 8.33331Z" fill="white" />
                    </svg>
                  </div>
                  <div className="flex-1 ml-3">
                    <h4 className="mb-0 text-lg font-normal text-[#11664d]">Khatiwala Tank Sapna Sangeeta Road, Bhawarkua Main Rd, Navlakha,  Indore, Madhya Pradesh 452014.</h4>
                  </div>
                </div>
                <div className="flex mt-3 mb-3">
                  <div className="flex-shrink-0">
                    <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="14.5" cy="14.5" r="14.5" fill="#11664d" />
                      <path d="M19.3335 9.66669H8.66683C7.9335 9.66669 7.34016 10.2667 7.34016 11L7.3335 19C7.3335 19.7334 7.9335 20.3334 8.66683 20.3334H19.3335C20.0668 20.3334 20.6668 19.7334 20.6668 19V11C20.6668 10.2667 20.0668 9.66669 19.3335 9.66669ZM19.0668 12.5L14.3535 15.4467C14.1402 15.58 13.8602 15.58 13.6468 15.4467L8.9335 12.5C8.86665 12.4625 8.80811 12.4118 8.76142 12.351C8.71474 12.2902 8.68087 12.2205 8.66188 12.1463C8.64289 12.072 8.63916 11.9946 8.65093 11.9189C8.6627 11.8431 8.68972 11.7706 8.73035 11.7056C8.77098 11.6405 8.82438 11.5845 8.88731 11.5407C8.95025 11.4969 9.02141 11.4664 9.09649 11.4509C9.17158 11.4354 9.24902 11.4353 9.32413 11.4507C9.39925 11.466 9.47047 11.4964 9.5335 11.54L14.0002 14.3334L18.4668 11.54C18.5299 11.4964 18.6011 11.466 18.6762 11.4507C18.7513 11.4353 18.8288 11.4354 18.9038 11.4509C18.9789 11.4664 19.0501 11.4969 19.113 11.5407C19.1759 11.5845 19.2293 11.6405 19.27 11.7056C19.3106 11.7706 19.3376 11.8431 19.3494 11.9189C19.3612 11.9946 19.3574 12.072 19.3384 12.1463C19.3195 12.2205 19.2856 12.2902 19.2389 12.351C19.1922 12.4118 19.1337 12.4625 19.0668 12.5Z" fill="white" />
                    </svg>
                  </div>
                  <div className="flex-1 ml-3">
                    <h4 className="mb-0 text-lg font-normal text-[#11664d]">travelbugtourism@gmail.com</h4>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <h4 className="text-lg font-semibold mb-4 text-white">Company</h4>
                <ul className="list-none space-y-2">
                  <li><Link href="/" className="text-white hover:text-gray-300">Home</Link></li>
                  <li><Link href="/about-us" className="text-white hover:text-gray-300">About Us</Link></li>
                  <li><Link href="/blogs" className="text-white hover:text-gray-300">News & Blogs</Link></li>
                  <li><Link href="/contact-us" className="text-white hover:text-gray-300">Contact Us</Link></li>
                  <li><a href="javascript:void(0)" className="text-white hover:text-gray-300">Terms & Conditions</a></li>
                  <li><Link href="/privacy-policy" className="text-white hover:text-gray-300">Privacy Policy</Link></li>
                </ul>
              </div>
              <div className="w-full">
                <h4 className="text-lg font-semibold mb-4 text-white">Destinations</h4>
                <ul className="list-none space-y-2">
                  <li><Link href="/category/domestic" className="text-white hover:text-gray-300">Domestic</Link></li>
                  <li><Link href="/category/international" className="text-white hover:text-gray-300">International</Link></li>
                  <li><Link href="/category/weekend-trips" className="text-white hover:text-gray-300">Weekend Trips</Link></li>
                  <li><Link href="/category/honeymoon-packages" className="text-white hover:text-gray-300">Honeymoon Packages</Link></li>
                  <li><Link href="/category/any-festival" className="text-white hover:text-gray-300">Any Festival</Link></li>
                  <li><Link href="/gift-cards" className="text-white hover:text-gray-300">Giftcards</Link></li>
                </ul>
              </div>
              <div className="w-full">
                <h4 className="text-lg font-semibold mb-4 text-white">Newsletter</h4>
                <p className="text-sm mb-4 text-gray-300">Subscribe to the free newsletter and stay up to date</p>
                <form className="flex flex-col sm:flex-row sm:space-x-2 sm:space-y-0 space-y-2">
                  <input type="hidden" name="_token" value="LiXiqw89YKvTlRwnFj3yqEA8d3ZN7kRluSBgKY6j" autoComplete="off" />
                  <input className="flex-1 border border-gray-300 rounded px-3 py-2 text-black" type="email" name="email" placeholder="Your email address" required />
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto" type="submit">Send</button>
                </form>
                <div className="text-red-500 text-sm"></div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="text-center py-4 border-t border-gray-700">
              <p className="mb-0 font-medium">Copyrights &copy; 2025. All Rights Reserved by The Travel Bug Tourism. Design & Developed by <strong className="text-blue-400"><a href="https://impliestechnologies.in" target="_blank">Rahul Dogney</a></strong></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <a href="https://wa.me/918085864565?text=Welcome To Travel Bug Tourism" className="float" target="_blank">
      <FontAwesomeIcon icon={faWhatsapp} className="w-6 h-6" />
    </a>
    <BackToTopButton />
    </>
  );
};

export default Footer;