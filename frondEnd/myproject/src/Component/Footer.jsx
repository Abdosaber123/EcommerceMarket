import { Facebook, FacebookIcon } from "lucide-react";
import React from "react";
import { FaFacebookF, FaLinkedin, FaTiktok } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { TypeAnimation } from "react-type-animation";

export default function Footer() {
  return (
    <div className="container mt-8 py-5">
      <h1 className="abdoMarket text-center text-xl border-t-2 pt-5"><TypeAnimation
  sequence={[
    'Abdo',
    500,
    'Abdo Saber', //  Continuing previous Text
    500,
    'Abdo Saber',
    500,
    'Abdo Saber',
    500,
    'Abdo',
    500,
    '',
    500,
  ]}
  style={{ fontSize: '2em' }}
  repeat={Infinity}
/></h1>
      <h1>

         
      </h1>
      <div className="mt-5 flex justify-center gap-7">
        <div className="h-14 w-14 rounded-full cursor-pointer hover:bg-blue-500 hover:text-white transition-all duration-200 border-2 flex justify-center items-center">
          <a target="_blank" href="https://www.facebook.com/AbdelrhmanSabrySaber/" className="text-3xl">
            <FaFacebookF />
          </a>
        </div>
        <div className="h-14 w-14 rounded-full cursor-pointer border-2 flex justify-center items-center hover:bg-[#FE0BB5] hover:text-white transition-all duration-200">
          <a href="https://www.instagram.com/abdosaberr24/" target="_blank" className="text-3xl">
            <IoLogoInstagram />
          </a>
        </div>
        <div className="h-14 w-14 rounded-full cursor-pointer border-2 flex justify-center items-center hover:bg-blue-500 hover:text-white transition-all duration-200">
          <a target="_blank" href="https://www.linkedin.com/in/blaza-cf-b2642a363/" className="text-3xl">
            <FaLinkedin />
          </a>
        </div>
        <div className="h-14 w-14 rounded-full cursor-pointer border-2 flex justify-center items-center hover:bg-black hover:text-white 
        transition-all duration-200">
          <a target="_blank" href="https://www.tiktok.com/@abdosaber235" className="text-3xl">
            <FaTiktok />
          </a>
        </div>
      </div>
      <p className="text-center text-black/70 mt-5">Copyright @2025 All rights reserved | This Template is made by <span className="font-semibold text-black">Abdelrhman Sabry</span></p>
    </div>
  );
}
