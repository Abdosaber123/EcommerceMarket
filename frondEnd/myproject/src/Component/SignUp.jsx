import React, { useContext, useState } from "react";

import axios from "axios";
import { useFormik } from "formik";
import { CircleX, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn } from "./Utily/montion.js";
import Loading from "./Loading.jsx";
import useVerifyAccount from "./VerifyAccount.jsx";
import { userRipo } from './context/UserProvider';


export default function Home() {
  let [isLoading, setLoading] = useState(false);
    let [errorMsg, setErrorMsg] = useState(false);

  const nav = useNavigate()
  const {setEmail} = useContext(userRipo)
  async function hundelRegister(value) {
    setLoading(true);
    try {
      let { data } = await axios.post(`http://localhost:3000/auth`, value);
      console.log(data);
      setEmail(data.data.email)
      nav("/verify-account")
    } catch (error) {
      setLoading(false);
            setErrorMsg(error.response.data.message);

    } finally {
      setLoading(false);
      formik.resetForm()
    }
  }
  let formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      dob: "",
    },
    onSubmit: hundelRegister,
  });
  if(isLoading) return <Loading />;
  return (
    <div className="page relative bg-slate-500  ">
      <div className="container ">
        <div className="parent flex justify-between  items-center h-screen   ">
          <motion.div
            variants={fadeIn("right", 0.5)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="left hidden md:block bg-blue-500 xl:px-[43px] md:px-3 text-white py-[219px] md:rounded-r-md xl:py-[278px] rounded-s-3xl "
          >
            <h3 className="font text-5xl text-center py-3  hover:ml-10 duration-200 hover:text-gray-300 ">
              Welcome Back!
            </h3>
            <p className=" text-2xl text-center px-2 ">
              we can sign in to access with your exiting account
            </p>
          </motion.div>
          <motion.div
            variants={fadeIn("left", 0.7)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="right xl:px-36 md:px-5 md:py-3 py-5 px-2 xl:py-[70px] sm:px-14 sm:py-16 md:rounded-r-3xl rounded-xl md:rounded-l-none bg-white 
            lg:px-11"
          >
            <h1 className="text-4xl text-gray-800 font-bold mb-3 text-center ">
              Sign in
            </h1>
            <form
              action=""
              onSubmit={formik.handleSubmit}
              className="flex flex-col"
            >
              <input
                type="text"
                id="firstName"
                name="firstName"
                onChange={formik.handleChange}
                value={formik.values.firstName}
                onBlur={formik.handleBlur}
                placeholder=" First Name "
                className="mb-3 rounded-full w-[300px] py-3 mt-3 px-5 border-gray-300 border-2"
              />
              <input
                type="text"
                id="lastName"
                onChange={formik.handleChange}
                value={formik.values.lastName}
                onBlur={formik.handleBlur}
                placeholder=" lastName "
                className="mb-3 rounded-full w-[300px] py-3 mt-3 px-5 border-gray-300 border-2"
              />
              <input
                type="email"
                id="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                placeholder="Your Email"
                className="mb-3 rounded-full w-[300px] py-3 mt-3 px-5 border-gray-300 border-2"
              />
              <input
                type="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                placeholder="Password"
                className="mb-3 rounded-full w-[300px] py-3 mt-1 px-5 border-gray-300 border-2"
              />

              <input
                type="date"
                id="dob"
                onChange={formik.handleChange}
                value={formik.values.dob}
                placeholder=" Your Number"
                className="mb-3 rounded-full w-[300px] py-3 mt-3 px-5 border-gray-300 border-2"
              />

               {errorMsg && (
                <div className="mb-2 flex bg-red-300 text-red-900  font-bold py-2 border-2 border-b-black  px-2 rounded-md gap-1">
                  <p className="text-wh">
                    <CircleX />
                  </p>
                  <p className=""> {errorMsg}</p>
                </div>
              )}
              <button
                type="submit"
                className="bg-blue-600 rounded-full mt-7 text-white px-5 py-3"
              >
                Sign In
              </button>
              <p className="mt-5 text-center ">
                I Have An Account
                <Link to={"/login"} className="text-blue-600 ml-2">
                  Login
                </Link>
              </p>
            </form>
      
          </motion.div>
        </div>
      </div>
    </div>
    
  );
}
