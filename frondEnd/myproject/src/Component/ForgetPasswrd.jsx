import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading.jsx";

export default function ForgetPasswrd() {
    const [email , setEmail] = useState("")
    const [otp , setOtp] = useState("")
    const [password , setPassword] = useState("")
    const [openOtp , setOpenOtp] = useState(false)
    const [loading , setLoading] = useState(false)
    const nav = useNavigate()

    async function sendOtp() {
        try {
          setLoading(true)
            const {data} = await axios.post("http://localhost:3000/auth/resendOtp",{
                email
            })
            console.log(data);
            toast.success(data.Message)
            setOpenOtp(true)
        } catch (error) {
            toast(error.response.data.message)
            setOpenOtp(false)
            setLoading(false)
        }finally{
          setLoading(false)
        }
    }
    async function forgetPassword() {
        try {
          setLoading(true)

            const {data} = await axios.post("http://localhost:3000/auth/forgetPassword" , {
                email,
                otp,
                password
            })
            toast.success(data.Message)
            setTimeout(()=>{
                nav("/login")
            },2000)
        } catch (error) {
            toast(error.response.data.message)
          setLoading(false)

            
        }finally{
          setLoading(false)

        }
    }
if(loading) return <Loading />

  return (
    <div class=" bg-white flex flex-col items-center justify-center h-[816px] rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
      <div class="p-4 sm:p-7">
        <div class="text-center">
          <h1 class="block text-2xl font-bold text-gray-800 dark:text-white">
            Forgot password?
          </h1>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Remember your password?
            <Link
              class="text-blue-600 decoration-2 hover:underline font-medium"
              to={"/login"}
            >
              Login here
            </Link>
          </p>
        </div>

        <div class="mt-5">
          <form>
            <div class="grid gap-y-4">
              <div>
               
                <label
                  for="email"
                  class="block text-sm font-bold ml-1 mb-2 dark:text-white"
                >
                  Email address
                </label>
                
                <div className="email relative py-2">
                  <input
                  onChange={(e)=>{
                    setEmail(e.target.value)
                  }}
                    type="email"
                    id="email"
                    name="email"
                    className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                    required
                    aria-describedby="email-error"
                    value={email}
                  />
                </div>
               {openOtp && <>
                <label
                  for="otp"
                  class="block text-sm font-bold ml-1 mb-2 dark:text-white"
                >
                  OTP 
                </label>
                <div className="otp relative py-2">
                  <input
                    onChange={(e)=>{
                    setOtp(e.target.value)
                  }}
                    type="text"
                    id="otp"
                    name="otp"
                    placeholder="Inter OTP"
                    className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                    required
                    aria-describedby="email-error"
                  />
                 
                </div>
                <label
                  for="password"
                  class="block text-sm font-bold ml-1 mb-2 dark:text-white"
                >
                  Password
                </label>
                <div className="password relative">
                  <input
                  onChange={(e)=>{
                    setPassword(e.target.value)
                  }}
                  placeholder="inter new Password"
                    type="password"
                    id="password"
                    name="password"
                    className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                    required
                    aria-describedby="email-error"
                  />
                </div>
               </>}
              </div>
              {!openOtp &&
              <button
              onClick={(e)=>{
                e.preventDefault()
                sendOtp()
              }}
                type=""
                className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
              >
                sendOtp
              </button>}
               {openOtp &&
               <button
               onClick={(e)=>{
                e.preventDefault()
                forgetPassword()
              }}
                type=""
                className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
              >
                New password
              </button>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
