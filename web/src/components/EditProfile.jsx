import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { UserIcon, BriefcaseIcon, BadgeIcon } from "lucide-react";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [workEx, setWorkEx] = useState(user.workEx);
  const [jobTitle, setjobTitle] = useState(user.jobTitle);

  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const saveProfile = async () => {
    //Clear Errors
    setError("");
    try {
      const res = await axios.patch(
        "http://localhost:7777/profile/edit",
        {
          firstName,
          lastName,
          workEx,
          jobTitle,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
          {/* Header */}
          <div className="px-6 py-8 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Edit Profile
            </h2>
            <p className="mt-2 text-center text-gray-600">
              Update your personal information
            </p>
          </div>

          {/* Form */}
          <div className="p-6 space-y-6">
            {/* First Name */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <UserIcon className="w-4 h-4 text-gray-500" />
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                placeholder="Enter your first name"
              />
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <UserIcon className="w-4 h-4 text-gray-500" />
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                placeholder="Enter your last name"
              />
            </div>

            {/* Work Experience */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <BriefcaseIcon className="w-4 h-4 text-gray-500" />
                Work Experience
              </label>
              <input
                type="text"
                value={workEx}
                onChange={(e) => setWorkEx(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                placeholder="Years of experience"
              />
            </div>

            {/* Job Title */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <BadgeIcon className="w-4 h-4 text-gray-500" />
                Job Title
              </label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setjobTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                placeholder="Enter your job title"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="px-4 py-3 rounded-lg bg-red-50 border border-red-200">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-8 bg-gray-50 rounded-b-2xl">
            <button
              onClick={saveProfile}
              className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
