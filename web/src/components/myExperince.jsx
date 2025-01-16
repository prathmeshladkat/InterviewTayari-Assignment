import { useEffect, useState } from "react";
import axios from "axios";
import {
  User,
  Building2,
  MapPin,
  MinusCircle,
  Loader2,
  Send,
  FileQuestion,
  AlertCircle,
  Plus,
} from "lucide-react";

const SubmissionDetail = () => {
  const [submission, setSubmission] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    company: "",
    questions: [""],
  });
  const [showToast, setShowToast] = useState(false);

  const fetchSubmission = async () => {
    try {
      const response = await axios.post(
        "http://localhost:7777/mysubmissions",
        {},
        { withCredentials: true }
      );
      setSubmission(response.data);
    } catch (error) {
      console.error("Failed to fetch submission:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...formData.questions];
    newQuestions[index] = value;
    setFormData({ ...formData, questions: newQuestions });
  };

  const addQuestionField = () => {
    setFormData({ ...formData, questions: [...formData.questions, ""] });
  };

  const removeQuestionField = (index) => {
    const newQuestions = formData.questions.filter((_, i) => i !== index);
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:7777/mysubmissions",
        formData,
        { withCredentials: true }
      );

      setSubmission(response.data);
      setShowToast(true);
      await new Promise((resolve) => setTimeout(resolve, 3000));

      setShowToast(false);
    } catch (error) {
      console.error("Failed to create submission:", error);
    }
  };

  useEffect(() => {
    fetchSubmission();
  }, []);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
          <div className="flex items-center gap-3 mb-8">
            <FileQuestion className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-800">
              Create a New Submission
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-700 font-medium">
                <User className="w-4 h-4" />
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-700 font-medium">
                <MapPin className="w-4 h-4" />
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-700 font-medium">
                <Building2 className="w-4 h-4" />
                Company
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                required
              />
            </div>

            <div className="space-y-4">
              <label className="flex items-center gap-2 text-gray-700 font-medium">
                <AlertCircle className="w-4 h-4" />
                Interview Questions
              </label>
              {formData.questions.map((question, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-500 text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <input
                    type="text"
                    value={question}
                    onChange={(e) =>
                      handleQuestionChange(index, e.target.value)
                    }
                    className="flex-1 border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder={`Question ${index + 1}`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeQuestionField(index)}
                    className="text-red-500 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <MinusCircle className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addQuestionField}
                className="flex items-center gap-2 text-blue-500 hover:text-blue-600 font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Question
              </button>
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
            >
              <Send className="w-4 h-4" />
              Submit Interview Details
            </button>
          </form>
          {showToast && (
            <div className="fixed bottom-4 right-4 w-80 p-4 bg-green-100 border border-green-300 rounded-lg shadow-lg">
              <div className="flex items-center gap-3">
                <svg
                  className="w-6 h-6 text-green-600"
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
                <span className="text-sm font-medium text-green-800">
                  Responce Submitted Sucssefully.
                </span>
              </div>
            </div>
          )}
        </div>

        {submission && (
          <div className="bg-white rounded-xl shadow-md p-8 mt-8 border border-gray-200">
            <div className="flex items-center gap-3 pb-6 border-b">
              <Building2 className="w-6 h-6 text-blue-500" />
              <h2 className="text-2xl font-bold text-gray-800">
                {submission.company}
              </h2>
            </div>

            <div className="space-y-4 mt-6">
              <div className="flex items-center gap-2 text-gray-600">
                <User className="w-4 h-4" />
                <span>
                  <strong className="text-gray-700">Submitted by:</strong>{" "}
                  {submission.name}
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>
                  <strong className="text-gray-700">Country:</strong>{" "}
                  {submission.country}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Interview Questions:
              </h3>
              <div className="space-y-3">
                {submission.questions.map((question, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-gray-50"
                  >
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-sm flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{question}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmissionDetail;
