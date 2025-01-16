import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";

// Card component
const Card = ({ children, onClick }) => (
  <div
    className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
    onClick={onClick}
  >
    {children}
  </div>
);

// Modal component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full max-h-[80vh] overflow-y-auto">
        <button
          className="float-right text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

const InterviewFeeds = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get("http://localhost:7777/feed", {
          withCredentials: true,
        });
        setSubmissions(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching submissions:", err);
        setError(
          err.response?.data || "Failed to fetch data. Please try again later."
        );
        if (err.response?.status === 401) {
          alert("Session expired. Please log in again.");
          window.location.href = "/login";
        }
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Interview Submissions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {submissions.map((submission) => (
          <Card
            key={submission._id}
            onClick={() => setSelectedSubmission(submission)}
          >
            <h3 className="font-bold text-lg mb-2">{submission.companyName}</h3>
            <p>
              <strong>User:</strong> {submission.name}
            </p>
            <p>
              <strong>Country:</strong> {submission.country}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {format(new Date(submission.createdAt), "PP")}
            </p>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={!!selectedSubmission}
        onClose={() => setSelectedSubmission(null)}
      >
        {selectedSubmission && (
          <div>
            <h3 className="font-bold text-xl mb-4">
              {selectedSubmission.companyName} Interview Details
            </h3>
            <p>
              <strong>User:</strong> {selectedSubmission.name}
            </p>
            <p>
              <strong>Country:</strong> {selectedSubmission.country}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {format(new Date(selectedSubmission.createdAt), "PPP")}
            </p>
            <div className="mt-4">
              <strong>Questions:</strong>
              <ul className="list-disc pl-5 mt-2">
                {selectedSubmission.questions.map((question, index) => (
                  <li key={index}>{question}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default InterviewFeeds;
