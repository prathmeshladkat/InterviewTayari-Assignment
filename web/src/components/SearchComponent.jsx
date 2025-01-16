import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import {
  Building2,
  User,
  MapPin,
  Calendar,
  X,
  Loader2,
  ClipboardList,
  AlertCircle,
} from "lucide-react";

// Reusable Card Component
const Card = ({ children, onClick }) => (
  <div
    className="bg-gray-50 rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-gray-300 hover:-translate-y-1"
    onClick={onClick}
  >
    {children}
  </div>
);

// Reusable Modal Component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-xl">
        <button
          className="float-right text-gray-500 hover:text-gray-700 hover:rotate-90 transition-transform duration-200"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  );
};

function SearchResults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedResult, setSelectedResult] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7777/search?query=${query}`,
          {
            withCredentials: true,
          }
        );
        setResults(response.data);
      } catch (err) {
        console.error("Error fetching search results:", err);
        setError(
          err.response?.data || "Failed to fetch data. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        <AlertCircle className="w-6 h-6 mr-2" />
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3 mb-8">
          <ClipboardList className="w-8 h-8 text-blue-500" />
          <h2 className="text-3xl font-bold text-gray-800">Search Results</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((result) => (
            <Card key={result._id} onClick={() => setSelectedResult(result)}>
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-5 h-5 text-blue-500" />
                <h3 className="font-bold text-lg text-gray-800">
                  {result.company}
                </h3>
              </div>

              <div className="space-y-3 text-gray-600">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{result.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{result.country}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{format(new Date(result.createdAt), "PP")}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Modal isOpen={!!selectedResult} onClose={() => setSelectedResult(null)}>
        {selectedResult && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b">
              <Building2 className="w-6 h-6 text-blue-500" />
              <h3 className="font-bold text-2xl text-gray-800">
                {selectedResult.company} Interview Details
              </h3>
            </div>

            <div className="space-y-4 text-gray-600">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>
                  <strong className="text-gray-700">User:</strong>{" "}
                  {selectedResult.name}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>
                  <strong className="text-gray-700">Country:</strong>{" "}
                  {selectedResult.country}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>
                  <strong className="text-gray-700">Date:</strong>{" "}
                  {format(new Date(selectedResult.createdAt), "PPP")}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-bold text-lg text-gray-800 mb-4">
                Interview Questions
              </h4>
              <ul className="space-y-3">
                {selectedResult.questions.map((question, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-gray-50"
                  >
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-sm flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{question}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default SearchResults;
