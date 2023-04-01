import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Signup from './components/signup'
import Login from './components/login'
import Dashboard from './components/dashboard'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Landingpage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [],
  },
  {
    path: "/signup",
    element: <Signup />,
    children: [],
  },
  {
    path: "/login",
    element: <Login/>,
    children: [],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
