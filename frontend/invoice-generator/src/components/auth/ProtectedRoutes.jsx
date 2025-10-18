import {Outlet,Navigate}  from "react-router-dom"
import DashboardLayout from "../layouts/DashboardLayout"

const ProtectedRoutes = ({children}) => {
    const isAuthenticated = true
    const loading = false

    if(loading){
        return <div>Loading...</div>
    }

    if(!isAuthenticated){
        return <Navigate to="/login"  replace/>
    }

  return (
    <DashboardLayout>{children? children : <Outlet/>}</DashboardLayout>
  )
}

export default ProtectedRoutes