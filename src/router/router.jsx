import { createBrowserRouter, Navigate } from "react-router-dom";

// import MasterLayoutAdmin from "../layouts/admin/MasterLayoutAdmin";


import MasterLayoutClient from "../layouts/client/MasterLayoutClient";
import Product from "../features/Product";

import LayoutAuthen from "../layouts/LayoutAuthen";
import Login from "../features/Auth/Login";
import Register from "../features/Auth/Register"

import NotFound from "../components/NotFound";
import Categories from "../features/Categories";
import Dashboard from "../features/Dashboard";

const router = createBrowserRouter([

  {
    path: "/",
    element: <MasterLayoutClient />,
    children: [
      {path:"/", element: <Navigate to="/dashboard" />},
      {
        path: "product", element: <Product />
      },

      { path: "category", element: <Categories /> },
      { path: "dashboard", element: <Dashboard /> }
    ]
  },

  {
    path:"/auth",
    element: <LayoutAuthen />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },

  { path: "*", element: <NotFound /> },
]);

export default router;
