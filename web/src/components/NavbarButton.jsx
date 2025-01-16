import { Link, useLocation } from "react-router-dom";

const NavbarButton = () => {
  const location = useLocation();

  // Determine the visibility, text, and destination based on the current path
  let buttonConfig = { isVisible: false, text: "", to: "" };

  if (location.pathname === "/Home") {
    // Show "Submit Response" button on the feed page
    buttonConfig.isVisible = true;
    buttonConfig.text = "Submit Response";
    buttonConfig.to = "/myexperince";
  } else if (location.pathname === "/myexperince") {
    // Show "Dashboard" button on the myresponse page
    buttonConfig.isVisible = true;
    buttonConfig.text = "Dashboard";
    buttonConfig.to = "/Home";
  } else if (location.pathname === "/mysubmission") {
    // Show "Dashboard" button on the myresponse page
    buttonConfig.isVisible = true;
    buttonConfig.text = "Dashboard";
    buttonConfig.to = "/Home";
  } else if (location.pathname === "/profile") {
    // Show "Dashboard" button on the myresponse page
    buttonConfig.isVisible = true;
    buttonConfig.text = "Dashboard";
    buttonConfig.to = "/Home";
  }

  return (
    <>
      {buttonConfig.isVisible && (
        <Link
          to={buttonConfig.to}
          className="origin absolute right-0 bg-gradient-to-r from-rose-500 to-indigo-500 hover:from-rose-600 hover:to-indigo-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg flex items-center justify-center"
        >
          {buttonConfig.text}
        </Link>
      )}
    </>
  );
};

export default NavbarButton;
