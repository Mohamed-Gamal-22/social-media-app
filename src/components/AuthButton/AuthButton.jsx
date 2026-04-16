import React from "react";
import { ImSpinner9 } from "react-icons/im";

export default function AuthButton({ text, status }) {
  return (
    <button
      disabled={status}
      type="submit"
      className="rounded-lg text-white w-full hover:from-[#a044ff] hover:to-[#6a3093] transition-colors bg-linear-to-r mt-4 from-[#6a3093] to-[#a044ff] p-3 cursor-pointer duration-300 disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-500 disabled:bg-linear-to-r flex items-center justify-center"
    >
      {status ? <ImSpinner9 className="animate-spin" /> : text}
    </button>
  );
}
