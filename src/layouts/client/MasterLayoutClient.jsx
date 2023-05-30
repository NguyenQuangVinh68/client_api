import SideBar from "../../components/Sidebar";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";
import "../../assets/css/admin.css";

function MasterLayoutClient() {
  const cookie = new Cookies()
  const user = JSON.parse(localStorage.getItem("user"))


  const authenticated = cookie.get("jwt_authentication")
  if (!authenticated || user?.exp * 1000 < Date.now() ) {
    cookie.remove("jwt_authentication")
    return <Navigate to="/auth/login" replace></Navigate>;
  } else {
    return (
      <>
        <div>
          <SideBar />
          <div className="main">
            <Outlet />
          </div>
        </div>
      </>
    );
  }
}

export default MasterLayoutClient;
