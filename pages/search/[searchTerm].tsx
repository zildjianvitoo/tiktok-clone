import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GoVerified } from "react-icons/go";
import axios from "axios";
import VideoCard from "@/components/VideoCard";
import NoResults from "../../components/NoResults";
import { IUser, Video } from "@/utils/videos";
import { BASE_URL } from "@/utils";
import useAuthStore from "@/store/authStore";

export default function Search({ videos }: { videos: Video[] }) {
  const [isAccount, setAccount] = useState(false);
  const router = useRouter();
  const { allUsers } = useAuthStore();
  const searchTerm = router.query.searchTerm!;

  const searchAccounts = allUsers.filter((user: IUser) =>
    user.userName.toLowerCase().includes(searchTerm?.toString().toLowerCase())
  );

  const accountStyle = isAccount
    ? "border-b-2 border-b-black"
    : "text-gray-400";
  const videosStyle = !isAccount
    ? "border-b-2 border-b-black"
    : "text-gray-400";
  return (
    <div className="w-full ">
      <div className="flex w-full gap-10 my-5 ml-2 bg-white border-b-2 border-gray-200 ">
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${accountStyle} `}
          onClick={() => setAccount(true)}
        >
          Account
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${videosStyle}  `}
          onClick={() => setAccount(false)}
        >
          Videos
        </p>
      </div>
      {isAccount ? (
        <div className="flex flex-col gap-5 md:mt-10">
          {searchAccounts.length > 0 ? (
            searchAccounts.map((user: IUser, index: number) => (
              <Link href={`/profile/${user._id}`} key={index}>
                <div className="flex items-start gap-3 p-2 border-b-2 border-gray-200">
                  <div className="">
                    <Image
                      src={user.image}
                      alt={user.userName}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                  </div>
                  <div className="items-center justify-center hidden gap-1 text-base lowercase xl:flex">
                    <p className="text-lg">
                      {user.userName.replaceAll(" ", "")}
                    </p>
                    <GoVerified className="text-blue-400" />
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <NoResults
              text={`Tidak Video yang mengandung kata kunci ${searchTerm}`}
            />
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-6 md:mt-10 md:justify-start">
          {videos.length > 0 ? (
            videos.map((video, index) => <VideoCard post={video} key={index} />)
          ) : (
            <NoResults
              text={`Tidak Video yang mengandung kata kunci ${searchTerm}`}
            />
          )}
        </div>
      )}
    </div>
  );
}

export const getServerSideProps = async ({
  params,
}: {
  params: { searchTerm: string };
}) => {
  const { searchTerm } = params;
  const { data } = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: {
      videos: data,
    },
  };
};
