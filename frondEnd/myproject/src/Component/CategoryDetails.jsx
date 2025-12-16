import axios from "axios";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";

export default function CategoryDetails() {
  const [prodId, setProductId] = useState(null);
  const [categoryData, getDataSlug] = useState([]);
  const [loading, isLoading] = useState(false);
  const [count, setCount] = useState(1);
  const [del, setDel] = useState(1);
  const { id, slug } = useParams();
  const firstWord = slug.split("-")[0];
  console.log(id, firstWord);
 
 
  async function getProductBySlug() {
    try {
      isLoading(true)
      const { data } = await axios.get(
        `http://localhost:3000/product/search/${id}?name=${firstWord}`
      );
      getDataSlug(data.data);
      console.log(data.data);
      
      console.log(data.data._id);
    } catch (error) {
      console.log(error.message);
      isLoading(false)

    }finally{
      isLoading(false)

    }
  }

  useEffect(() => {
    getProductBySlug();
    
  }, []);

  return (
    <div className="container mt-24 caret-transparent">
      <div className=" py-2 flex md:gap-6 gap-2  flex-wrap ">
        {categoryData.map((data) => (
          <Link  to={`/ProductDetails/${data._id}/${data.slug}`}
          onClick={()=>{
            setProductId(data._id)
          }}
          className="group sm:w-[48%] lg:w-[23%] md:w-[30%] border-2 px-5 py-4 flex flex-col  rounded-2xl hover:scale-105 transition-all  ">
            <img className=" w-[160px] mx-auto" src={data.photo.secure_url} alt="" />
            <p className="text-center font-bold text-xl py-2">{data.name}</p>
            
            

            <p className="text-right font-bold text-2xl text-[#6FD181]">
              {data.price} EGP
            </p>
            <p className=" text-sm py-2 text-right">  {data.description.split(" ").slice(0, 10).join(" ")}...</p>
            
           <div
                         className="flex justify-center translate-y-16 opacity-0  bg-[#1CAD7A] group-hover:translate-y-0 group-hover:opacity-100  py-2 mt-2 px-8 rounded-2xl hover:translate-x-2 transition-all
                          text-white hover:bg-[#068059]  "
                       >
                         <button className=" "> Details</button>
                         <p className="ml-2">
                           <ShoppingCart />
                         </p>
                       </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
