import { createBrowserRouter, Form, Navigate } from "react-router-dom";

// import MasterLayoutAdmin from "../layouts/admin/MasterLayoutAdmin";


import MasterLayoutClient from "../layouts/client/MasterLayoutClient";
import Product from "../features/Product";

import LayoutAuthen from "../layouts/LayoutAuthen";
import Login from "../features/Auth/Login";
import Register from "../features/Auth/Register"

import NotFound from "../components/NotFound";
import Categories from "../features/Categories";
import Dashboard from "../features/Dashboard";
import Header from "../components/Header";

import apiMenu from "../api/apiMenu";
import DontHaveSubMenu from "../components/Header/DontHaveSubMenu";


const arrayRouter = []


const listMenu = async () => {
  try {
    const { data } = await apiMenu.getAll()
    data.forEach((items,index) => {
      if (items.subMenu[0] === null) {
        menuDontHaveSubMenu(items)
      } else {
        menuHasSubMenu(items,index)
      }
    });
  } catch (error) {
    console.log(error);
  }
}

const menuHasSubMenu = (item,index) => {
  const listSubmenu = []

  item.subMenu.forEach(subMenu => {
    listSubmenu.push({
      path: `${subMenu.path}`,
      element: <Form />
    })
  })
  
  arrayRouter.push({
    path: `dynamic_${index}`,
    element: <Header />,
    children: listSubmenu
  })
}

console.log(arrayRouter,"array router");

const menuDontHaveSubMenu = (item) =>{
  arrayRouter.push({
    path: `${item.path}`,
    element: <DontHaveSubMenu />
  })
}

listMenu()

const router = createBrowserRouter([

  {
    path: "/",
    element: <MasterLayoutClient />,
    children: arrayRouter
  },
  {
    path:"/auth",
    element: <LayoutAuthen />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
]);

export default router;
