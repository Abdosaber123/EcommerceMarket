import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignUp from './Component/signUp.jsx'
import Product from './Component/Product.jsx'
import ProductDetails from './Component/ProductDetails.jsx'
import CategoryDetails from './Component/CategoryDetails.jsx'
import AdminLayout from './Component/Admin/AdminLayout.jsx'
import CreateProduct from './Component/Admin/CreateProduct.jsx'
import CategoryCreate from './Component/Admin/CategoryCreate.jsx'
import Cart from './Component/Cart.jsx'
import VerifyAccount from './Component/VerifyAccount.jsx'
import CardComponent from './Component/Gard/CardComponent.jsx'
import ForgetPasswrd from './Component/ForgetPasswrd.jsx'
import UpdateProduct from './Component/Admin/UpdateProduct.jsx'
import AllOrder from './Component/Admin/AllOrder.jsx'
import AdminGrud from './Component/Gard/AdminGrud.jsx'
import GetAllUser from './Component/Admin/GetAllUser.jsx'
import GetDetailsOrderUser from './Component/GetDetailsOrderUser.jsx'
import Layout from './Component/Layout.jsx'
import HomePage from './Component/HomePage.jsx'
import Login from "./Component/Login.jsx"
import PageNotFound from './Component/PageNotFound.jsx'


function App() {
 const router = createBrowserRouter([
  {path:"/" , element: <Layout /> , children:[
    {index:true , element: <HomePage />},
    {path:"/login" , element:<Login />},
    {path:"/signUp" , element:<SignUp />},
    {path:"/*" , element:<PageNotFound />},
    {path:"/prodcut" , element:<Product />},
    // {path:"/blog" , element:<Blog />},
    {path:"/cart" , element:<CardComponent><Cart></Cart></CardComponent>},
    {path:"/verify-account" , element:<VerifyAccount />},
    {path:"/Details-order" , element:<GetDetailsOrderUser />},
    {path:"/forgetPassword" , element:<ForgetPasswrd />},
    {path:"/ProductDetails/:id/:slug" , element:<ProductDetails />},
    {path:"/CategoryDetails/:id/:slug" , element:<CategoryDetails />},
    {path:"/Admin" , element:<AdminGrud><AdminLayout /></AdminGrud> , children:[
      {path:"create-product", element:<CreateProduct />},
      {path:"create-category", element:<CategoryCreate />},
      {path:"updateProduct", element:<UpdateProduct />},
      {path:"all-order", element:<AllOrder />},
      {path:"all-user", element:<GetAllUser />},
      
      
    ]},
  ]}
 ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
