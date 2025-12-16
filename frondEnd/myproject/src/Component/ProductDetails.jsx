import axios from "axios";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import Loading from "./Loading.jsx";
import Cookies from "js-cookie";
export default function ProductDetails() {
  const [getData, setData] = useState({});
  const [getslug, getDataSlug] = useState([]);
  const { id, slug } = useParams();
  const [count, setCount] = useState(1);
  const [del, setDel] = useState(0);
  const [loading, isLoading] = useState(false);
  const [search, setSearch] = useState("");
  const token = Cookies.get("token")


 

  function getCount() {
    setCount((prev) => prev + 1);
  }
  function minusCount() {
    setCount((prev) => {
      if (prev <= 1) {
        setDel(0); // لو وصل صفر يتم تفعيل del
        return 0; // خلي العدّاد يقف عند 0
      }
      return prev - 1;
    });
  }
  const firstWord = slug.split("-")[0];
  async function getProduct() {
    try {
      isLoading(true);
      const { data } = await axios.get(`http://localhost:3000/product/${id}`);
      // console.log(data.data);

      setData(data.data);
    } catch (error) {
      isLoading(false);
    } finally {
      isLoading(false);
    }
  }
  async function getProductBySlug() {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/product/search/${id}?name=${firstWord}`
      );
      getDataSlug(data.data);
      // console.log(data.data);
    } catch (error) {
      console.log(error.message);
    }
  }
  async function addToCart() {
    try {
      isLoading(true);
      const { data } = await axios.post(
        `http://localhost:3000/Cart`,
        {
          productId: id,
          quantity: count,
        },
        { headers: { authorization: token} }
      );
      toast.success(data.Message);
    } catch (error) {
      console.log(error);
      toast.error("Go Login First to add Prodcut")
      isLoading(false);
    } finally {
      isLoading(false);
    }
  }

  useEffect(() => {
    getProduct();
    getProductBySlug();
  }, [id]);
  if (loading) return <Loading />;
  return (
    <div className="container caret-transparent mt-20 py-5">
      <div className="md:flex md:flex-row  gap-3">
        <div className="img md:w-[40%] flex justify-center border-2 rounded-2xl ">
          <img
            className="md:w-[80%] w-[50%]"
            src={getData?.photo?.secure_url}
            alt=""
            srcset=""
          />
        </div>
        <div className="text md:w-[60%] text-right py-2 px-3">
          <p className="font-bold text-3xl mb-4">{getData.name}</p>
          <p className="mb-4">{getData.description}</p>
          <p className="text-3xl mb-4 text-yellow-300 text-left">
            {getData.price} EGP
          </p>
          <div className="flex gap-2 justify-end items-center">
            <button className="border-2  rounded-2xl" type="button">
              {" "}
              <Minus onClick={minusCount} />
            </button>
            <p className="text-2xl  px-5">{count}</p>
            <button className="border-2  rounded-2xl" type="button">
              {" "}
              <Plus onClick={getCount} />
            </button>
          </div>
          <div
            onClick={addToCart}
            className="flex justify-center cursor-pointer bg-[#1CAD7A]  py-2 mt-2 px-8 rounded-2xl hover:translate-x-2 transition-all
               text-white hover:bg-[#068059]  "
          >
            <button className=" ">Add To Cart</button>
            <p className="ml-2">
              <ShoppingCart />
            </p>
          </div>
        </div>
      </div>
      <h1 className="text-3xl font-bold text-center py-3">More Product</h1>
      <div className="container">
        <div className=" py-2 flex md:gap-6 gap-2  flex-wrap ">
          {getslug.map((data) => (
            <Link
              to={`/ProductDetails/${data.id}/${data.slug}`}
              className="sm:w-[48%] lg:w-[23%] md:w-[48%] border-2 px-5 py-4 flex flex-col  rounded-2xl hover:scale-105 transition-all "
            >
              <img
                className="w-[150px] mx-auto"
                src={data.photo.secure_url}
                alt=""
              />
              <p className=" font-bold text-center text-xl py-2">{data.name}</p>
              <p className="text-right text-[#6FD181]">{data.price} EGP</p>
              <p className=" text-sm font-bold py-2 text-right  overflow-hidden">
                {data.description.split(" ").slice(0, 10).join(" ")}...
              </p>
              <div
                className="flex justify-center bg-[#1CAD7A]  py-2 mt-2 px-8 rounded-2xl hover:translate-x-2 transition-all
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
    </div>
  );
}
