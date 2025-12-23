import axios from "axios";
import { useFormik } from "formik";

import {  useState } from "react";
import toast from "react-hot-toast";
import Loading from "../Loading.jsx";
import Cookies from "js-cookie";

export default function CategoryCreate() {
  const [file, setFile] = useState(null);
  const [isLoading , setLoading]= useState(false)
    const token = Cookies.get("token")

async function addCategory(values ,actions){
  try {
    setLoading(true)
    const formData = new FormData()
    formData.append("name" , values.name)
    formData.append("photo" , values.photo)
    const {data} = await axios.post("http://localhost:3000/category" ,formData ,
      {headers:{authorization: token}}
    )
    console.log(data.Message);
    toast.success(data.Message)
  } catch (error) {
    console.log(error.message);
    
    
    
  }finally{
    actions.resetForm()
    setLoading(false)
    setFile(null)
    
  }
}

  let formik = useFormik({
    initialValues: {
      name: "",
      photo: "",
    },
    onSubmit:addCategory
  });


  function alert(){
    if(!file) return window.alert("Cheack Your Image Category");
  }  
 if(isLoading){
  return <Loading />
}

  return (
    <div className="container  py-4 md:mt-24">
      <div className="">
        <h2 className="text-center font-bold text-2xl">Create Category</h2>
        <div class="relative h-10 md:w-full md:min-w-[100px]  mt-5">
          <input
            id="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            class="peer md:h-full md:w-[400px] md:placeholder:text-transparent w-[210px] rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder="Inter Category Name "
          />
          <label class="before:content[' '] hidden after:content[' '] pointer-events-none absolute left-0 -top-1.5 md:flex h-full w-[42%] md:w-[75%] select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Name Category
          </label>
        </div>
        <div class="grid grid-cols-1 mt-5 mx-7">
          <label class="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold mb-1">
            Upload Photo
          </label>
          <form onSubmit={formik.handleSubmit} class="flex   flex-col w-full">
            <label class="flex flex-col border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-purple-300 group">
              <div class="flex flex-col items-center justify-center pt-7">
                <svg
                  class="w-10 h-10 text-purple-400 group-hover:text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                <p class="lowercase text-sm text-gray-400 group-hover:text-purple-600 pt-1 tracking-wider">
                  Select a photo
                </p>
              </div>
              <input
                type="file"
                class="hidden"
                id="photo"
                onChange={(e)=>{
                  const file = e.target.files[0]
                  setFile(file),
                  formik.setFieldValue("photo" , file)
                }}
          
              />
            </label>
            {file && <p className="mt-2 ml-5 text-left text-blue-400">{file.name}</p>}
        <div className=" flex justify-center items-center">
          <button
          onClick={alert}
            className="bg-blue-500 py-2 mt-3 text-white px-10 rounded-2xl"
            type="submit"
          >
            Submit
          </button>
        </div>
          </form>
        </div>
        
      </div>
    </div>
  );
}
