import { Register } from "@/components/page/Register";
import { createBrowserRouter } from "react-router-dom";
import { Home, loader as homeLoader } from "@/components/page/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: homeLoader,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
