import {BrowserRouter as Router ,Routes,Route,Navigate}  from "react-router-dom"
import{ Toaster} from "react-hot-toast"

import SignUp from "./pages/Auth/SignUp"
import Login from "./pages/Auth/Login"
import LandPage from "./pages/LandPage/LandPage"
import Dashboard from "./pages/Dashboard/Dashboard"
import AllInvoice from "./pages/AllInvoice/AllInvoice"
import InvoiceDetail from "./pages/AllInvoice/InvoiceDetail"
import CreateInvoice from "./pages/AllInvoice/CreateInvoice"
import ProfilePage from "./pages/Profile/ProfilePage"
import ProtectedRoutes from "./components/auth/ProtectedRoutes"
import { AuthProvider } from "./context/AuthContext"



const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/*public routes*/}
          <Route path="/" element={<LandPage/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>

          {/*protected routes*/}
          <Route path="/" element={<ProtectedRoutes/>}>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/invoices" element={<AllInvoice/>}/>
            <Route path="/invoices/new" element={<CreateInvoice/>}/>
            <Route path="/invoices/:id" element={<InvoiceDetail/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
          </Route>


          {/*catach all routes */}
          <Route path="*" element={<Navigate to="/" replace />}/>


        </Routes>
      </Router>

      <Toaster 
        toastOptions={{
          className : "",
          style:{
            fontSize: "13px",
          },
        }}
        />
    </AuthProvider>
  )
}

export default App