import { CircleUserRound, LogOut, Menu, X } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userRipo } from "./context/UserProvider.jsx";
import Cookies from "js-cookie";
export default function Navbar() {
  const {   userAdmin, setToken, setUserAdmin  } =
    useContext(userRipo);
  const [isOpen, setOpen] = useState(false);
  const [isOpenNav, setOpenNav] = useState(false);
  const role = Cookies.get("Role")
  const userfullName = Cookies.get("fullName")
  const token = Cookies.get("token")
  function logOut() {
    localStorage.removeItem("token");
    setToken(null);
    setUserAdmin("");
    Cookies.remove("token")
    Cookies.remove("Role")
    Cookies.remove("fullName")
    setOpen(false);
  }



  return (
    <div className="section caret-transparent">
      <div className="container">
        <div className="hidden   navbar px-3 md:flex fixed top-0 right-0 left-0 bg-white z-50  justify-between items-center py-3 md:mb-10">
          <div className="logo">
            <Link to={"/"} className=" abdoMarket font-bold text-3xl text-blue-800">Market Abdo</Link>
          </div>
          <div className="Links  ">
            <Link
              to={"/"}
              className="  focus:bg-[#F7411B] focus:text-white rounded-2xl px-4 py-2 font-bold  text-black mr-3 "
            >
              Home
            </Link>
            <Link
              to={"/prodcut"}
              className=" focus:bg-[#F7411B] focus:text-white rounded-2xl font-bold px-4 py-2 text-black mr-3 "
            >
              Prodcut
            </Link>
            {/* <Link
              to={"/blog"}
              className=" focus:bg-[#F7411B] focus:text-white rounded-2xl px-4 py-2 font-bold text-black mr-3 "
            >
              Blog
            </Link> */}
            <Link
              to={"/cart"}
              className=" focus:bg-[#F7411B] focus:text-white rounded-2xl px-4 py-2 font-bold text-black mr-3 "
            >
              Cart 
              
             
            </Link>
            {role == "Admin" && (
              <Link
                to={"/Admin"}
                className=" focus:bg-[#F7411B] focus:text-white rounded-2xl px-4 py-2 font-bold text-black mr-3 "
              >
                Admin
              </Link>
            )}
          </div>
          {token && (
            <div
              onClick={() => {
                setOpen(!isOpen);
              }}
              className="login flex items-center relative "
            >
              <div className="h-12 w-12 rounded-full border mr-6 cursor-pointer flex justify-center items-center">
                <CircleUserRound size={25} />
              </div>
              
                <div className={`Grpup absolute top-12 transition-all duration-300 rounded-2xl px-3 py-4 right-7 bg-white border-2 w-[200px]
                ${isOpen? "translate-x-0 ":"translate-x-[200%] transition-all"}
                `}>
                  <p className="border-b-2 py-2 mb-2">
                    Hello <span className="text-[#0255B3] font-bold">
                      {userfullName ? userfullName : ""}
                    </span>
                  </p>
                  <div className="border-b-2 py-2 mb-4 cursor-pointer hover:text-blue-600 transition-all">
                    <Link to={"/Details-order"} className="">Details Order</Link>
                  </div>
                  <div className="flex items-center cursor-pointer gap-2 text-red-600 font-bold hover:translate-x-3 transition-all">
                    <button onClick={logOut} className="">
                      Log Out
                    </button>
                    <p>
                      <LogOut />
                    </p>
                  </div>
                </div>
             
            </div>
          )}
          {!token && (
            <Link
              to={"/login"}
              className=" bg-black text-white py-3 px-8 rounded-3xl "
            >
              Login
            </Link>
          )}
        </div>
          <div className="navbar abdoMarket md:hidden px-3 flex fixed top-0 right-0 left-0 bg-white z-50  justify-between items-center py-3 md:mb-10">
          <div className="logo">
            <Link to={"/"} className="font-bold text-3xl text-blue-800">Market Abdo</Link>
          </div>
          <p className="cursor-pointer" onClick={()=>{
            setOpenNav(!isOpenNav)
          }}>
          {isOpenNav ? <p onClick={()=>{
            setOpen(false)
          }}><X /></p>:<Menu />}  
          </p>
        </div>
        <div className={`absolute md:hidden flex flex-col z-50 border-2 h-[889px] px-5 left-1 top-0 bg-white transition-all duration-300
        ${isOpenNav?"translate-x-0":"-translate-x-96"}
        `} >
          <div className="Links flex flex-col mt-3   ">
            <Link
              to={"/"}
              className="  focus:bg-[#F7411B] focus:text-white rounded-2xl px-4 py-2 font-bold  text-black mr-3 "
            >
              Home
            </Link>
            <Link
              to={"/prodcut"}
              className=" focus:bg-[#F7411B] focus:text-white rounded-2xl font-bold px-4 py-2 text-black mr-3 "
            >
              Prodcut
            </Link>
            {/* <Link
              to={"/blog"}
              className=" focus:bg-[#F7411B] focus:text-white rounded-2xl px-4 py-2 font-bold text-black mr-3 "
            >
              Blog
            </Link> */}
            <Link
              to={"/cart"}
              className=" focus:bg-[#F7411B] focus:text-white rounded-2xl px-4 py-2 font-bold text-black mr-3 "
            >
              Cart 
              
             
            </Link>
            {role == "Admin" && (
              <Link
                to={"/Admin"}
                className=" focus:bg-[#F7411B] mb-4 focus:text-white rounded-2xl px-4 py-2 font-bold text-black mr-3 "
              >
                Admin
              </Link>
            )}
          </div>
        <div className="token">
            {token && (
            <div
              onClick={() => {
                setOpen(!isOpen);
              }}
              className="login flex items-center relative "
            >
              <div className="h-12 w-12 rounded-full border mr-6 cursor-pointer flex justify-center items-center">
                <CircleUserRound size={25} />
              </div>
              
                <div className={`Grpup absolute top-12 transition-all duration-300 rounded-2xl px-3 py-4  bg-white border-2 w-[200px]
                ${isOpen? " translate-x-0":"-translate-x-96 "}
                `}>
                  <p className="border-b-2 py-2 mb-2">
                    Hello{" "}
                    <span className="text-[#0255B3] font-bold">
                      {userfullName ? userfullName : ""}
                    </span>
                  </p>
                  <div className="border-b-2 py-2 mb-4 cursor-pointer hover:text-blue-600 transition-all">
                    <Link to={"/Details-order"} className="">Details Order</Link>
                  </div>
                  <div className="flex items-center cursor-pointer gap-2 text-red-600 font-bold hover:translate-x-3 transition-all">
                    <button onClick={logOut} className="">
                      Log Out{" "}
                    </button>
                    <p>
                      <LogOut />
                    </p>
                  </div>
                </div>
             
            </div>
          )}
          {!token && (
            <Link
              to={"/login"}
              className=" bg-black text-white py-3 px-8 rounded-3xl "
            >
              Login
            </Link>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}
