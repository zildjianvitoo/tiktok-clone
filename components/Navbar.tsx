import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { AiOutlineLogout, AiOutlineSearch } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { createOrGetUser } from "@/utils";
import useAuthStore from "@/store/authStore";
import { BiSearch } from "react-icons/bi";

type Props = {};

export default function Navbar({}: Props) {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const { userProfile, addUser, removeUser } = useAuthStore();

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };

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

      <div className="relative hidden md:block">
        <form
          className="absolute bg-white md:static top-10 -left-20"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            placeholder="Cari akun dan video"
            className="p-3 font-medium border-2 bg-primary md:text-base border-x-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full md:top-0"
          />
          <button
            type="submit"
            className="absolute pl-4 text-2xl text-gray-400 border-l-2 border-gray-300 md:right-5 right-6 top-4"
            onClick={handleSearch}
          >
            <BiSearch />
          </button>
        </form>
      </div>

      {userProfile && (
        <div className="flex items-center gap-4 md:ml-40 md:gap-10">
          <Link href="/upload">
            <button className="flex items-center gap-2 px-2 py-[6px] text-lg font-semibold border-2 md:px-4">
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
