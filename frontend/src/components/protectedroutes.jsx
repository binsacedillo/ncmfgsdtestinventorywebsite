import { Outlet } from "react-router-dom";
import Home from "../pages/home";

const useAuth = () => {
    const user = { loggedIn: true };
    return user && user.loggedIn;
} 

const ProtectedRoutes = () => {
    const isAuth = useAuth();

  return isAuth ? <Outlet/> : <Home />;
}

export default ProtectedRoutes