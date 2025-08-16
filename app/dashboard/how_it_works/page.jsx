"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  UserPlus,
  LayoutDashboard,
  Briefcase,
  FileText,
  CalendarClock,
  Bot,
  Camera,
  Mic,
  Save,
  ChartNoAxesColumn,
  Undo2,
  Play,
} from "lucide-react";

const steps = [
  {
    title: "Sign up / Sign in",
    icon: <UserPlus className="h-5 w-5 text-black" />,
    body:
      "Authenticate with Clerk to access your personal dashboard. Your sessions are secure and persistent.",
    tip: "Already a user? Just sign in to jump straight to your dashboard.",
  },
  {
    title: "Open Dashboard",
    icon: <LayoutDashboard className="h-5 w-5 text-black" />,
    body:
      "From the dashboard, create a new mock interview or revisit your previous ones.",
    tip: "The dashboard is your hub for progress and quick actions.",
  },
  {
    title: "Add Interview Details",
    icon: <Briefcase className="h-5 w-5 text-black" />,
    body:
      "Enter your Job Role, Job Description, and Years of Experience to tailor the interview.",
    tip: "Be specific in the description to get sharper questions.",
  },
  {
    title: "Generate Questions (AI)",
    icon: <Bot className="h-5 w-5 text-black" />,
    body:
      "Gemini AI generates 5 relevant interview questions based on your inputs.",
    tip: "Questions adapt to your role and experience level.",
  },
  {
    title: "Enable Camera & Mic",
    icon: (
      <div className="flex gap-2">
        <Camera className="h-5 w-5 text-black" />
        <Mic className="h-5 w-5 text-black" />
      </div>
    ),
    body:
      "Turn on your webcam and microphone for a realistic mock interview environment.",
    tip: "Use a quiet space and test your mic before starting.",
  },
  {
    title: "Answer & Save",
    icon: <Save className="h-5 w-5 text-black" />,
    body:
      "Record your answers one-by-one. Each response is saved to PostgreSQL via Drizzle ORM.",
    tip: "Speak clearly and keep answers structured: Situation → Action → Result.",
  },
  {
    title: "AI Feedback & Rating",
    icon: <ChartNoAxesColumn className="h-5 w-5 text-black" />,
    body:
      "After completing, the AI provides feedback, a rating, and the correct answers.",
    tip: "Use the feedback to iterate and improve quickly.",
  },
  {
    title: "Review Past Interviews",
    icon: <Undo2 className="h-5 w-5 text-black" />,
    body:
      "Open previous sessions from the dashboard and jump directly to any part of an interview.",
    tip: "Track progress over time and re-practice tough questions.",
  },
];

export default function HowItWorksPage() {
  const [active, setActive] = React.useState(0);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-white">
      {/* Hero / Header */}
      <section className="mx-auto max-w-6xl px-4 pt-8 pb-4 text-black">
        <div className="rounded-2xl bg-gradient-to-br from-blue-50 via-white to-purple-50 border text-black p-6 md:p-10 shadow-sm">
          <div className="flex flex-col md:flex-row text-black md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                How the AI Mock Interview Works
              </h1>
              <p className="mt-2 text-gray-600">
                Practice interviews with real-time camera & mic, AI-generated
                questions, recorded answers, and instant feedback.
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/dashboard">
                <Button className="font-semibold">
                  <Play className="h-4 w-4 mr-2 text-black" />
                  Go to Dashboard
                </Button>
              </Link>
              <a
                href="#steps"
                className="inline-flex items-center text-blue-700 hover:underline"
              >
                See Steps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stepper */}
      <section id="steps" className="mx-auto max-w-6xl text-black px-4 py-6">
        <div className="grid md:grid-cols-12 gap-6">
          {/* Left: Steps List */}
          <div className="md:col-span-4 ">
            <div className="rounded-xl border bg-white shadow-sm">
              <div className="p-4 border-b">
                <h2 className="font-semibold text-gray-900">Step-by-step</h2>
                <p className="text-sm text-gray-600">
                  Click a step to learn what to do.
                </p>
              </div>
              <ol className="divide-y">
                {steps.map((step, idx) => (
                  <li
                    key={idx}
                    className={`p-4 cursor-pointer transition ${
                      active === idx
                        ? "bg-blue-50"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setActive(idx)}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex items-center justify-center rounded-full h-8 w-8 border ${
                          active === idx
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-700"
                        }`}
                      >
                        {idx + 1}
                      </div>
                      <div className="flex items-center gap-2 text-gray-900 font-medium">
                        {step.icon}
                        <span>{step.title}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Right: Active Step Detail */}
          <div className="md:col-span-8">
            <div className="rounded-xl border bg-white shadow-sm p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-full h-10 w-10 bg-blue-600 text-white flex items-center justify-center">
                  {active + 1}
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                  {steps[active].title}
                </h3>
              </div>
              <p className="mt-4 text-gray-700">{steps[active].body}</p>
              <div className="mt-4 rounded-lg bg-blue-50 border border-blue-100 p-4 text-blue-800 text-sm">
                <strong>Tip:</strong> {steps[active].tip}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  onClick={() => setActive((p) => Math.max(0, p - 1))}
                  disabled={active === 0}
                >
                  Previous
                </Button>
                <Button
                  onClick={() =>
                    setActive((p) => Math.min(steps.length - 1, p + 1))
                  }
                >
                  Next
                </Button>
                <Link href="/dashboard">
                  <Button variant="secondary">Open Dashboard</Button>
                </Link>
              </div>
            </div>

            {/* FAQ (Collapsible) */}
            <div className="mt-6 rounded-xl border bg-white shadow-sm p-6">
              <h4 className="text-lg font-semibold text-gray-900">
                Quick FAQs
              </h4>
              <div className="mt-3 space-y-2">
                <Collapsible>
                  <CollapsibleTrigger className="w-full text-left p-3 bg-gray-50 rounded-md hover:bg-gray-100">
                    Do I need to enable camera & mic?
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-3 text-gray-700">
                    Yes, if you want the real interview feel. You can still
                    practice without them, but enabling both gives the best
                    experience.
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible>
                  <CollapsibleTrigger className="w-full text-left p-3 bg-gray-50 rounded-md hover:bg-gray-100">
                    Where are my answers stored?
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-3 text-gray-700">
                    Your responses are stored in PostgreSQL via Drizzle ORM.
                    They’re tied to your account and accessible from your
                    dashboard.
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible>
                  <CollapsibleTrigger className="w-full text-left p-3 bg-gray-50 rounded-md hover:bg-gray-100">
                    How is feedback generated?
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-3 text-gray-700">
                    Gemini AI analyzes your answer against the question and
                    provides a rating, the correct answer, and areas to improve.
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="mt-8 rounded-2xl border p-6 md:p-8 bg-gray-50 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h5 className="text-xl font-semibold text-gray-900">
              Ready to practice your next interview?
            </h5>
            <p className="text-gray-600">
              Add your role & experience, generate questions, and start
              answering with camera & mic.
            </p>
          </div>
          <Link href="/dashboard">
            <Button className="font-semibold">Start from Dashboard</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
