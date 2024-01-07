import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Read from "./pages/read";
import Home from "./pages/home";
import Update from "./pages/update";
import Login from "./pages/login";
import Create from "./pages/create";
import Visitor from "./pages/visitorhomepage";
import ProtectedRoute from "./components/protectedroutes";
import './index.css';

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <ProtectedRoute><Home /></ProtectedRoute>,
  },
  {
    path: "/read/:id",
    element: <Read />
  },
  {
    path: "/edit/:id",
    element: <ProtectedRoute><Update /></ProtectedRoute>,
  },
  {
    path: "/create",
    element: <ProtectedRoute><Create /></ProtectedRoute>,
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/",
    element: <Visitor />
  }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);