import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import Signup from './components/signup'
import Login from './components/login'
import Dashboard from './components/dashboard'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
