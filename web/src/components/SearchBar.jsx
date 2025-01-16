import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const location = useLocation();

  // Determine the visibility, text, and destination based on the current path
  let SearchConfig = { isVisible: false, text: "", to: "" };

  if (location.pathname === "/Home") {
    // Show "Submit Response" button on the feed page
    SearchConfig.isVisible = true;
  } else if (location.pathname === "/search") {
    SearchConfig.isVisible = true;
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${query.trim()}`);
      setQuery(""); // Clear the input after redirection
    }
  };
  return (
    <>
      {SearchConfig.isVisible && (
        <div className="flex-grow flex justify-center">
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
        </div>
      )}
    </>
  );
};

export default SearchBar;
