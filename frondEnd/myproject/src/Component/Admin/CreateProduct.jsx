import axios from "axios";
import { useFormik } from "formik";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "../Loading.jsx";
import Cookies from "js-cookie";

export default function CreateProduct() {
  const [file, setFile]= useState(null)
  const [isOpen, setOpen] = useState(false)
  const [category , setCategory] = useState([])
  const [categoryId , setCategoryId] = useState(null)
  const [categoryName , setCategoryName] = useState(null)
  const [loading , setLoading] = useState(false)
  const token = Cookies.get("token")

  async function getCategort(){
    try {
      
      const {data} = await axios.get("http://localhost:3000/category")
      setCategory(data.data);
      setCategoryId(data.data._id)
    } catch (error) {
      console.log(error.message);
      
      
      
    }
  }  

  function alert(){
    if(!file){
      return window.alert("Cheack Your Image")
      
    }
  }
  async function addProduct(values , actions) {
    try {
      setLoading(true)
       const formData = new FormData()
    formData.append("name" , values.name)
    formData.append("description" , values.description)
    formData.append("price" , values.price)
    formData.append("stock" , values.stock)
    formData.append("categoryId" , values.categoryId)
    formData.append("photo" , values.photo)
      const {data} = await axios.post("http://localhost:3000/product" , formData , {
        headers:{authorization:token}
      })
      console.log(data.Message);
      toast.success(data.Message)
    } catch (error) {
      console.log(error.response.data.message);
      setLoading(false)
      // toast.error(data.Message)
      
    }finally{
      setLoading(false)
      setFile(null)
      actions.resetForm()
      setCategoryName("")
    }
  }
  const formik = useFormik({
    initialValues:{
      name:"",
      description:"",
      price:"",
      stock:""
    },
    onSubmit:addProduct
  });
  useEffect(()=>{
    getCategort()
  },[categoryId])
if(loading) return <Loading />;
  
  return (
    <div>
      <div class="md:flex items-center bg-white dark:-gray-900">
        <div class="container md:mt-24 ">
          <div class=" lg:my-10">
            <div class="text-center">
              <h2 class="text-center font-bold text-2xl  ">Create Product</h2>
              
            </div>
            <div class="m-7">
              <form onSubmit={formik.handleSubmit} action="">
                <div class="mb-6 lg:flex gap-4 ">
                  <div className="lg:w-[40%]">
                    <label for="name" class="block mb-2 text-sm text-gray-600 ">
                      Product Name
                    </label>
                    <input
                    value={formik.values.name}
                    onChange={formik.handleChange}
                      type="name"
                      name="name"
                      id="name"
                      placeholder="Your Prodcut Name"
                      class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300   dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    />
                  </div>
                  <div className="lg:w-[50%] flex mx-auto lg:mx-0 w-[60px]">
                    <div className="">
                      <div
                      
                        onClick={() => {
                          setOpen(!isOpen);
                          
                        }}
          
                        className="flex justify-between border border-black cursor-pointer py-2 mt-5 rounded-2xl px-2"
                      >
                        {categoryName ? <p  className=" relative ">{categoryName}</p> :<p className=" relative ">Category</p>}
                        {isOpen ? <ChevronUp /> : <ChevronDown />}
                      </div>
                      {isOpen && (
                        <div className="menut rounded-2xl cursor-pointer   px-2 absolute right-14 lg:right-72   py-2 border-2">
                          {category.map((data)=>(
                            <p
                            onClick={(e)=>{
                              setCategoryId(data._id)
                              setCategoryName(data.name)
                              formik.setFieldValue("categoryId" , data._id)
                              setOpen(false)
                            }}
                            className="border-b-2 px-12 mb-3 text-center font-bold ">{data.name}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div class="mb-6 lg:flex gap-4">
                  <div className="lg:w-[40%]">
                    <label
                      for="price"
                      class="block mb-2 text-sm text-gray-600 "
                    >
                      Price
                    </label>
                    <input
                    value={formik.values.price}
                    onChange={formik.handleChange}
                      type="number"
                      name="price"
                      id="price"
                      placeholder="you Price Product"
                      class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300   dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    />
                  </div>
                  <div className="lg:w-[40%]">
                    <label
                      for="Stock"
                      class="block mb-2 text-sm text-gray-600 "
                    >
                      Stock
                    </label>
                    <input
                    value={formik.values.stock}
                    onChange={formik.handleChange}
                      type="number"
                      name="stock"
                      id="stock"
                      placeholder="Your Stock"
                      class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300   dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    />
                  </div>
                </div>
                <div class="mb-6 lg:flex items-center gap-4">
                  <div className="lg:w-[40%]">
                    <label
                      for="description"
                      class="block mb-2 text-sm text-gray-600 "
                    >
                      description
                    </label>
                    <textarea
                    value={formik.values.description}
                    onChange={formik.handleChange}
                      rows="4"
                      name="description"
                      id="description"
                      placeholder="you@company.com"
                      class="w-full px-3 py-2  border text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300    dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    />
                  </div>
                  <div className="lg:w-[40%]">
                    <label class="flex flex-col border-4 border-dashed w-full mt-4 hover:bg-gray-100 hover:border-purple-300 group">
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
                        onChange={(e) => {
                          const file = e.target.files[0];
                          setFile(file),
                           formik.setFieldValue("photo", file);
                        }}
                      />
                    </label>
                    {file && <p className="mt-2 ml-5 text-left text-blue-400">{file.name}</p>}
                  </div>
                </div>
                <div class="mb-6">
                  <button
                  onClick={()=>{
                    alert()
                  }}
                    type="submit"
                    class="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
