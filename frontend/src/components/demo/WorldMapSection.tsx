"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function WorldMapSection() {
  const router = useRouter();
  const [slid, setSlid] = useState(false);

  const handleSlide = () => {
    setSlid(true);
    setTimeout(() => router.push("/login"), 1000); // Navigate after slide
  };

  return (
    <div className="h-screen w-full bg-black flex flex-col items-center justify-center text-white">
      {/* Big sahay.ai title */}
      <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
        sahay.ai
      </h1>

    

      {/* Slider to unlock */}
      <div className="mt-16 w-[300px] md:w-[400px] h-14 bg-gray-800 rounded-full relative overflow-hidden">
        <div
          className={`absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full flex items-center justify-center font-semibold transition-all duration-700 ${
            slid ? "w-full" : "w-16 hover:w-20 cursor-pointer"
          }`}
          onClick={handleSlide}
        >
          {slid ? "Redirecting..." : "→"}
        </div>
        {!slid && (
          <p className="text-center text-gray-400 pt-4 text-sm">
            Slide to unlock
          </p>
        )}
      </div>
    </div>
  );
}
