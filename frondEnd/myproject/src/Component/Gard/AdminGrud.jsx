import React from 'react'
import Cookies from "js-cookie"
import { Navigate } from 'react-router-dom'
export default function AdminGrud({children}) {
 const admin = Cookies.get("Role")
 console.log(admin);
 
 if(admin == "Admin"){
    return children
 }else{
    return <Navigate to={'/'} />
 }
}
