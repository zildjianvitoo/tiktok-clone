import { useState } from "react";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import Discover from "./Discover";
import SuggestedAccounts from "./SuggestedAccounts";
import Footer from "./Footer";
import useAuthStore from "@/store/authStore";

type Props = {};

export default function Sidebar({}: Props) {
  const [showSideBar, setShowSideBar] = useState(true);
  const { userProfile } = useAuthStore();
  const normalLink =
    "flex items-center justify-center gap-3 hover:bg-primary p-3 cursor-pointer font-semibold text-[#F51997]";

  return (
    <div>
      <div
        className="block m-2 mt-3 ml-4 xl:hidden"
        onClick={() => setShowSideBar((prev) => !prev)}
      >
        {showSideBar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSideBar && (
        <div className="justify-start w-20 pl-2 mb-10 border-r-2 border-gray-100 flex-flex-col xl:w-400">
          <div className="border-gray-200 xl:border-b-2 xl:py-2">
            <Link href="/">
              <div className={normalLink}>
                <p className="text-2xl">
                  <AiFillHome />
                </p>
                <span className="hidden text-xl xl:block">For You</span>
              </div>
            </Link>
          </div>
          {!userProfile && (
            <div className="hidden px-2 py-4 xl:block ">
              <p className="text-gray-400">Login untuk like dan komen Video</p>
              <div className="pr-4 ">
                <button
                  className="w-full px-4 py-2 mt-3 text-red-600 bg-transparent border border-red-600 rounded-md hover:bg-red-600 hover:text-white"
                  onClick={() => {}}
                >
                  Login
                </button>
              </div>
            </div>
          )}
          <Discover />
          <SuggestedAccounts />
          <Footer />
        </div>
      )}
    </div>
  );
}
