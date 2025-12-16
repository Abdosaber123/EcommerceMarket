import React, { useEffect, useState } from "react";
import baskot from "../assets/image/001_tq-7622201699307.JPEG"
import Stationery from "../assets/image/school-student-stationary-supplies-shelf_3446-469.AVIF"
import Drinks from "../assets/image/Pepsi-Cola-Soda-Pop-16-fl-oz-Bottle_101a1793-30d7-456c-a6be-5552ab7e0dda.2ff2bd6bdf4c4ffa8c170877445283d5.AVIF"
import Nescafe from "../assets/image/NESCAFE3in1CLASSICbag10x15.5g.JPG"
import chipse from "../assets/image/resized_ahr0chm6ly9hc2hpywutynvja2v0lnmzlmv1lxdlc3qtmy5hbwf6b25hd3muy29tl3byb2r1y3rzl3ewb050njrrrdherzfvb3jnek9asnk2uuximus0mhzvutv2txdsqvmucg5n.PNG"
import axios from "axios";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import Loading from "./Loading.jsx";
export default function ShopByCategory() {
  const [dataCategory , setDataCategory] = useState([])
  const [loading , isLoading] = useState(false)
  async function getCategory(){
    isLoading(true)
   try {
     const {data} = await axios.get("http://localhost:3000/category")
    //  console.log(data.data);
     setDataCategory(data.data)
     
   } catch (error) {
    isLoading(false)
   }finally{
    isLoading(false)

   }
  }

useEffect(()=>{
  getCategory()
},[])
 if(loading) return <Loading />;
 const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear"
  };
  return (
  <div className="py-20 container caret-transparent">
    <h1 className="font-bold text-center text-3xl mb-6 ">Category</h1>
   <div className="flex flex-wrap  items-center justify-center md:justify-start gap-2 text-center cursor-pointer px-4">
   
    {dataCategory.map((data)=>(
     
      <Link to={`/CategoryDetails/${data._id}/${data.slug}`} className="  flex flex-col items-center md:w-[18%]  border-2 px-3 py-3 rounded-2xl   hover:scale-95 transition-all  ">
        <img src={data.photo.secure_url} className="w-[100px]" alt="" />
        {/* <p className="font-bold text-xl py-2">{
        data.name == "dwrytws"? "Doretoz":data.name
        
        }</p> */}
    </Link>

    ))}
    
   </div>
  
  </div>
);
}
