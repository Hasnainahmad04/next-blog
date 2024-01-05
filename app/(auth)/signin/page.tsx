import Image from "next/image";
import { MdOutlineMail } from "react-icons/md";
import React from "react";
import { signIn } from "next-auth/react";
import SignInButtons from "../Buttons";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Login = async () => {
  const session = await getServerSession();
  if (session) redirect("/home");

  return (
    <main className="flex justify-center items-center w-full h-[100vh]">
      <div
        className="w-[45rem] p-10 flex flex-col items-center h-fit"
        style={{ boxShadow: "3px 3px 47px -13px rgba(224,224,224,1)" }}
      >
        <h1 className="text-black text-center text-3xl">Welcome again</h1>
        <SignInButtons />
        <p className="my-6 text-gray-600 font-merriweather text-sm">
          No account?
          <span className="text-green-700 mx-2 cursor-pointer">Create one</span>
        </p>
        <p className="text-gray-600 text-[12px] text-center text-pretty font-merriweather">
          Click “Sign in” to agree to Medium’s Terms of Service and acknowledge
          that Medium’s Privacy Policy applies to you.
        </p>
      </div>
    </main>
  );
};

export default Login;
