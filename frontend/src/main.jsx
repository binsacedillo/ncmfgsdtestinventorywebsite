import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ProtectedRoute from "./components/protectedroutes";
import Read from "./pages/read";
import Home from "./pages/home";
import Update from "./pages/update";
import Login from "./pages/login";
import Create from "./pages/create";
import Visitor from "./pages/visitorhomepage";
import './index.css';

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <Home />,
  },
  {
    path: "/read/:id",
    element: <Read />,
  },
  {
    path: "/edit/:id",
    element: <ProtectedRoute element={<Update />} />,
  },
  {
    path: "/create",
    element: <Create />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Visitor />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);