import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { removeUser } from "../utils/userSlice";
import axios from "axios";
import { User, Users, LogOut } from "lucide-react";
import NavbarButton from "./NavbarButton";
import SearchBar from "./SearchBar";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:7777/logout",
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUser());
      return navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${query.trim()}`);
      setQuery(""); // Clear the input after redirection
    }
  };

  return (
    <nav className="bg-rose-50 dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center mr-4">
              <div className="text-2xl font-bold text-rose-500 dark:text-rose-400"></div>
              <span className="text-xl font-semibold text-gray-800 dark:text-rose-100">
                InterviewTayari
              </span>
            </Link>
          </div>

          <SearchBar />

          {/* Center Section */}
          {/*<div className="flex-grow flex justify-center">
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                placeholder="Search by company"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-rose-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <button
                type="submit"
                className="p-2 bg-rose-500 text-white rounded-r-lg hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                Search
              </button>
            </form>
          </div>*/}

          {/* Navbar Button */}
          <NavbarButton />

          {/* Right Section */}
          {user && (
            <div className="flex items-center mr-10 gap-4">
              {/* Profile Button */}
              <div className="relative">
                <button
                  type="button"
                  className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                  id="user-menu"
                  aria-expanded="false"
                  aria-haspopup="true"
                  onClick={toggleMenu}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full object-cover"
                    src={
                      "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"
                    }
                    alt={`${user.firstName}'s profile`}
                  />
                </button>
                {isMenuOpen && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-rose-50 dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-rose-100 dark:hover:bg-rose-800"
                      role="menuitem"
                    >
                      <User className="mr-3 h-4 w-4" />
                      Profile
                      <span className="ml-auto bg-rose-100 text-rose-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-rose-900 dark:text-rose-300">
                        New
                      </span>
                    </Link>
                    <Link
                      to="/mysubmission"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-rose-100 dark:hover:bg-rose-800"
                      role="menuitem"
                    >
                      <Users className="mr-3 h-4 w-4" />
                      View Submissions
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-rose-100 dark:hover:bg-rose-800"
                      role="menuitem"
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
