import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginSchema } from "../../../schemas/auth.schema";
import { AuthContext } from "../../../Context/AuthContext";
import AuthButton from "../../../components/Auth/AuthButton/AuthButton";
import AuthHeader from '../../../components/Auth/AuthHeader/AuthHeader';

export default function Login() {
  const navigate = useNavigate();
  const [passwordHide, setpasswordHide] = useState(true);
  const [apiError, setapiError] = useState(false);
  const [isDisabled, setisDisabled] = useState(false);
  const { setUserToken } = useContext(AuthContext);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });

  const { handleSubmit, register, formState } = form;

  async function mySubmit(values) {
    console.log(values);
    setisDisabled(true);
    try {
      const res = await axios.post(
        `https://route-posts.routemisr.com/users/signin`,
        values,
      );
      const { data } = res;
      if (data.success) {
        toast.success(data.message, { position: "top-center", duration: 2000 });
        console.log(data);
        
        localStorage.setItem("userToken", data.data.token);
        setUserToken(data.data.token);
        setisDisabled(false);
        setTimeout(() => {
          navigate("/");
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
        <AuthHeader text="Let's Get In Your Account" />

        {apiError && (
          <h2 className="text-center text-3xl font-bold text-red-600 mt-8 capitalize">
            {apiError} !
          </h2>
        )}

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

        <AuthButton text="Login Now" status={isDisabled} />
      </div>
    </form>
  );
}
