import { useContext, useEffect, useRef, useState } from "react";
import imgEmail from "../assets/image/email.PNG"
import { userRipo } from "./context/UserProvider.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading.jsx";
import Cookies from "js-cookie";

export default function VerifyAccount() {
  const { emailUser } = useContext(userRipo);
  const [otp, setOtp] = useState("");
  const inputs = useRef([]);
  const nav = useNavigate()
  const [loading ,setLoading] = useState(false)
  const token = Cookies.get("token")


  const handleInput = (e, index) => {
    const value = e.target.innerText;
   
      if (value.length > 1) {
      e.target.innerText = value.charAt(0);
    }
    // لو اتكتب رقم → روح للإندكس اللي بعده
    if (value.length === 1 && index < 4) {
      inputs.current[index + 1].focus();
    }

    // لو استخدم Backspace → ارجع للخانة اللي قبلها
    if (value.length === 0 && index > 0) {
      inputs.current[index - 1].focus();
    }
  };
 
  
  
  async function verifyAccount() {
    const newOtp = getOTPValue()
    try {
          setLoading(true)

      const {data} = await axios.post("http://localhost:3000/auth/IsVerifye" , {
      email:emailUser,
      otp:newOtp
    })
    console.log(data);
    toast.success(data.Message)
    setTimeout(()=>{
      nav('/')
    },2000)
    
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message)
          setLoading(false)

    }finally{
          setLoading(false)

    }
  }
  
  const getOTPValue = () => {
    return inputs.current.map((el) => el.innerText).join("");
  
  };
useEffect(()=>{
  if(token){
    nav('/')
  }
},[])
if(loading) return <Loading />
  return (
    <div className="parent relative flex">
      <div className="w-[50%] bg-[#E6F2FF] h-[870px]"></div>
      <div className="w-[50%] bg-[#1F1F70] h-[870px]"></div>
      <div className="absolute top-[8%] right-[2%] left-[2%] bottom-10 bg-white h-[750px]">
        <div className="flex flex-col items-center">
          <img src={imgEmail} className="w-[200px]" alt="" srcset="" />
          <h1 className="text-3xl font-bold">Please Verify Account</h1>
          <div class="w-full max-w-md px-8 py-10 bg-white rounded-lg  ">
            <h1 class="text-2xl font-semibold text-center mb-6">Enter OTP</h1>
            <p class=" text-center mb-4">
              Code sent to Your Email <span>{emailUser}</span>
            </p>
            <div
             
              className="grid grid-cols-5 gap-x-4 my-2"
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                
                  key={i}
                  ref={(el) => (inputs.current[i] = el)}
                  contentEditable="true"
                  suppressContentEditableWarning={true}
                  onInput={(e) => handleInput(e, i) }
                  className="rounded-lg bg-slate-500 text-white cursor-text w-14 aspect-square flex items-center justify-center text-2xl text-center"
                ></div>
              ))}
            </div>
            
            <button
            onClick={verifyAccount}
            class="w-full px-4 py-2 text-lg font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
