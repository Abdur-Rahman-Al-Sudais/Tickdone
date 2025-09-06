import { Link } from "react-router";
import ModeToggle from "./ui/ModeToggle";
import { Button } from "./ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { toast } from "sonner";
import axiosPrivate from "@/api/axiosPrivate";
import { setIsAuthenticated, setUser } from "@/store/features/authSlice";
import { LogIn, LogOut, Menu } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const Header = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuWrapperRef = useRef<HTMLDivElement | null>(null); // wrapper for both button + menu

  const logout = async () => {
    try {
      const response = await axiosPrivate.patch("/users/logout");
      dispatch(setIsAuthenticated(false));
      dispatch(setUser(null));
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Something went wrong during logout"
      );
    }
  };

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (menuWrapperRef.current?.contains(target)) {
        return;
      }

      if (target.closest("[data-radix-popper-content-wrapper]")) {
        return;
      }
      
      setMenuOpen(false);
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-gray-100 dark:bg-neutral-900 shadow-md relative">
      {/* Logo */}
      <Link to="/">
        <h1 className="dark:text-white text-2xl md:text-3xl font-bold tracking-tight">
          TickDone
        </h1>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6">
        <ul className="flex gap-6 text-lg font-medium dark:text-gray-200">
          <li>
            <Link
              to="/"
              className="hover:text-gray-900 dark:hover:text-white transition"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:text-gray-900 dark:hover:text-white transition"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/todos"
              className="hover:text-gray-900 dark:hover:text-white transition"
            >
              Todos
            </Link>
          </li>
          <li onClick={(e) => e.stopPropagation()}>
            <ModeToggle />
          </li>
        </ul>

        {/* Greeting */}
        {isAuthenticated && user?.username && (
          <span className="text-gray-800 dark:text-gray-300 text-lg font-medium">
            Hi, <span className="font-semibold">{user.username}</span> 👋
          </span>
        )}

        {/* Auth Button */}
        {isAuthenticated ? (
          <Button
            variant="destructive"
            onClick={logout}
            className="cursor-pointer"
          >
            Logout
            <LogOut className="ml-2 w-4 h-4" />
          </Button>
        ) : (
          <Link to="/auth/login">
            <Button variant="default" className="cursor-pointer">
              Login
              <LogIn className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        )}
      </nav>

      {/* Mobile Wrapper: button + menu (so click inside won’t trigger outside) */}
      <div ref={menuWrapperRef} className="md:hidden relative">
        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="text-gray-800 dark:text-gray-200"
        >
          <Menu size={28} />
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-12 right-0 w-56 bg-gray-100 dark:bg-neutral-900 shadow-md p-4 flex flex-col gap-4 z-50 rounded-xl">
            <Link
              to="/"
              className="hover:text-gray-900 dark:hover:text-white transition"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="hover:text-gray-900 dark:hover:text-white transition"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/todos"
              className="hover:text-gray-900 dark:hover:text-white transition"
              onClick={() => setMenuOpen(false)}
            >
              Todos
            </Link>
            <ModeToggle />

            {/* Greeting */}
            {isAuthenticated && user?.username && (
              <span className="text-gray-800 dark:text-gray-300 text-lg font-medium">
                Hi, <span className="font-semibold">{user.username}</span> 👋
              </span>
            )}

            {isAuthenticated ? (
              <Button variant="destructive" onClick={logout}>
                Logout
                <LogOut className="ml-2 w-4 h-4" />
              </Button>
            ) : (
              <Link to="/auth/login" onClick={() => setMenuOpen(false)}>
                <Button variant="default">
                  Login
                  <LogIn className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
