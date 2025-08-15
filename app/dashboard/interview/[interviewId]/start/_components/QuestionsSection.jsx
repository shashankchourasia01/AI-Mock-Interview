import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

const QuestionsSection = ({ mockInterviewQuestions, acvtiveQuestionIndex }) => {

  const textToSpeach = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Text-to-speech is not supported in this browser.");
    }
  };

  return (
    mockInterviewQuestions && (
      <div className="p-5 border rounded-lg bg-white shadow-sm my-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockInterviewQuestions &&
            mockInterviewQuestions.map((question, index) => (
              <h2
                key={index}
                className={`p-3 rounded-full text-xs sm:text-sm text-center cursor-pointer transition-all duration-200
                ${
                  acvtiveQuestionIndex === index
                    ? "bg-blue-600 text-white shadow-md scale-105"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                Question #{index + 1}
              </h2>
            ))}
        </div>

        <h2 className="my-5 text-sm md:text-lg">
          {mockInterviewQuestions[acvtiveQuestionIndex]?.question}
        </h2>

        <Volume2
          className="cursor-pointer"
          onClick={() =>
            textToSpeach(
              mockInterviewQuestions[acvtiveQuestionIndex]?.question
            )
          }
        />

        <div className="border rounded-lg p-5 bg-blue-100 text-blue-700 mt-20">
          <h2 className="flex gap-2 items-center">
            <Lightbulb />
            <strong>Note:</strong>
          </h2>
          <h2 className="text-sm text-blue-700 my-2">
            {process.env.NEXT_PUBLIC_QUESTION_NOTES}
          </h2>
        </div>
      </div>
    )
  );
};

export default QuestionsSection;