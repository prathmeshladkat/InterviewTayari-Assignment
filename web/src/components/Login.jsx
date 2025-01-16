import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
//import { BASE_URL } from "../utils/constants";
import { ArrowRight, Mail, Lock } from "lucide-react";

const LoginMain = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:7777/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/Home");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-rose-100 to-indigo-100 dark:from-gray-800 dark:to-gray-900 p-6">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <div className="relative group mb-4">
                <input
                  id="email"
                  type="email"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                  placeholder="you@example.com"
                  className="appearance-none border-2 border-gray-200 dark:border-gray-600 rounded-lg w-full py-3 px-4 pl-12 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:ring-2 focus:ring-rose-500 dark:focus:ring-indigo-500 focus:border-transparent transition-all duration-300 ease-in-out dark:bg-gray-700"
                />
                <Mail className="absolute left-3 top-3 h-6 w-6 text-gray-400 transition-all duration-300 group-focus-within:text-rose-500 dark:group-focus-within:text-indigo-500" />
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <div className="relative group mb-4">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="appearance-none border-2 border-gray-200 dark:border-gray-600 rounded-lg w-full py-3 px-4 pl-12 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:ring-2 focus:ring-rose-500 dark:focus:ring-indigo-500 focus:border-transparent transition-all duration-300 ease-in-out dark:bg-gray-700"
                />
                <Lock className="absolute left-3 top-3 h-6 w-6 text-gray-400 transition-all duration-300 group-focus-within:text-rose-500 dark:group-focus-within:text-indigo-500" />
              </div>
            </div>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center m-2">
            <button
              className="w-full bg-gradient-to-r from-rose-500 to-indigo-500 hover:from-rose-600 hover:to-indigo-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg flex items-center justify-center"
              onClick={handleLogin}
            >
              Login
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
          <p className="inline-block align-baseline font-bold text-sm text-rose-500 hover:text-indigo-500 transition-colors duration-300 ease-in-out cursor-pointer">
            <Link to={"/signup"} className="text-blue-500 underline">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginMain;
