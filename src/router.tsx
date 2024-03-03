import { Register } from "@/components/page/Register";
import { createBrowserRouter } from "react-router-dom";
import { Home } from "@/components/page/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
