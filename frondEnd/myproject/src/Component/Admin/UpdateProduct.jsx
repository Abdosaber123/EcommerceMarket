import axios from "axios";
import { useFormik } from "formik";
import { ChevronDown, ChevronUp, Pencil, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import Loading from "../Loading.jsx";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function UpdateProduct() {
  const [product, setProduct] = useState([]);
  const [file, setFile] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [categoryName, setCategoryName] = useState(null);
  const [isloading, setLoading] = useState(false);
  const [getProductId, setProductId] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const token = Cookies.get("token");

  async function getAllProduct(params) {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:3000/product");
      setProduct(data.data);
      console.log(data.data);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }
  async function getCategort() {
    try {
      const { data } = await axios.get("http://localhost:3000/category");
      setCategory(data.data);

      setCategoryId(data.data._id);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function addProduct(values, id) {
    try {
      setLoading(true);
      const formData = new FormData();
      if (values.name) formData.append("name", values.name);
      if (values.description)
        formData.append("description", values.description);
      if (values.price) formData.append("price", values.price);
      if (values.stock) formData.append("stock", values.stock);
      if (values.photo) formData.append("photo", values.photo);
      if (categoryId) formData.append("categoryId", categoryId);

      formData.append("photo", values.photo);
      const { data } = await axios.patch(
        `http://localhost:3000/product/${id}`,
        formData,
        {
          headers: { authorization: token },
        }
      );
      console.log(data);
      toast.success("Updated SuccessFuly");
    } catch (error) {
      console.log(error.response.data.message);
      setLoading(false);
      toast.error(data.Message);
    } finally {
      setLoading(false);
      setFile(null);
      setEditOpen(false);
      formik.resetForm();
      //   actions.resetForm()
    }
  }
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      stock: "",
    },
    onSubmit: (values) => addProduct(values, getProductId),
  });
  useEffect(() => {
    getAllProduct();
    getCategort();
  }, []);
  if (isloading) return <Loading />;
  return (
    <>
      <div className="overflow-hidden relative">
        <div className="container mt-24">
          <h2 className="text-center font-bold text-2xl mb-3">
            Update Product
          </h2>
          <div className="overflow-x-auto caret-transparent">
            <table class="table-auto w-full">
              <thead class=" text-sm   bg-gray-50">
                <tr>
                  <th class="p-2 whitespace-nowrap">
                    <div class=" text-center">name</div>
                  </th>
                  <th class="p-2 whitespace-nowrap">
                    <div class=" text-center">Description</div>
                  </th>
                  <th class="p-2 whitespace-nowrap">
                    <div class=" text-left"></div>
                  </th>

                  <th class="p-2 whitespace-nowrap">
                    <div class=" text-left">Price</div>
                  </th>
                  <th class="p-2 whitespace-nowrap">
                    <div class=" text-center">Stock</div>
                  </th>
                  <th class="p-2 whitespace-nowrap">
                    <div class=" text-center">id</div>
                  </th>
                  <th class="p-2 whitespace-nowrap">
                    <div class=" text-center">Category</div>
                  </th>
                </tr>
              </thead>
              {product.map((data) => (
                <tbody class="text-sm divide-y divide-gray-100 ">
                  <tr className="border-b-2 border-black/50 py-5">
                    <td class="p-2 whitespace-nowrap">
                      <div class="flex items-center mb-2 ">
                        <div class="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                          <img
                            class="rounded-full"
                            src={data.photo?.secure_url}
                            width="40"
                            height="40"
                            alt="Alex Shatov"
                          />
                        </div>
                        <div class="font-medium text-gray-800">{data.name}</div>
                      </div>
                    </td>
                    <div class="font-medium text-gray-800 text-right">
                      {data.description}
                    </div>
                    <td class="p-2 whitespace-nowrap">
                      <div class="flex items-center mb-2 "></div>
                    </td>
                    <td class="p-2 whitespace-nowrap">
                      <div class="flex items-center mb-2 ">
                        <div class="font-medium text-gray-800">
                          {data.price}
                        </div>
                      </div>
                    </td>
                    <td class="p-2 whitespace-nowrap">
                      <div class="flex items-center mb-2 ">
                        <div class="font-medium text-gray-800 bg-yellow-300 px-2">
                          {data.stock}
                        </div>
                      </div>
                    </td>
                    <td class="p-2 whitespace-nowrap">
                      <div class="flex items-center mb-2 ">
                        <div class="font-medium text-gray-800">{data._id}</div>
                      </div>
                    </td>
                    <td class="p-2 whitespace-nowrap">
                      <div class="flex items-center mb-2 ">
                        <div class="font-medium text-gray-800">
                          {data?.categoryId?.name}
                        </div>
                      </div>
                    </td>
                    <p
                      onClick={() => {
                        setProductId(data._id);
                        setEditOpen(!isOpen);
                      }}
                      className={`font-bold text-sm hover:cursor-pointer ${
                        editOpen ? "hidden" : "block"
                      }`}
                    >
                      <Pencil size={13} />
                    </p>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
        <div
          className={`rounded-2xl absolute  top-10 right-[10%]   z-50 mt-14  left-[10%] bg-black/50 flex  items-center 
            ${
              editOpen
                ? " translate-x-0 transition-all"
                : "transition-all  translate-x-[200%]"
            }`}
        >
          <div class="container ">
            <div class=" my-10">
              <div className="flex justify-end cursor-pointer overflow-hidden">
                <p
                  onClick={() => {
                    setEditOpen(!editOpen);
                  }}
                  className={`text-white text-right  `}
                >
                  {" "}
                  <X />
                </p>
              </div>
              <div class="text-center text-white">
                <h1 class="my-3 text-3xl font-semibold  ">Edit Product</h1>
              </div>
              <div class="m-7">
                <form onSubmit={formik.handleSubmit} action="">
                  <div class="mb-6 flex gap-4 items-center ">
                    <div className="w-[40%]">
                      <label for="name" class="block mb-2 text-sm text-white  ">
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
                    <div className="w-[40%]">
                      <div className="">
                        <div
                          onClick={() => {
                            setOpen(!isOpen);
                          }}
                          className="flex justify-between border bg-white cursor-pointer py-2 mt-5 rounded-2xl px-2"
                        >
                          {categoryName ? (
                            <p className=" relative ">{categoryName}</p>
                          ) : (
                            <p className=" relative ">Category</p>
                          )}
                          {isOpen ? <ChevronUp /> : <ChevronDown />}
                        </div>
                        {isOpen && (
                          <div className="menut rounded-2xl cursor-pointer    px-2 absolute right-14   py-2 border-2">
                            {category.map((data) => (
                              <p
                                onClick={(e) => {
                                  setCategoryId(data._id);
                                  setCategoryName(data.name);
                                  formik.setFieldValue("categoryId", data._id);
                                  setOpen(false);
                                }}
                                className="border-b-2 px-12 mb-3 text-center font-bold "
                              >
                                {data.name}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div class="mb-6 flex gap-4 text-white">
                    <div className="w-[40%]">
                      <label for="price" class="block mb-2 text-sm  ">
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
                    <div className="w-[40%]">
                      <label for="Stock" class="block mb-2 text-sm  ">
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
                  <div class="mb-6 flex items-center gap-4 text-white">
                    <div className="w-[40%]">
                      <label for="description" class="block mb-2 text-sm  ">
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
                    <div className="w-[40%]">
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
                            setFile(file), formik.setFieldValue("photo", file);
                          }}
                        />
                      </label>
                      {file && (
                        <p className="mt-2 ml-5 text-left text-blue-400">
                          {file.name}
                        </p>
                      )}
                    </div>
                  </div>
                  <div class="mb-6">
                    <button
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
    </>
  );
}
