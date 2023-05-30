import { Navigate, Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import "../../assets/css/admin.css";

function MasterLayoutAdmin() {
  return (
    <div>
      <Sidebar />
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
}

export default MasterLayoutAdmin;
