"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    GetInterviewDetails();
  }, [params.interviewId]);

  const GetInterviewDetails = async () => {
    try {
      setLoading(true);
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));

      if (result.length > 0) {
        setInterviewData(result[0]);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="font-bold text-2xl animate-pulse">Loading interview data...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="font-bold text-2xl text-red-500">{error}</h2>
        </div>
      </div>
    );
  }

  if (!interviewData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="font-bold text-2xl">No interview data found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
          Let's Get Started
        </h2>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Webcam Section */}
          <div className="w-full lg:w-1/2 bg-white rounded-xl shadow-md overflow-hidden p-4 transition-all duration-300 hover:shadow-lg">
            <div className="flex flex-col items-center">
              {webCamEnabled ? (
                <Webcam
                  onUserMedia={() => setWebCamEnabled(true)}
                  onUserMediaError={() => setWebCamEnabled(false)}
                  mirrored={true}
                  className="rounded-lg w-full h-auto max-h-[400px] object-cover"
                />
              ) : (
                <>
                  <div className="relative w-full aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <WebcamIcon className="h-24 w-24 text-gray-400" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button 
                        onClick={() => setWebCamEnabled(true)}
                        className="absolute z-10 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg transition-all hover:scale-105"
                      >
                        Enable Web Cam and Microphone
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Information Section */}
          <div className="w-full lg:w-1/2 bg-white rounded-xl shadow-md overflow-hidden p-6 transition-all duration-300 hover:shadow-lg">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
                  Interview Details
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="font-medium text-gray-700 min-w-[180px]">Job Role:</span>
                    <span className="text-gray-900">{interviewData.jobPosition}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="font-medium text-gray-700 min-w-[180px]">Tech Stack:</span>
                    <span className="text-gray-900">{interviewData.jobDescription}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="font-medium text-gray-700 min-w-[180px]">Experience:</span>
                    <span className="text-gray-900">{interviewData.jobExperience} years</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-blue-800">Information</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  {process.env.NEXT_PUBLIC_INFORMATION || "Additional instructions will appear here."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Start Button Section - Added at the bottom right */}
        <div className="flex justify-end mt-8">
          <Link href={'/dashboard/interview/'+params.interviewId+'/start'}>
          <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg shadow-md hover:shadow-lg transition-all">
            Start Interview
          </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Interview;