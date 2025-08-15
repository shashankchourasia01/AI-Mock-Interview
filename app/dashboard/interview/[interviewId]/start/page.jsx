"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnsSection from "./_components/RecordAnsSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const StartInterview = ({ params }) => {
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestions, setMockInterviewQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [acvtiveQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    try {
      setLoading(true);

      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));

      if (result.length > 0) {
        const data = result[0];
        setInterviewData(data);

        // Parse mock interview questions safely
        if (data.jsonMockResp) {
          try {
            const jsonMockResp = JSON.parse(result[0].jsonMockResp);
            console.log(jsonMockResp);
            setMockInterviewQuestions(jsonMockResp);
          } catch (parseErr) {
            console.error("Error parsing mock response JSON:", parseErr);
          }
        }
      } else {
        setError("Interview not found");
      }
    } catch (err) {
      console.error("Error fetching interview:", err);
      setError("Failed to load interview data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-black">
      {/* {loading && <p>Loading interview...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && <p>Start Interview</p>} */}
      <div className="grid grid-cols1 md:grid-cols-2 gap-10">
        {/*Question*/}
        <QuestionsSection
          mockInterviewQuestions={mockInterviewQuestions}
          acvtiveQuestionIndex={acvtiveQuestionIndex}
        />

        {/*Video/Audio Recording*/}

        <RecordAnsSection
          mockInterviewQuestions={mockInterviewQuestions}
          acvtiveQuestionIndex={acvtiveQuestionIndex}
          interviewData={interviewData}
        />
      </div>
      <div
        className="flex justify-end gap-6"
        
      >
        {acvtiveQuestionIndex > 0 && (
          <Button className="bg-blue-700 text-white font-bold"
          onClick={() => setActiveQuestionIndex(acvtiveQuestionIndex-1)}
          >
            Previous Question
          </Button>
        )}
        {acvtiveQuestionIndex != mockInterviewQuestions?.length - 1 && (
          <Button
            className="bg-blue-700 text-white font-bold"
            onClick={() => setActiveQuestionIndex(acvtiveQuestionIndex+1)}
          >
            Next Question
          </Button>
        )}
        {acvtiveQuestionIndex == mockInterviewQuestions?.length - 1 && (
          <Link href={'/dashboard/interview/'+interviewData?.mockId+"/feedback"}>
          <Button className="bg-blue-700 text-white font-bold">
            End Interview
          </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default StartInterview;
