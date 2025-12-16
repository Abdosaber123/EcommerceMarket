import axios from "axios";
import { useFormik } from "formik";
import { Minus, Plus, Trash, Trash2 } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading.jsx";
import impty from "../assets/image/11329060.png";
import Cookies from "js-cookie";
import { userRipo } from "./context/UserProvider.jsx";

export default function Cart() {
  const [trigger, setTrigger] = useState(0);
  const [product, setProduct] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [loading, isLoading] = useState(false);
  const token = Cookies.get("token");
  const nav = useNavigate();
  async function getCart() {
    isLoading(true);
    try {
      const { data } = await axios.get("http://localhost:3000/cart", {
        headers: { authorization: token },
      });
      setProduct(data.data.productId);
      console.log(data.data);
    } catch (error) {
      console.log(error);
      isLoading(false);
    } finally {
      isLoading(false);
    }
  }
  async function clearAll() {
    try {
      isLoading(true);
      const { data } = await axios.put(
        "http://localhost:3000/cart/clear-ALL",
        null,
        {
          headers: { authorization: token },
        }
      );
      console.log(data);
      toast.success(data.Message);
      setTrigger((prev) => prev + 1);
    } catch (error) {
      isLoading(false);
      console.log(error);
    } finally {
      isLoading(false);
    }
  }
  async function deleteCart(id) {
    try {
      isLoading(true);
      const { data } = await axios.put(
        `http://localhost:3000/Cart/${id}`,
        null,
        {
          headers: { authorization: token },
        }
      );
      toast.success(data.Message);
      setTrigger((prev) => prev + 1);
    } catch (error) {
      isLoading(false);
    } finally {
      isLoading(false);
    }
  }
  async function addOrder(value) {
    try {
      isLoading(true);
      const { data } = await axios.post("http://localhost:3000/order", value, {
        headers: { authorization: token },
      });
      toast.success(data.Message);
      setTrigger((prev) => prev + 1);
      setTimeout(() => {
        nav("/");
      }, 2000);
    } catch (error) {
      console.log(error);
      isLoading(false);
    } finally {
      isLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      address: {
        street: "",
        city: "",
        country: "",
        zipCode: "",
        phoneNumber: "",
      },
      PaymentMethod: "",
    },
    onSubmit: addOrder,
  });
  // console.log(select);
  useEffect(() => {
    getCart();
  }, [trigger]);
  if (loading) return <Loading />;
  if (product.length == 0) {
    console.log("leantg 0");
    return (
      <div className="flex caret-transparent justify-center items-center py-3">
        <img src={impty} alt="" srcset="" />
      </div>
    );
  }
  // console.log(select);

  return (
    <div className="container caret-transparent overflow-x-hidden mt-20 ">
      <p className="text-center text-2xl font-bold">Cart</p>
      <div className="mt-10">
        
            <table className="hidden md:table md:w-full text-sm text-left rtl:text-right  ">
              <thead className="text-xs  uppercase   ">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              {product.map((data) => (
          <>
              <tbody>
                <tr class=" ">
                  <td className="p-4">
                    <img
                      src={data.productId.photo.secure_url}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt="Apple Watch"
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold dark:text-black  ">
                    {data.productId.name}
                  </td>

                  <td className="px-6 py-4 font-semibold text-red-600 dark:text-red-500  ">
                    <p className="text-yellow-500 font-bold text-xl mt-3">
                      {data.quantity
                        ? data.quantity * data.productId.price
                        : data.productId.price}
                      EGP
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p
                      onClick={() => {
                        deleteCart(data.productId._id);
                      }}
                      className="font-medium text-red-600 cursor-pointer "
                    >
                      <Trash />
                    </p>
                  </td>
                </tr>
              </tbody>
               </>
        ))}
            </table>
            {product.map((data)=>(
              <div className="md:hidden">
              <img src={data.productId.photo.secure_url} className="w-[200px] mx-auto mt-3" alt="" srcset="" />
              <p className="text-center mt-2 font-bold text-2xl">{data.productId.name}</p>
              <p className="text-yellow-500 font-bold text-center text-xl mt-3">
                {data.quantity
                  ? data.quantity * data.productId.price
                  : data.productId.price}
                EGP
              </p>
             <div className="flex justify-center mt-5">
               <p
                onClick={() => {
                  deleteCart(data.productId._id);
                }}
                className="font-medium  text-red-600 cursor-pointer "
              >
                <Trash />
              </p>
             </div>
            </div>
            ))}
         
        {product.length > 0 && (
          <div className="flex flex-col gap-2  md:flex-row md:justify-between md:px-14 px-20 mt-5 ">
            <button
              onClick={clearAll}
              type="submit"
              className=" bg-red-500 py-3 px-5 rounded-2xl text-white font-bold"
            >
              Clear All
            </button>
            <button
              onClick={() => {
                setOpen(!isOpen);
              }}
              type="submit"
              className=" bg-green-500 py-3 px-5 rounded-2xl text-white font-bold"
            >
              Create Order
            </button>
          </div>
        )}

        <div
          className={`px-3 border-2 w-[40%] mx-auto py-2 rounded-2xl transition-all duration-500 mt-5
    ${isOpen ? "translate-x-0 " : "translate-x-[300%]"}
  `}
        >
          <form
            onSubmit={formik.handleSubmit}
            className={`${isOpen ? "" : "hidden"}`}
          >
            <div className="">
              <label for="street" class="block mb-2 text-2xl font-bold  mt-3 ">
                Street
              </label>
              <input
                value={formik.values.address.street}
                onChange={formik.handleChange}
                name="address.street"
                type="text"
                id="address.street"
                placeholder="Your Adress"
                class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300   dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
              />
            </div>
            <div className="">
              <label for="city" class="block text-2xl font-bold py-2 ">
                Select an option
              </label>
              <select
                value={formik.values.address.city}
                onChange={formik.handleChange}
                id="address.city"
                name="address.city"
                class="text-xl  font-semibold rounded-xl bg-gray-500 px-4 text-gray-200 py-2 w-full "
              >
                <option selected>Choose a City</option>
                <option value="Alex">Alex</option>
                <option value="Cairo">Cairo</option>
                <option value="Monofya">Monofya</option>
                <option value="Domyat">Domyat</option>
              </select>
            </div>
            <div className="">
              <label for="country" class="block text-2xl font-bold py-2 ">
                Select Country
              </label>
              <select
                value={formik.values.address.country}
                onChange={formik.handleChange}
                id="address.country"
                name="address.country"
                class=" text-xl  font-semibold rounded-xl bg-gray-500 px-4 text-gray-200 py-2 w-full "
              >
                <option selected>Choose a Country</option>
                <option value="Egypt">Egypt</option>
                <option value="US">US</option>
                <option value="Oman">Oman</option>
                <option value="QATER">QATER</option>
              </select>
            </div>
            <div className="">
              <label
                for="zipCode"
                class="block mb-2 text-2xl font-bold py-2 mt-3 "
              >
                zipCode
              </label>
              <input
                value={formik.values.address.zipCode}
                onChange={formik.handleChange}
                type="number"
                name="address.zipCode"
                id="address.zipCode"
                placeholder="Your zipCode"
                class="w-full px-3 py-3 placeholder-black border-black rounded-2xl  border  "
              />
            </div>
            <div className="">
              <label
                for="phoneNumber"
                class="block mb-2 text-2xl font-bold py-2  mt-3 "
              >
                Phone Number
              </label>
              <input
                value={formik.values.address.phoneNumber}
                onChange={formik.handleChange}
                type="number"
                name="address.phoneNumber"
                id="address.phoneNumber"
                placeholder="Your PhoneNumber"
                class="w-full px-3 py-3 placeholder-black border-black rounded-2xl  border"
              />
            </div>
            <div className="">
              <label for="countries" class="block text-2xl font-bold py-2 ">
                Select Payment
              </label>
              <select
                value={formik.values.PaymentMethod}
                onChange={formik.handleChange}
                id="PaymentMethod"
                name="PaymentMethod"
                class=" text-xl  font-semibold rounded-xl bg-gray-500 px-4 text-gray-200 py-2 w-full "
              >
                <option selected>Select Payment</option>
                <option value="US">COD</option>
                <option value="CA">CREDIT_CARD</option>
              </select>
            </div>
            <div className="flex justify-center items-center py-2">
              <button
                type="submit"
                onClick={() => {
                  setOpen(false);
                }}
                className="bg-green-600 text-white py-3 px-5 rounded-2xl mt-3"
              >
                {" "}
                Creat Order{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
