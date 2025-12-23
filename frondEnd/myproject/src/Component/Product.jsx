import axios from "axios";
import { ShoppingCart } from "lucide-react";
import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Product() {
  const [prodcutData, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  async function getProduct() {
    try {
      const { data } = await axios.get(`http://localhost:3000/product`);

      setProduct(data.data);
    } catch (error) {
      console.log(error.message);
    }
  }
  let Products = prodcutData.filter(
    (product) =>
      search === "" || product.name.toLowerCase().includes(search.toLowerCase())
  );
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div className="container mt-4 caret-transparent ">
      <h1 className="font-bold text-center text-3xl mb-6 ">Product</h1>
      <div className="flex justify-center  mb-5">
        <input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          type="text"
          placeholder="Search..."
          className="border-2 md:w-[30%] px-2 py-2 rounded-2xl border-black "
        />
      </div>
      <div className=" py-2  flex lg:gap-6 gap-4 justify-center md:items-start md:justify-start lg:justify-start items-center flex-wrap flex-row  ">
       {Products.length == 0 &&
          (search.length > 0 ? (
            <h1 className="flex justify-center mx-auto items-center text-3xl font-bold">
              {/* <img src={img} alt="" /> */}
              <h2>Not Found Product Name</h2>
            </h1>
          ) : (
            <h1 className="flex justify-center items-center text-3xl font-bold">
             Error From DB
            </h1>
          ))}

       {Products.map((data) => (
          <Link
            to={`/ProductDetails/${data._id}/${data.slug}`}
            className="lg:w-[23%] group: md:w-[40%] border-2 px-5 py-4 flex flex-col group   rounded-2xl hover:scale-105 transition-all  "
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
              className="flex justify-center translate-y-16 opacity-0  bg-[#1CAD7A] group-hover:translate-y-0 group-hover:opacity-100  py-2 mt-2 px-8 rounded-2xl hover:translate-x-2 transition-all
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
  );
}
