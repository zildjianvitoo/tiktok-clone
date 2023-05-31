import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import { AiOutlineLogout, AiOutlineSearch } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";

type Props = {};

export default function Navbar({}: Props) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogin = (e: any) => {
    e.preventDefault();
    signIn("github");
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
      {session && (
        <h1 className="font-bold text2xl">
          Login sebagai {session?.user?.name}
        </h1>
      )}
      <div>
        {!session ? (
          <>
            <button
              className="px-4 py-2 text-white bg-red-600 rounded-md"
              onClick={handleLogin}
            >
              Login
            </button>
          </>
        ) : (
          <button
            className="px-4 py-2 text-white bg-red-600 rounded-md"
            onClick={() => signOut()}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
