import React from "react";

export default function AuthHeader({ text }) {
  return (
    <div className="rounded-lg bg-linear-to-r mt-8 from-[#6a3093] to-[#a044ff] p-3">
      <h1 className="text-center md:text-4xl text-2xl font-bold my-8 text-white">
        {text}
      </h1>
    </div>
  );
}
