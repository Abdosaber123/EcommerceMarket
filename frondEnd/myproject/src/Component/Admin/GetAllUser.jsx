import axios from "axios";
import { Trash, UserPen } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
function getDayMonthYear(dateString = null) {
  
  const date = dateString ? new Date(dateString) : new Date();


  if (isNaN(date.getTime())) return "";

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const useUTC = Boolean(dateString);

  const day = useUTC ? date.getUTCDate() : date.getDate();
  const month = useUTC ? months[date.getUTCMonth()] : months[date.getMonth()];
  const year = useUTC ? date.getUTCFullYear() : date.getFullYear();

  return `${day}${month} ${year}`;
}
export default function GetAllUser() {
    const input = document.getElementById("inputselect")
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");
  const [openRole, setOpenRole] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectId , setSelectId] = useState("")
  console.log(selectId);
  
  async function getAllUser() {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:3000/auth/getAllUser");
      console.log(data.data);
      setUser(data.data);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }
  async function updateRole() {
    try {
      setLoading(true)
      const {data} = await axios.patch(`http://localhost:3000/auth/updateRole/${selectId}`, {
        role
      })
      toast.success(data.Message)
    } catch (error) {
      toast.error(error.response.data)
      console.log(error.response.data);
      
    }finally{
      setShowDelete(false)
      setOpenRole(false)
      setShowDelete(false)

    }
  }
  async function deleteUser(id) {
    try {
      setLoading(true)
      const {data} = await axios.delete(`http://localhost:3000/auth/delete/${id}`)
      toast.success(data.Message)
    } catch (error) {
      toast.error(error.response.data)
      console.log(error.response.data);
      
    }finally{
      setShowDelete(false)
      setOpenRole(false)
      setShowDelete(false)
    }
  }
  useEffect(() => {
    getAllUser();
  }, []);
  console.log(input);

    
 
  return (
    <div>
      <div className="container  md:mt-24 ">
        <h2 className="text-center font-bold text-2xl">Get All Users</h2>
        <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div class="relative inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table class="min-w-full leading-normal">
              <thead>
                <tr>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <input  className="cursor-pointer" type="checkbox" />
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    email
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Is Verifyed
                  </th>

                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    role
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date of Birth
                  </th>
                 
                 {showDelete &&
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Delete
                  </th>
                 }
                </tr>
              </thead>
              {user.map((data) => (
                <tbody>
                  <tr>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="">
                        <input onClick={()=>{
                          setSelectId(data._id)
                          setShowDelete(!showDelete)
                        }}  className="cursor-pointer" type="checkbox" />
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {data.fullName}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {data.email}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {data.isVerifyed == true ? <span>true</span> : <span className="text-white py-2 px-3 rounded-2xl bg-red-500">false</span>}
                      </p>
                    </td>

                    <td className="px-5 relative  py-5 border-b border-gray-200 bg-white text-sm">
                      <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span
                          aria-hidden
                          className="absolute inset-0   rounded-full"
                        ></span>
                        <span className="">{data.role =="Admin"?<span className="text-blue-500">Admin</span>:<span>User</span>}</span>
                      </span>
                    {showDelete &&
                     <div
                     onClick={()=>{setOpenRole(!openRole)}}
                     className="absolute cursor-pointer top-1 right-9">
                      <p><UserPen size={15} /></p>
                     </div>
                    }
                    </td>

                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {getDayMonthYear(data.dob)}
                      </p>
                    </td>
                   
                    {showDelete &&
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p
                      onClick={()=>{
                        deleteUser(data._id)
                      }}
                      className="text-red-600 whitespace-no-wrap cursor-pointer">
                        <Trash size={15} />
                      </p>
                    </td>
                    }
                  </tr>
                 
                </tbody>
              ))}
              {openRole &&
              <div className="text-sm flex gap-3 rounded-xl   px-3  text-gray-200 absolute top-9">
                <select
                    onChange={(e) => {
                      setRole(e.target.value);
                    }}
                    className="  rounded-xl bg-gray-500    text-gray-200  ">
                    <option selected>Choose Role User</option>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                    
                  </select>
                  <div className="bg-gray-500 px-3 py-1 rounded-xl">
                    <button onClick={()=>{
                    updateRole()
                  }} type="submit">Save</button>
                  </div>
              </div>
                  
              }
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
