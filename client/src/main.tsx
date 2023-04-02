import React from 'react'
import ReactDOM from 'react-dom/client'
// import './index.css'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Login from './components/login'
import Dashboard from './components/dashboard'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Landingpage";

// react-queries
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient()


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
    element: <Signin/>,
    children: [],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
