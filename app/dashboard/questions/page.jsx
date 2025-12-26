"use client";
import React, { useState } from "react";

const roles = [
  {
    title: "Frontend Developer",
    desc: "UI, performance, accessibility",
    questions: [
      "How does React optimize UI updates?",
      "What causes re-render in React?",
      "How do you improve frontend performance?",
    ],
  },
  {
    title: "Backend Developer",
    desc: "APIs, auth, server-side logic",
    questions: [
      "How JWT authentication works?",
      "Difference between REST and GraphQL?",
      "How do you handle errors in APIs?",
    ],
  },
  {
    title: "Full Stack Developer",
    desc: "Frontend, backend, system flow",
    questions: [
      "Explain complete request lifecycle",
      "How frontend communicates with backend?",
      "How do you scale a full-stack app?",
    ],
  },
  {
    title: "DevOps Engineer",
    desc: "CI/CD, cloud, deployment",
    questions: [
      "What is CI/CD pipeline?",
      "Difference between Docker and VM?",
      "How do you monitor applications?",
    ],
  },
  {
    title: "AI / ML Engineer",
    desc: "Models, training, evaluation",
    questions: [
      "Difference between supervised and unsupervised learning?",
      "What is overfitting?",
      "How do you evaluate ML models?",
    ],
  },
  {
    title: "Gen AI Engineer",
    desc: "LLMs, prompt, embeddings",
    questions: [
      "How large language models work?",
      "What are embeddings?",
      "How prompt engineering helps?",
    ],
  },
];

const Page = () => {
  const [activeRole, setActiveRole] = useState(null);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-blue-700">
          Interview Practice Questions
        </h1>
        <p className="text-gray-600 mt-3 max-w-xl mx-auto">
          Explore role-based sample interview questions to understand
          what interviewers usually ask.
        </p>
      </div>

      {/* Role Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role, index) => (
          <div
            key={index}
            onClick={() => setActiveRole(role)}
            className={`cursor-pointer bg-white border rounded-2xl p-6 transition-all
              hover:border-blue-500 hover:shadow-lg
              ${activeRole?.title === role.title ? "border-blue-600 shadow-md" : ""}
            `}
          >
            <div className="h-1 w-12 bg-blue-600 rounded mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-800">
              {role.title}
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              {role.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Questions Section */}
      {activeRole && (
        <div className="mt-14 bg-white border rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-blue-700 mb-6">
            {activeRole.title} – Sample Questions
          </h2>

          <div className="grid gap-4">
            {activeRole.questions.map((q, i) => (
              <div
                key={i}
                className="p-4 border rounded-xl bg-blue-50 text-gray-800"
              >
                {q}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
