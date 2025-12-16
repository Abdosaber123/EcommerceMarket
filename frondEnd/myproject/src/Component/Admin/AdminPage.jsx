import {
  ChartColumnStacked,
  Menu,
  NotepadText,
  Pen,
  ShoppingCart,
  Users,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function AdminPage() {
  const [open , setOpen] = useState(false)
  return (
    <div className="container mt-24  ">
      <div className=" hidden group md:flex flex-col py-4 rounded-r-lg  border-r-2 border-b-2 border-t-2 h-[790px]  ">
        <Link
          to={"create-category"}
          className="flex py-3 text-sm hover:translate-x-3 gap-2 transition-all focus:bg-black focus:text-white md:px-3 rounded-2xl"
        >
          <ChartColumnStacked /> Create Category
        </Link>
        <Link
          to={"create-product"}
          className="flex py-3 hover:translate-x-5 transition-all gap-2 focus:bg-black focus:text-white md:px-3 rounded-2xl"
        >
          
          <ShoppingCart /> Create Product
        </Link>
        <Link
          to={"updateProduct"}
          className="flex py-3 hover:translate-x-5 transition-all lg:text-sm gap-2 focus:bg-black focus:text-white md:px-3 rounded-2xl"
        >
          <Pen /> Update Product
        </Link>
        <Link
          to={"all-order"}
          className="flex py-3 hover:translate-x-5 transition-all gap-2 focus:bg-black focus:text-white md:px-3 rounded-2xl"
        >
          
          <NotepadText /> Get All Order
        </Link>
        <Link
          to={"all-user"}
          className="flex py-3 hover:translate-x-5 transition-all gap-2 focus:bg-black focus:text-white md:px-3  rounded-2xl mt-1"
        >
          <Users /> Get All User
        </Link>
      </div>
      <div className="md:hidden">
        <div className="">
          <p className="cursor-pointer" onClick={()=>{
            setOpen(!open)
          }}>{open ? <X />:<Menu />}</p>
          
          <div onClick={()=>{
            setOpen(!open)
          }} className= {` duration-300 absolute bg-white z-50 px-3  transition-all h-[760px] mt-2 group rounded-r-xl   flex-col md:py-4  border-r-2 border-b-2 border-t-2  md:h-[790px] md:px-6
          ${open ? "opacity-100 translate-x-0 flex " : "opacity-0  -translate-x-[200px]"}
          `} >
        <Link
          to={"create-category"}
          className="flex py-3 hover:translate-x-3 gap-2 transition-all focus:bg-black focus:text-white md:px-3 rounded-2xl"
        >
          <ChartColumnStacked /> Create Category
        </Link>
        <Link
          to={"create-product"}
          className="flex py-3 hover:translate-x-5 transition-all gap-2 focus:bg-black focus:text-white md:px-3 rounded-2xl"
        >
          
          <ShoppingCart /> Create Product
        </Link>
        <Link
          to={"updateProduct"}
          className="flex py-3 hover:translate-x-5 transition-all gap-2 focus:bg-black focus:text-white md:px-3 rounded-2xl"
        >
          <Pen /> Update Product
        </Link>
        <Link
          to={"all-order"}
          className="flex py-3 hover:translate-x-5 transition-all gap-2 focus:bg-black focus:text-white md:px-3 rounded-2xl"
        >
          
          <NotepadText /> Get All Order
        </Link>
        <Link
          to={"all-user"}
          className="flex py-3 hover:translate-x-5 transition-all gap-2 focus:bg-black focus:text-white md:px-3  rounded-2xl mt-1"
        >
          <Users /> Get All User
        </Link>
      </div>
         
        </div>
      </div>
      
    </div>
  );
}
