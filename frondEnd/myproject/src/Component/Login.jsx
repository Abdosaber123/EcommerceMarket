import React, { useContext, useState } from "react";
import { Formik, useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { fadeIn } from "./Utily/montion.js";
import toast from "react-hot-toast";
import { userRipo } from "./context/UserProvider.jsx";
import Loading from "./Loading.jsx";
import { CircleX } from "lucide-react";
import Cookies from "js-cookie";
import { object, string } from "yup";
export default function Login() {
  let [isLoading, setLoading] = useState(false);
  let [errorMsg, setErrorMsg] = useState(false);
  const { setToken, setUserAdmin, setUserFullName } = useContext(userRipo);
  const nav = useNavigate();
  async function hundelLogin(value) {
    try {
      setLoading(true);
      let { data } = await axios.post(
        `http://localhost:3000/auth/login`,
        value
      );

      setToken(data?.data?.token);
      Cookies.set("token", data?.data?.token);
      localStorage.setItem("token", data?.data?.token);
      // setUserAdmin(data?.data?.userObj?.role);
      Cookies.set("Role", data?.data?.userObj?.role);
      Cookies.set("fullName", data?.data?.userObj?.fullName);
      nav("/");
    } catch (error) {
      console.log(error);
      setErrorMsg(error.response.data.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }
  const validateSchema = object().shape({
    email: string().email().required("Cheack Email"),
    password: string().required("Cheack Password"),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    }, validateSchema,
    onSubmit: hundelLogin,
  });

  function hundelRefrch(e) {
    e.preventDefault();
    formik.handleSubmit;
  }
  if (isLoading) return <Loading />;
  return (
    <div className="page relative bg-slate-500 ">
      <div className="container ">
        <div className="parent flex md:justify-between justify-center  items-center h-screen   ">
          <motion.div
            variants={fadeIn("right", 0.5)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="left hidden md:block lg:px-[90px] 2xl:px-32 bg-blue-500 xl:px-10 text-white py-40 md:rounded-r-md xl:py-[235px] rounded-s-3xl   "
          >
            <h3 className="font text-5xl text-center py-5  hover:ml-10 duration-200  hover:text-gray-300  ">
              Welcome Back!
            </h3>
            <p className=" text-2xl text-center">
              we can sign in to access with your exiting account
            </p>
          </motion.div>
          <motion.div
            variants={fadeIn("left", 0.7)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="right xl:px-[147px] py-5 px-2 xl:py-[125px] 2xl:px-[207px] sm:py-16 md:rounded-r-3xl rounded-xl md:rounded-l-none bg-white 
            lg:px-11
            "
          >
            <h1 className="text-4xl text-gray-800 font-bold mb-3 text-center relative after:absolute after:bg-red-700 after:w-0 after:h-1 after:-bottom-2 after:left-10 after:right-6 hover:after:w-56 hover:after:duration-500 ">
              Login in
            </h1>

            <form
              action=""
              onSubmit={formik.handleSubmit}
              className="flex flex-col"
            >
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
              {errorMsg && (
                <div className="mb-2 flex bg-red-300 text-red-900  font-bold py-2 border-2 border-b-black  px-2 rounded-md gap-1">
                  <p className="text-wh">
                    <CircleX />
                  </p>
                  <p className=""> {errorMsg}</p>
                </div>
              )}
              <div className="flex justify-between">
                <div className="flex"></div>
                <div className="text-blue-600">
                  <Link to={"/forgetPassword"}>Forgot Password?</Link>
                </div>
              </div>
              {formik.errors.password && <div>
                <p>{formik.errors.password}</p>
                </div>}
              <button
                type="submit"
                onSubmit={hundelLogin}
                className="bg-blue-600 rounded-full mt-7 text-white px-5 py-3"
              >
                Sign In
              </button>
              <p className="mt-5 text-center">
                New here?{" "}
                <Link to={"/signUp"} className="text-blue-600">
                  Create an Account
                </Link>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
