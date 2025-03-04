import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/">
              <img className="h-10 w-30 mr-2" src={logo} alt="Logo" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex ml-14 space-x-12">
            <li>
              <Link to="/" className="hover:text-orange-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-orange-500">
                About
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="hover:text-orange-500">
                Gallery
              </Link>
            </li>
            <li>
              <Link to="/suggested" className="hover:text-orange-500">
                Suggested
              </Link>
            </li>
          </ul>

          {/* Authentication Buttons */}
          <div className="hidden lg:flex justify-center space-x-12 items-center">
            <Link to="/signin" className="py-2 px-3 border rounded-md">
              Sign In
            </Link>
            <Link
              to="/signup"
              className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md"
            >
              Create an account
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul>
              <li className="py-4">
                <Link to="/" className="hover:text-orange-500" onClick={toggleNavbar}>
                  Home
                </Link>
              </li>
              <li className="py-4">
                <Link to="/about" className="hover:text-orange-500" onClick={toggleNavbar}>
                  About
                </Link>
              </li>
              <li className="py-4">
                <Link to="/gallery" className="hover:text-orange-500" onClick={toggleNavbar}>
                  Gallery
                </Link>
              </li>
              <li className="py-4">
                <Link to="/suggested" className="hover:text-orange-500" onClick={toggleNavbar}>
                  Suggested
                </Link>
              </li>
            </ul>
            <div className="flex space-x-6">
              <Link to="/signin" className="py-2 px-3 border rounded-md">
                Sign In
              </Link>
              <Link
                to="/signup"
                className="py-2 px-3 rounded-md bg-gradient-to-r from-orange-500 to-orange-800"
              >
                Create an account
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
