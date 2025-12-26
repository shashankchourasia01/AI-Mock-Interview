"use client";
import React from "react";

const plans = [
  {
    title: "Free Plan",
    price: "$0 / month",
    interviews: "2 Mock Interviews / day",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  },
  {
    title: "Premium",
    price: "$10 / month",
    interviews: "5 Mock Interviews / day",
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    highlight: true,
  },
  {
    title: "Pro Premium",
    price: "$20 / month",
    interviews: "Unlimited Mock Interviews",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  },
];

const page = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-blue-700">
          Upgrade Your Interview Experience
        </h1>
        <p className="text-gray-600 mt-3 max-w-xl mx-auto">
          Choose a plan that fits your preparation needs and level up your
          interview practice.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`bg-white border rounded-2xl overflow-hidden transition-all
              hover:shadow-lg hover:border-blue-500
              ${plan.highlight ? "border-blue-600 shadow-md" : ""}
            `}
          >
            {/* Image */}
            <img
              src={plan.img}
              alt={plan.title}
              className="w-full h-40 object-cover"
            />

            {/* Content */}
            <div className="p-6 text-center">
              <h2 className="text-xl font-semibold text-gray-800">
                {plan.title}
              </h2>
              <p className="text-blue-700 font-bold text-2xl mt-2">
                {plan.price}
              </p>

              <div className="mt-4 text-gray-600">
                {plan.interviews}
              </div>

              <button
                className={`mt-6 w-full py-2 rounded-xl font-medium transition
                  ${
                    plan.highlight
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "border border-blue-600 text-blue-600 hover:bg-blue-50"
                  }
                `}
              >
                {plan.title === "Free Plan" ? "Current Plan" : "Upgrade Now"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
