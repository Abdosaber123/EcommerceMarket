import axios from "axios";
import { Mail,  Trash, UserPen, X } from "lucide-react";
import React, {  useEffect, useState } from "react";
import Cookies from "js-cookie";
import Loading from "../Loading.jsx";
import toast from "react-hot-toast";

function getDayAndMonth(dateString = null) {
  // لو مررنا dateString نعمل Date منه، وإلا نستخدم التاريخ الحالي
  const date = dateString ? new Date(dateString) : new Date();

  // تحقق من صلاحية التاريخ
  if (isNaN(date.getTime())) return ""; // أو رجّع null أو رسالة خطأ حسب ما تحب

  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec",
  ];

  // لو جاي من باك ومررنا dateString، نستخدم UTC علشان نحافظ على اليوم/الشهر كما في الباك
  const useUTC = Boolean(dateString);

  const day = useUTC ? date.getUTCDate() : date.getDate();
  const month = useUTC ? months[date.getUTCMonth()] : months[date.getMonth()];

  return `${day}${month}`; // مثال: "23Mar"
}

export default function AllOrder() {
  const [orderData, setOrderData] = useState([]);
  const [oderId, setOrderId] = useState("");
  const [isOpen, setOpen] = useState(false);
  const token = Cookies.get("token");
  const [isLoading, setLoading] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [productId, setSearchProductId] = useState("");
  const [productData, setProductData] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [orderOpenStatus, setOpenStatus] = useState(false);
  const [orderIdByStatus, selectOrderIdByStatus] = useState("");
  console.log(orderIdByStatus);

  async function getAllOrder() {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:3000/order/get-all`, {
        headers: { authorization: token },
      });
      setOrderData(data.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }
  async function getOrderId(id) {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `http://localhost:3000/order/userid/${id}`,
        {
          headers: { authorization: token },
        }
      );
      console.log(data.data);
      setOrderId(data.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }
  function cheeckInput() {
    if (productId.length == 0) {
      window.alert("Cheack Id as Search");
      setOpenSearch(false);
    }
  }
  async function getProductSeatch(id) {
    setLoading(true);
    try {
      const { data } = await axios.get(`http://localhost:3000/product/${id}`, {
        headers: { authorization: token },
      });
      setProductData(data.data);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }
  async function dleteOrder(id) {
    try {
      setLoading(true);
      const { data } = await axios.delete(
        `http://localhost:3000/order/delete/${id}`,
        { headers: { authorization: token } }
      );
      console.log(data);
      toast.success(data.Message);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }
  async function updateStatus() {
    try {
      setLoading(true);
      const { data } = await axios.patch(
        `http://localhost:3000/order/update/${orderIdByStatus}`,
        { Status: orderStatus },
        { headers: { authorization: token } }
      );
      toast.success(data.Message);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setOpenStatus(false);
      setLoading(false);

    }
  }
  useEffect(() => {
    getAllOrder();
  }, []);
  if (isLoading) return <Loading />;
  return (
    <div className="pather caret-transparent md:mt-24">
      <p className="text-center font-bold text-2xl">Get All Orders</p>
      <div className="search flex justify-center items-center mt-7 gap-2">
        <input
          placeholder="Search For ID Product"
          onChange={(e) => {
            setSearchProductId(e.target.value);
          }}
          type="text"
          className=" w-[50%] py-2 rounded-xl bg-gray-300  px-3 font-bold text-xl"
        />
        <button
          onClick={() => {
            setOpenSearch(!openSearch);
            cheeckInput();

            getProductSeatch(productId);
          }}
          type="submit"
          className="bg-gray-300 px-4 py-2 rounded-xl"
        >
          {" "}
          Search{" "}
        </button>
      </div>
      {openSearch && (
        <div
          className={`group product transition-all border-black/50 rounded-lg border-2 px-5 z-40 bg-white absolute top-[40%] right-[10%] mt-3 left-[25%] 
        ${openSearch ? "opacity-100" : "opacity-0 translate-x-[200%]"}
        `}
        >
          <div className=" all">
            <div className="flex justify-end px-4 py-3 ">
              <p
                className="cursor-pointer"
                onClick={() => {
                  setOpenSearch(!openSearch);
                }}
              >
                {" "}
                <X />
              </p>
            </div>
            <img
              className="w-[20%] mx-auto"
              src={productData?.photo?.secure_url}
              alt=""
              srcset=""
            />
            <p className="text-right font-bold py-2">{productData.name}</p>
            <p className="text-right font-bold py-2">
              {productData.description}
            </p>
            <p className="text-left text-2xl text-green-400 font-bold py-2">
              {productData.price}
            </p>
          </div>
        </div>
      )}
      <div className="container ">
        <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div class="relative inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table class="min-w-full leading-normal">
              <thead>
                <tr>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Role
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Created at
                  </th>

                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Details product
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Details adress
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Delete
                  </th>
                </tr>
              </thead>
              {orderData.map((data) => (
                <tbody key={data._id}>
                  <tr>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {data?.userId?.fullName}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {data?.userId?.role}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {getDayAndMonth(data.createdAt)}
                      </p>
                    </td>

                    <td className="px-5 relative  py-5 border-b border-gray-200 bg-white text-sm">
                      <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span
                          aria-hidden
                          className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                        ></span>
                        <span className="relative">{data.orderStatus}</span>
                      </span>
                      <div className="absolute top-3 right-10 z-20">
                        <UserPen
                          onClick={() => {
                            selectOrderIdByStatus(data._id);
                            setOpenStatus(!orderOpenStatus);
                          }}
                          className="cursor-pointer"
                          size={15}
                        />
                      </div>
                    </td>

                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p
                        onClick={() => {
                          setOrderId(data._id);
                        }}
                        className="text-gray-900 whitespace-no-wrap"
                      >
                        {data.product.map((prod) => (
                          <div className="">
                            <p>{prod.productId._id}</p>
                          </div>
                        ))}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p
                        onClick={() => {
                          getOrderId(data._id);
                          setOpen(!isOpen);
                        }}
                        className="text-gray-900 whitespace-no-wrap cursor-pointer transition-all"
                      >
                        Details Adress
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p
                        onClick={() => {
                          dleteOrder(data._id);
                        }}
                        className="text-red-600 whitespace-no-wrap cursor-pointer"
                      >
                        <Trash size={15} />
                      </p>
                    </td>
                  </tr>
                  <div className=""></div>
                </tbody>
              ))}
              {orderOpenStatus && (
                <div className="absolute top-11  ">
                  <select
                    onChange={(e) => {
                      setOrderStatus(e.target.value);
                    }}
                    class="text-sm  rounded-xl bg-gray-500 py-1 px-3  text-gray-200   "
                  >
                    <option selected>Choose Staus Order User</option>
                    <option value="PLACED">Placed</option>
                    <option value="PENDING">Pending</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                  <button
                    onClick={updateStatus}
                    className="ml-2 py-1 px-3 bg-gray-500 text-white rounded-lg"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              )}
            </table>
          </div>

          <div
            className={`group details-address top-[19%] px-4 border-2 rounded-2xl transition-all  border-black/50 shadow-xl bg-white py-5 right-[50%] left-[25%] absolute
            ${
              isOpen
                ? "translate-x-1 opacity-100 "
                : "translate-x-full opacity-0 "
            }`}
          >
            <div
              onClick={() => {
                setOpen(!isOpen);
              }}
              className="icon flex justify-end cursor-pointer text-red-600"
            >
              <p>
                <X />
              </p>
            </div>
            <p className="text-2xl font-bold text-center mb-2">Customer</p>
            <p className="font-semibold text-violet-500 text-center ">
              {oderId?.userId?.fullName}
            </p>
            <div className="flex items-center gap-2 border-t-2 border-b-2 border-black/50 py-2">
              <p>
                {" "}
                <Mail />
              </p>
              <p className="font-semibold text-violet-500 ">
                {" "}
                {oderId?.userId?.email}
              </p>
            </div>

            <h3 className="font-bold py-2 border-b-2 border-black">
              Shipping Address
            </h3>
            <p className="font-bold py-2">
              Country :{" "}
              <span className="font-semibold text-violet-500">
                {oderId?.Address?.country}
              </span>{" "}
            </p>
            <p className="font-bold py-2">
              City :{" "}
              <span className="font-semibold text-violet-500 ">
                {" "}
                {oderId?.Address?.city}
              </span>{" "}
            </p>
            <p className="font-bold py-2">
              Phone :
              <span className="font-semibold text-violet-500 ">
                {" "}
                {oderId?.Address?.phoneNumber}
              </span>{" "}
            </p>
            <p className="font-bold py-2">
              Address :
              <span className="font-semibold text-violet-500 ">
                {" "}
                {oderId?.Address?.street}
              </span>{" "}
            </p>
            <p className="font-bold py-2">
              Mony :
              <span className="font-semibold text-violet-500 ">
                {" "}
                {oderId?.paymentMethod == "COD"
                  ? "Cash in Driver"
                  : "Cash Visa"}
              </span>{" "}
            </p>
            <p className="font-bold py-2">
              Price :
              <span className="font-semibold text-violet-500 ">
                {" "}
                {oderId?.totalAmount}
              </span>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
