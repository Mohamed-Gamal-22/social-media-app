import React from "react";

export default function AuthButton({text}) {
  return (
    <button
      type="submit"
      className="rounded-lg text-white w-full hover:from-[#a044ff] hover:to-[#6a3093] transition-colors bg-linear-to-r mt-4 from-[#6a3093] to-[#a044ff] p-3 cursor-pointer duration-300"
    >
      {text}
    </button>
  );
}
