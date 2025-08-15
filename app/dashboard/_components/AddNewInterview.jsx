"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle, Plus } from "lucide-react";
import { generateInterviewQA } from "@/utils/GeminiAIModel";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from 'uuid';
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";
import { useRouter } from "next/navigation";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [JsonResponse, setJsonResponse] = useState([]);
  const router = useRouter();
  const { user } = useUser();

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    let cleanedResponse = null;
  
    try {
      const result = await generateInterviewQA({
        position: jobPosition,
        stack: jobDescription,
        experience: jobExperience
      });
  
      // Clean up the response
      cleanedResponse = result.replace(/```json/g, '').replace(/```/g, '').trim();
      
      // Parse the JSON response
      const questionsData = JSON.parse(cleanedResponse);
      setJsonResponse(questionsData);

      // Insert into database
      const resp = await db.insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: cleanedResponse,
          jobPosition,
          jobDescription,
          jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-YYYY")
        })
        .returning({ mockId: MockInterview.mockId });

      if (resp && resp[0]?.mockId) {
        setOpenDialog(false);
        router.push(`/dashboard/interview/${resp[0].mockId}`);
      } else {
        throw new Error("Failed to get response ID from database");
      }
      
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "Failed to generate interview questions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={`relative ${openDialog ? "bg-gray-100/50" : ""}`}>
      {/* Semi-transparent overlay when dialog is open */}
      {openDialog && (
        <div className="fixed inset-0 bg-gray-100/50 backdrop-blur-sm z-0" />
      )}

      <div
        className={`p-6 md:p-10 border-2 border-dashed rounded-lg bg-gray-50 hover:scale-[1.02] hover:shadow-lg cursor-pointer transition-all flex flex-col items-center justify-center gap-2 relative z-10 ${
          isHovered ? "border-blue-500" : "border-gray-300"
        }`}
        onClick={() => setOpenDialog(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Plus
          className={`h-6 w-6 md:h-8 md:w-8 transition-colors ${
            isHovered ? "text-blue-500" : "text-gray-400"
          }`}
          strokeWidth={2.5}
        />
        <h2 className="text-base md:text-lg font-medium text-gray-600">
          Add New Interview
        </h2>
        <p className="text-xs md:text-sm text-gray-400 text-center">
          Click to create a new interview session
        </p>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-[95vw] sm:max-w-md md:max-w-xl lg:max-w-2xl w-full mx-2 bg-white">
          <DialogHeader>
            <DialogTitle className="font-black text-xl sm:text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Tell us more about your job description
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              <form onSubmit={onSubmit}>
                <div className="space-y-4 md:space-y-6">
                  <div className="space-y-1">
                    <h2 className="text-xs sm:text-sm font-medium text-gray-600">
                      Add Detail about your job position/role, job description
                      and years of experience
                    </h2>
                    <div className="h-1 w-16 sm:w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  </div>

                  <div className="space-y-4 md:space-y-6">
                    <div className="space-y-1 md:space-y-2">
                      <label className="block text-xs sm:text-sm font-medium text-gray-700">
                        Job Role/Job Position
                      </label>
                      <Input
                        placeholder="Ex. Full Stack Developer"
                        className="focus-visible:ring-blue-500 focus-visible:ring-offset-2 text-xs sm:text-sm bg-white"
                        required
                        onChange={(e) => setJobPosition(e.target.value)}
                        value={jobPosition}
                      />
                    </div>
                    <div className="space-y-1 md:space-y-2">
                      <label className="block text-xs sm:text-sm font-medium text-gray-700">
                        Job Description/Tech Stack
                      </label>
                      <Textarea
                        placeholder="React.js, Node.js, Java, MySQL etc..."
                        className="min-h-[100px] md:min-h-[120px] focus-visible:ring-blue-500 focus-visible:ring-offset-2 text-xs sm:text-sm bg-white"
                        required
                        onChange={(e) => setJobDescription(e.target.value)}
                        value={jobDescription}
                      />
                      <p className="text-xs text-gray-500">
                        Separate technologies with commas
                      </p>
                    </div>
                    <div className="space-y-1 md:space-y-2">
                      <label className="block text-xs sm:text-sm font-medium text-gray-700">
                        Years of Experience
                      </label>
                      <Input
                        placeholder="Ex.2"
                        type="number"
                        min="0"
                        className="focus-visible:ring-blue-500 focus-visible:ring-offset-2 text-xs sm:text-sm bg-white"
                        required
                        onChange={(e) => setJobExperience(e.target.value)}
                        value={jobExperience}
                      />
                    </div>
                  </div>
                  {error && (
                    <div className="text-red-500 text-sm">{error}</div>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-end mt-6 md:mt-8">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpenDialog(false)}
                    className="hover:bg-gray-100 w-full sm:w-auto"
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all w-full sm:w-auto text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? <><LoaderCircle className="animate-spin" />'Generating From AI' </>: "Start Interview"}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;