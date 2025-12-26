import { Button } from "@/components/ui/button";
import Image from "next/image";
// import { Button } from "@/components/ui/button"

export default function Home() {
  return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h2 className="text-2xl text-blue-700 font-bold text-center mt-10">
      This is AI-Mock Interview Platform <br />
      {/* <Button className="font-bold text-blue-700">Button</Button> */}
    </h2>
    <h2 className="text-2xl text-blue-700 font-bold text-center mt-10">
      Go to Dashboard Page to start the interview process
    </h2>
    <Button className='text-blue-700 font-bold mt-10 ml-10 bg-gray-300 hover:bg-gray-400 flex text-center'>
      <a href="/dashboard" className="text-black">
        Go to Dashboard
      </a>
    </Button>
  </div>
  );
}
