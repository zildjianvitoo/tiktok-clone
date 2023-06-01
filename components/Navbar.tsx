import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { AiOutlineLogout, AiOutlineSearch } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { createOrGetUser } from "@/utils";
import useAuthStore from "@/store/authStore";

type Props = {};

export default function Navbar({}: Props) {
  const router = useRouter();
  const { userProfile, addUser, removeUser } = useAuthStore();

  return (
    <div className="flex items-center justify-between w-full px-4 py-2 border-b-2 border-gray-200">
      <Link href="/">
        <div>
          <Image
            src="/logo-tiktok.png"
            alt="Logo"
            width={150}
            height={150}
            priority
            className="cursor-pointer"
          />
        </div>
      </Link>
      <div>Search</div>
      {userProfile && (
        <div className="flex items-center gap-4 md:ml-40 md:gap-10">
          <Link href="/upload">
            <button className="flex items-center gap-2 px-2 py-1 text-lg font-semibold border-2 md:px-4">
              <IoMdAdd className="text-xl" />
              {""}
              <span className="hidden md:block">Upload</span>
            </button>
          </Link>
          {userProfile?.image && (
            <Link href="/">
              <>
                <Image
                  width={42}
                  height={42}
                  className="rounded-full"
                  src={userProfile?.image}
                  alt="photo profile"
                />
              </>
            </Link>
          )}
        </div>
      )}
      <div className="flex gap-4">
        {!userProfile ? (
          <GoogleLogin
            onSuccess={(res) => createOrGetUser(res, addUser)}
            onError={() => {}}
          />
        ) : (
          <button
            className="px-4 py-2 text-white bg-red-600 rounded-md"
            onClick={() => {
              googleLogout();
              removeUser();
            }}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
