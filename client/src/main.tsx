import ReactDOM from "react-dom/client";
import Signup from "./components/signup";
import Signin from "./components/Signin";
import Dashboard from "./components/dashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Landingpage";
import About from './components/AboutUs/Aboutus'

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

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
    element: <Signin />,
    children: [],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [],
  },
  {
    path: "/about",
    element: <About />,
    children: [],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
