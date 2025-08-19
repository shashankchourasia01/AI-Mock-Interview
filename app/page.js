import Image from "next/image";
// import { Button } from "@/components/ui/button"

export default function Home() {
  return (
  <div>
    <h2 className="text-2xl text-blue-700 font-bold text-center mt-10">
      This is AI-Mock Interview Platform <br />
      {/* <Button className="font-bold text-blue-700">Button</Button> */}
    </h2>
    <h2 className="text-2xl text-blue-700 font-bold text-center mt-10">
      Go to Dashboard Page to start the interview process
    </h2>
  </div>
  );
}
