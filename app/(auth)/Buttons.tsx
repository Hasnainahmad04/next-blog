"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { MdOutlineMail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";

const SignInButtons = () => {
  return (
    <div className="my-10 flex flex-col">
      <button
        className="flex items-center gap-3 border border-gray-300 rounded-full px-4 py-2 my-2"
        onClick={() => signIn("google")}
      >
        <FcGoogle />
        <span className="text-sm text-gray-600">Sign in with Google</span>
      </button>
      <button className="flex gap-3 items-center border border-gray-300 rounded-full px-4 py-2 my-2">
        <MdOutlineMail />
        <span className="text-sm text-gray-600">Sign in with Email</span>
      </button>
    </div>
  );
};

export default SignInButtons;
