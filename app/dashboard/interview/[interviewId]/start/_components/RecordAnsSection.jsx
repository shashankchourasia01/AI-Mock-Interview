"use client";

import Image from "next/image";
import Webcam from "react-webcam";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";
import { toast } from "sonner";
import {chatSession}  from "@/utils/GeminiAIModel";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import moment from "moment";
import { useUser } from "@clerk/nextjs";

const RecordAnsSection = ({
  mockInterviewQuestions,
  acvtiveQuestionIndex,
  interviewData,
}) => {
  const {user} = useUser();
  const [loading, setLoading] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,

  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.map((result) => {
      setUserAnswer(prevAns => prevAns + result?.transcript);
    });
  }, [results]);

  useEffect(() => {
    if(!isRecording && userAnswer.length>10){
      UpdateUserAnswer();
    }
  },[userAnswer])

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
      
    } else {
      if (!isRecording) {
        startSpeechToText();
      } else {
        toast("Already recording...");
      }
    }
  };

  const UpdateUserAnswer = async () => {
    console.log(userAnswer);
    
    setLoading(true);
    const feedbackPrompt =
        "Question:" +
        mockInterviewQuestions[acvtiveQuestionIndex]?.question +
        ", User Answer:" +
        userAnswer +
        ",Depends on question and user answer for given interview question" +
        "please give us rating for answer and feedback as area of improvement if any" +
        "in just 3 to 5 line to improve it in JSON format with rating and feedback field";

      const result = await chatSession.sendMessage(feedbackPrompt);

      const mockJsonResp = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");
      console.log(mockJsonResp);
      const JsonFeedbackResp = JSON.parse(mockJsonResp);

      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestions[acvtiveQuestionIndex]?.question,
        correctAns: mockInterviewQuestions[acvtiveQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: JsonFeedbackResp?.feedback,
        rating: JsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-YYYY"),
      });

      if (resp) {
        toast("Your answer has been saved successfully!");
        setUserAnswer('');
        setResults([]);
      }
      setResults([]);
      setLoading(false);
  }

 
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col justify-center my-20 mt-20 items-center rounded-lg bg-black p-5">
        <Image
          src="/webcam img.png"
          width={200}
          height={200}
          className="absolute"
          alt="webcam"
        />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>
      <Button
        disabled={loading}
        variant="outline"
        className="my-5 cursor-pointer bg-gray-100 font-bold"
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <h2 className="text-red-600 flex gap-2">
            <Mic />
            Stop Recording...
          </h2>
        ) : (
          "Record Answer"
        )}
      </Button>

      {/* <Button onClick={() => console.log(userAnswer)}>show user answer</Button> */}
    </div>
  );
};

export default RecordAnsSection;
