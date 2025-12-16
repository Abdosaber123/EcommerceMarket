import React from 'react'
import { Navigate } from 'react-router-dom'
import Cookies from "js-cookie";

export default function CardComponent({children}) {
    const token = Cookies.get("token")
  if(token){
    return children
  }else{
    return <Navigate to={'/login'} ></Navigate>
  }
  
}
