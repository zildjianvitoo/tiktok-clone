import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import useAuthStore from "@/store/authStore";
import { IUser } from "@/utils/videos";

type Props = {};

export default function SuggestedAccounts({}: Props) {
  const { fetchAllUsers, allUsers } = useAuthStore();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);
  return (
    <div className="pb-4 border-gray-200 xl:border-b-2">
      <p className="hidden m-3 mt-4 font-semibold text-gray-400 xl:flex">
        Akun yang disarankan
      </p>

      <div>
        {allUsers?.slice(0, 5).map((user: IUser) => (
          <Link key={user._id} href={`/profile/${user._id}`}>
            <div className="flex gap-3 p-2 font-semibold rounded cursor-pointer hover:bg-primary">
              <div className="w-8 h-8">
                <Image
                  src={user.image}
                  alt={user.userName}
                  width={34}
                  height={34}
                  className="rounded-full"
                />
              </div>
              <div className="items-center justify-center hidden gap-1 text-base lowercase xl:flex">
                <p>{user.userName.replaceAll(" ", "")}</p>
                <GoVerified className="text-blue-400" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
