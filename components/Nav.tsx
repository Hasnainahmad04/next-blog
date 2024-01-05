"use client";
import Link from "next/link";
import AvatarDropdown from "./AvatarDropdown";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Nav = () => {
  const pathname = usePathname();
  const navigation = useRouter();
  const { status } = useSession();

  if (pathname === "/write-story" || pathname.includes("/signin")) return;

  return (
    <div className="w-full flex justify-between items-center text-black border-b-2 border-gray-200 py-3 px-[5%] max-md:px-4">
      <Link href={"/"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="38"
          height="38"
          viewBox="0 0 50 50"
        >
          <path d="M30,43h17l-4-4l-0.027-28.496l3.891-4.49H34.845l-9.24,22.73L15.497,6H3l4,5.091v24.195L1,43h14l-6-7.714V13.75L22,43 l-0.002,0.014L34,13.545V39L30,43z M10.911,41H5.089L8,37.258L10.911,41z M21.922,37.899L10.828,12.938L8.633,8h5.564l9.581,21.556 l0.805,1.81L21.922,37.899z M35.414,40.414L36,39.828V39V13.545v-5.06l0.191-0.47h6.293l-1.022,1.18l-0.489,0.565l0.001,0.747 L41,39.002l0.001,0.827l0.585,0.585L42.172,41h-7.343L35.414,40.414z"></path>
        </svg>
      </Link>

      <div className="flex flex-row">
        <ul className="flex items-center space-x-4">
          <li>
            <Link
              href={"/write-story"}
              className="flex gap-1  items-center text-gray-600 font-light"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-label="Write"
              >
                <path
                  d="M14 4a.5.5 0 0 0 0-1v1zm7 6a.5.5 0 0 0-1 0h1zm-7-7H4v1h10V3zM3 4v16h1V4H3zm1 17h16v-1H4v1zm17-1V10h-1v10h1zm-1 1a1 1 0 0 0 1-1h-1v1zM3 20a1 1 0 0 0 1 1v-1H3zM4 3a1 1 0 0 0-1 1h1V3z"
                  fill="currentColor"
                ></path>
                <path
                  d="M17.5 4.5l-8.46 8.46a.25.25 0 0 0-.06.1l-.82 2.47c-.07.2.12.38.31.31l2.47-.82a.25.25 0 0 0 .1-.06L19.5 6.5m-2-2l2.32-2.32c.1-.1.26-.1.36 0l1.64 1.64c.1.1.1.26 0 .36L19.5 6.5m-2-2l2 2"
                  stroke="currentColor"
                ></path>
              </svg>
              Write
            </Link>
          </li>
        </ul>
        {status == "loading" ? (
          <div className="border-gray-300 h-6 w-6 animate-spin rounded-full border-4 border-t-green-700" />
        ) : (
          <div className="mx-3">
            {status == "authenticated" ? (
              <AvatarDropdown />
            ) : (
              <button
                className="bg-green-700 hover:bg-green-800 duration-200 text-white px-3 py-1 rounded-full"
                onClick={() => navigation.push("/api/auth/signin")}
              >
                Sign in
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
