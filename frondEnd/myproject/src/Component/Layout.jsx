import Navbar from './Navbar.jsx'
import { Outlet } from 'react-router-dom'
import Footer from './Footer.jsx'
export default function Layout() {
  return (
    <div>
    <Navbar />
    <Outlet />
    <Footer />
    </div>
  )
}
