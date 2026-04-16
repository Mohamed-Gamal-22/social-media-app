import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import AuthHeader from "../../../components/AuthHeader/AuthHeader";
import { registerSchema } from "../../../schemas/auth.schema";
import AuthButton from "../../../components/AuthButton/AuthButton";
import toast, { Toaster } from "react-hot-toast";

import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [passwordHide, setpasswordHide] = useState(true);
  const [rePasswordHide, setrePasswordHide] = useState(true);
  const [apiError, setapiError] = useState(false);
  const [isDisabled, setisDisabled] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const { handleSubmit, register, formState } = form;

  async function mySubmit(values) {
    console.log(values);
    setisDisabled(true);
    try {
      const res = await axios.post(
        `https://route-posts.routemisr.com/users/signup`,
        values,
      );
      const { data } = res;
      if (data.success) {
        toast.success(data.message, { position: "top-center", duration: 2000 });
        setisDisabled(false);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      console.log(err);

      setapiError(err.response?.data.message);
      setisDisabled(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(mySubmit)}>
      <div className="w-full mx-auto md:w-[80%] lg:w-[70%] xl:w-[50%]">
        <AuthHeader text="Join Our Community And Create Your Account" />

        {apiError && (
          <h2 className="text-center text-3xl font-bold text-red-600 mt-8 capitalize">
            {apiError} !
          </h2>
        )}

        <div className="my-4">
          <label htmlFor="username" className="font-bold">
            Username
          </label>
          <input
            {...register("name")}
            id="username"
            type="text"
            className="border bg-white rounded-sm w-full p-2 mt-2 focus:outline-[#a044ffaa]"
            placeholder="Enter UserName..."
          />
          {formState.errors.name && formState.touchedFields.name && (
            <p className="text-sm text-red-500 mt-1">
              {formState.errors.name.message}
            </p>
          )}
        </div>
        <div className="my-4">
          <label htmlFor="email" className="font-bold">
            Email
          </label>
          <input
            {...register("email")}
            id="email"
            type="email"
            className="border bg-white rounded-sm w-full p-2 mt-2 focus:outline-[#a044ffaa]"
            placeholder="Enter Email..."
          />
          {formState.errors.email && formState.touchedFields.email && (
            <p className="text-sm text-red-500 mt-1">
              {formState.errors.email.message}
            </p>
          )}
        </div>
        <div className="my-4 ">
          <label htmlFor="password" className="font-bold">
            Password
          </label>
          <div className="relative mt-2">
            <input
              {...register("password")}
              id="password"
              type={passwordHide ? "password" : "text"}
              className="border bg-white rounded-sm w-full p-2  focus:outline-[#a044ffaa]"
              placeholder="Enter password..."
            />

            {passwordHide && (
              <FaEyeSlash
                onClick={() => setpasswordHide(false)}
                className="absolute top-[50%] text-[#a044ff] -translate-y-1/2 inset-e-2.5 cursor-pointer"
              />
            )}
            {!passwordHide && (
              <FaEye
                onClick={() => setpasswordHide(true)}
                className="absolute top-[50%] -translate-y-1/2 inset-e-2.5 cursor-pointer text-[#6a3093]"
              />
            )}
          </div>
          {formState.errors.password && formState.touchedFields.password && (
            <p className="text-sm text-red-500 mt-1">
              {formState.errors.password.message}
            </p>
          )}
        </div>
        <div className="my-4">
          <label htmlFor="password" className="font-bold block mt-4">
            RePassword
          </label>
          <div className="relative mt-2">
            <input
              {...register("rePassword")}
              id="rePassword"
              type={rePasswordHide ? "password" : "text"}
              className="border bg-white rounded-sm w-full p-2  focus:outline-[#a044ffaa]"
              placeholder="Enter rePassword..."
            />
            {rePasswordHide && (
              <FaEyeSlash
                onClick={() => setrePasswordHide(false)}
                className="absolute top-[50%] text-[#a044ff] -translate-y-1/2 inset-e-2.5 cursor-pointer"
              />
            )}
            {!rePasswordHide && (
              <FaEye
                onClick={() => setrePasswordHide(true)}
                className="absolute top-[50%] -translate-y-1/2 inset-e-2.5 cursor-pointer text-[#6a3093]"
              />
            )}
          </div>
        </div>
        {formState.errors.rePassword && formState.touchedFields.rePassword && (
          <p className="text-sm text-red-500 mt-1">
            {formState.errors.rePassword.message}
          </p>
        )}
        <div className="my-4 flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <label className="font-bold" htmlFor="date">
              Date Of Birth
            </label>
            <input
              {...register("dateOfBirth")}
              type="date"
              id="date"
              className="accent-[#a044ff]"
            />
          </div>
        </div>
        <div className="my-4 flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <label className="font-bold" htmlFor="male">
              Male
            </label>
            <input
              {...register("gender")}
              type="radio"
              id="male"
              value="male"
              name="gender"
              className="accent-[#a044ff]"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="font-bold" htmlFor="female">
              FeMale
            </label>
            <input
              {...register("gender")}
              type="radio"
              id="female"
              value="female"
              name="gender"
              className="accent-[#a044ff]"
            />
          </div>
        </div>
        {formState.errors.gender && formState.touchedFields.gender && (
          <p className="text-sm text-red-500 mt-1">
            {formState.errors.gender.message}
          </p>
        )}

        <AuthButton text="Create My Account" status={isDisabled} />
      </div>
    </form>
  );
}
