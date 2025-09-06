import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Layout from "./Layout";
import Verify from "./pages/Verify";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks/reduxHooks";
import {
  setIsAuthenticated,
  setIsLoading,
  setUser,
} from "./store/features/authSlice";
import axiosPrivate from "./api/axiosPrivate";
import Todos from "./pages/Todos";
import ProtectedRoute from "./components/ProtectedRoute";
import About from "./pages/About";
import ForgotPasswordMessage from "./pages/ForgotPasswordMessage";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getUser = async () => {
      dispatch(setIsLoading(true));
      try {
        const response = await axiosPrivate.get("/users/get-user");

        dispatch(setUser(response.data.data));
        dispatch(setIsAuthenticated(true));
      } catch (error) {
        dispatch(setUser(null));
        dispatch(setIsAuthenticated(false));
      } finally {
        dispatch(setIsLoading(false));
      }
    };

    getUser();
  }, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/verify/:username" element={<Verify />} />
        <Route path="/auth/password/forgot" element={<ForgotPassword />} />
        <Route path="/auth/password/forgot/message" element={<ForgotPasswordMessage />} />
        <Route path="/auth/password/reset/:resetToken" element={<ResetPassword />} />
        <Route
          path="/todos"
          element={
            <>
              <ProtectedRoute>
                <Todos />
              </ProtectedRoute>
            </>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
