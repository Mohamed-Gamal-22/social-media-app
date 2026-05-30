import React from "react";
import logo from "../../assets/Logo.webp";
import { CgProfile } from "react-icons/cg";
import { IoBookmarks } from "react-icons/io5";
import { IoMdPeople } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from "axios";
import ChangePasswordModal from "../../components/ChangePasswordModal/ChangePasswordModal";

export default function Profile() {


  return (
    <div className="flex flex-wrap min-h-screen bg-red-300 p-4">
      <div className="w-1/5 p-4 bg-slate-200">
        <div className="w-full">
          <img
            src={logo}
            alt=""
            width={100}
            className="rounded-full mx-auto bg-main my-8 p-1 shadow-xl"
          />
          <ul className="my-4 flex flex-col gap-6 mt-8 items-start">
            <li className="flex items-center   gap-2 font-bold cursor-pointer">
              <CgProfile className="text-2xl" />
              My Profile
            </li>
            <li className="flex items-center  gap-2 font-bold cursor-pointer">
              <IoBookmarks className="text-2xl" />
              Bookmarks
            </li>
            <li className="flex items-center  gap-2 font-bold cursor-pointer">
              <IoMdPeople className="text-2xl" />
              Followers
            </li>
            <li className="flex items-center  gap-2 font-bold cursor-pointer">
              <RiLockPasswordFill className="text-2xl" />
              <ChangePasswordModal />
            </li>
          </ul>
        </div>
      </div>
      <div className="w-3/5 p-4 bg-green-300"></div>
      <div className="w-1/5 p-4 bg-yellow-200 "></div>
    </div>
  );
}
