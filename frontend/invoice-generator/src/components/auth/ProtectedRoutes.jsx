import {Outlet,Navigate}  from "react-router-dom"
import DashboardLayout from "../layouts/DashboardLayout"
import { useAuth } from "../../context/useAuth"

const ProtectedRoutes = ({children}) => {
    const {isAuthenticated,loading} = useAuth();
    

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