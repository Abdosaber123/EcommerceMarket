import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { p, span } from "motion/react-client";
import { X } from "lucide-react";
import empty from "../assets/image/ae8ac2fa217d23aadcc913989fcc34a2.PNG"
function getDayMonthYear(dateString = null) {
  // لو مررنا تاريخ من الباك نستخدمه، غير كده نستخدم تاريخ اليوم
  const date = dateString ? new Date(dateString) : new Date();

  // لو التاريخ مش صالح
  if (isNaN(date.getTime())) return "";

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const useUTC = Boolean(dateString);

  const day = useUTC ? date.getUTCDate() : date.getDate();
  const month = useUTC ? months[date.getUTCMonth()] : months[date.getMonth()];
  const year = useUTC ? date.getUTCFullYear() : date.getFullYear();

  return `${day}${month} ${year}`;
}
export default function GetDetailsOrderUser() {
  const token = Cookies.get("token");
  const [getData, setData] = useState({});
  const [openProduct, setOpenPorudct] = useState(false);
  async function getOrder() {
    try {
      const { data } = await axios.get("http://localhost:3000/order/user", {
        headers: { Authorization: token },
      });
      console.log(data);
      setData(data);
    } catch (error) {
      console.log(error.response.data);
    }
  }
 
  useEffect(() => {
    getOrder();
  }, []);
  return (
    <div className="container mt-24 overflow-hidden ">
        {!getData &&
       <div className="flex justify-center">
        <img src={empty} alt="" srcset="" />
       </div>
        }
      {getData && <>
      <div className="sm:flex hidden  justify-center">
        <div className="flex justify-between md:w-[80%] xl:w-[50%]  border-2 rounded-xl px-3">
          <div className="all details gap-10   flex">
            <div className="1 ">
              <p className="font-semibold">Date Placed</p>
              <p className="text-gray-400">
                {getDayMonthYear(getData.createdAt)}
              </p>
            </div>
            <div className="2">
              <p className="font-semibold">Order status</p>
              <p className="text-gray-400">
                {getData.orderStatus == "CANCELLED" ? (
                  <span className="bg-red-600 text-white rounded-lg px-2">
                    CANCELLED
                  </span>
                ) : (
                  <span className=" rounded-lg px-2 text-white bg-green-600">
                    {getData.orderStatus}
                  </span>
                )}
              </p>
            </div>
            <div className="3">
              <p className="font-semibold">Total Amount</p>
              <p className="text-green-500">{getData.totalAmount}</p>
            </div>
          </div>
          <div className="view order sm:ml-4">
            <p>Details Order</p>
            <p className="text-center bg-slate-300 rounded-md cursor-pointer"
              onClick={() => {
                setOpenPorudct(!openProduct);
              }}
            >
              view
            </p>
          </div>
        </div>
      </div>
     <div className="overflow-hidden">
       <div className="overflow-hidden">
        { (
          <div
            className={`group product transition-all border-black/50 duration-500 rounded-lg border-2 px-5 z-40 bg-white absolute top-[20%] right-[30%] mt-3 left-[35%] 
        ${openProduct ? "opacity-100" : "opacity-0 translate-x-[85%]"}
        `}
          >
            <div className="flex justify-end mt-2 text-red-700">
              <p
                className="cursor-pointer"
                onClick={() => {
                  setOpenPorudct(!openProduct);
                }}
              >
                
                <X />
              </p>
            </div>
            {getData.product?.map((data) => (
              <div className=" all py-2 ">
                <div className="md:flex md:flex-col md:items-center md:justify-center  px-4">
                  <img
                    className="md:w-[20%] "
                    src={data?.productId?.photo.secure_url}
                    alt=""
                    srcset=""
                  />
                  <p className=" font-bold py-2">
                    {data?.productId?.name}
                  </p>
                </div>
                <p className=" text-center text-2xl text-green-400 font-bold border-b-2 mb-2 py-2">
                  {data?.productId?.price} EGP
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
     </div>
      <div className="sm:hidden">
        <p className="font-semibold">Date Placed <span className="text-gray-400 font-normal">{getDayMonthYear(getData.createdAt)}</span></p>
        <p className="font-semibold mt-3">Order Status <span> {getData.orderStatus == "CANCELLED" ? (
                  <span className="bg-red-600 text-white rounded-lg px-2">
                    CANCELLED
                  </span>
                ) : (
                  <span className=" rounded-lg px-2 text-white bg-green-600">
                    {getData.orderStatus}
                  </span>
                )}</span></p>
        <p className="font-semibold mt-3">Total Amount <span></span>{getData.totalAmount}</p>
        <button  onClick={() => {
                setOpenPorudct(!openProduct);
              }} className="bg-slate-300 rounded-md px-4 mt-2 ">View Order</button>
      </div>
      </>}
    </div>
  );
}
