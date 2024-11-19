import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

function QuestionManagement() {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answerModal, setAnswerModal] = useState(false);

  // Fetch questions from a mock API
  useEffect(() => {
    axios
      .get("https://673be57196b8dcd5f3f7d05a.mockapi.io/hair-salon/question")
      .then((response) => setQuestions(response.data))
      .catch(() => toast.error("Failed to fetch questions"));
  }, []);

  // Toggle answer modal
  const toggleAnswerModal = (question = null) => {
    setSelectedQuestion(question);
    setAnswerModal(!answerModal);
  };

  // Handle answer submission
  const handleAnswerSubmit = () => {
    // Simulate sending an answer to the server
    toast.success(`Answer sent to: ${selectedQuestion?.customerEmail}`);
    toggleAnswerModal();
  };

  return (
    <div>
      <div className="mt-10 font-bold text-lg md:text-xl text-center uppercase tracking-wider">
        Customer Questions
      </div>
      <div className="mt-6 px-6">
        <table className="w-full">
          <thead>
            <tr>
              <th className="py-3 px-2 font-semibold text-center">ID</th>
              <th className="py-3 px-2 font-semibold text-center">
                Customer Email
              </th>
              <th className="py-3 px-2 font-semibold text-center">Question</th>
              <th className="py-3 px-2 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question) => (
              <tr key={question.id} className="text-center">
                <td className="py-3 px-2 border-r border-gray-300">
                  {question.id}
                </td>
                <td className="py-3 px-2 border-r border-gray-300">
                  {question.customerEmail}
                </td>
                <td className="py-3 px-2 border-r border-gray-300">
                  {question.question}
                </td>
                <td className="py-3 px-2">
                  <button
                    onClick={() => toggleAnswerModal(question)}
                    className="border px-4 py-1 hover:bg-gray-700 hover:text-white transition"
                  >
                    Answer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Answer Modal */}
      {answerModal && (
        <div className="modal">
          <div
            className="bg-black opacity-50 fixed w-full h-full"
            onClick={toggleAnswerModal}
          ></div>
          <div className="modal-content fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-bold mb-4">Answer Question</h2>
            <p className="mb-4">
              <strong>Customer Email:</strong> {selectedQuestion?.customerEmail}
            </p>
            <p className="mb-4">
              <strong>Question:</strong> {selectedQuestion?.question}
            </p>
            <textarea
              rows="4"
              className="w-full border p-2 mb-4"
              placeholder="Type your answer here..."
            ></textarea>
            <div className="flex justify-between">
              <button
                onClick={handleAnswerSubmit}
                className="bg-black text-white px-4 py-2 hover:bg-gray-800"
              >
                Submit
              </button>
              <button
                onClick={toggleAnswerModal}
                className="bg-white text-black border px-4 py-2 hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuestionManagement;
