"use client";
import Logo from "@assets/icons/Logo";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import AvatarDropdown from "./AvatarDropdown";
import WriteStoryIcon from "@public/assets/icons/WriteStoryIcon";
import AppButton from "./AppButton";
import { useEffect, useState } from "react";

const routesWithoutNavbar = ["/write-story", "/signin"];

const Nav = () => {
  const pathname = usePathname();
  const navigation = useRouter();
  const { status } = useSession();
  const [background, setBakground] = useState("bg-white");

  const isHeroNav =
    pathname === "/home" &&
    (status == "unauthenticated" || status == "loading");

  if (routesWithoutNavbar.includes(pathname)) return;

  const renderOption = {
    loading: (
      <div className="ml-6 border-gray-300 h-6 w-6 animate-spin rounded-full border-4 border-t-green-700" />
    ),
    authenticated: <AvatarDropdown />,
    unauthenticated: (
      <AppButton
        title="Get Started"
        onClick={() => navigation.push("/api/auth/signin")}
        variant={isHeroNav ? "black" : "green"}
        className="py-2 text-sm font-medium px-4"
      />
    ),
  };

  return (
    <div
      className={`bg-white sticky top-0 z-10 h-[5rem] w-full flex justify-between items-center text-black border-b ${isHeroNav ? "border-black" : "border-gray-300"} py-4 px-[5%] max-md:px-4 ${isHeroNav && "bg-yellow-hero"}`}
    >
      <Link href={"/"} className="w-[10rem]">
        <Logo />
      </Link>

      <div className="flex flex-row items-center">
        <ul className="flex items-center space-x-4">
          <li>
            <Link
              href={"/write-story"}
              className={`flex gap-1 items-center ${isHeroNav ? "text-black" : "text-gray-600"}font-light`}
            >
              <WriteStoryIcon />
              Write
            </Link>
          </li>
        </ul>

        <div className="mx-3">{renderOption[status]}</div>
      </div>
    </div>
  );
};

export default Nav;
