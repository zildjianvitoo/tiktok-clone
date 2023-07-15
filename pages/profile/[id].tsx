import { useState, useEffect } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import axios from "axios";
import VideoCard from "@/components/VideoCard";
import NoResults from "../../components/NoResults";
import { IUser, Video } from "@/utils/videos";
import { BASE_URL } from "@/utils";

type Props = {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
};

export default function Profile({ data }: Props) {
  const [showUserVideos, setShowUserVideos] = useState(true);
  const [videosList, setVideosList] = useState<Video[]>([]);
  const { user, userLikedVideos, userVideos } = data;

  const videos = showUserVideos ? "border-b-2 border-b-black" : "text-gray-400";
  const liked = !showUserVideos ? "border-b-2 border-b-black" : "text-gray-400";

  useEffect(() => {
    if (showUserVideos) {
      setVideosList(userVideos);
    } else {
      setVideosList(userLikedVideos);
    }
  }, [showUserVideos, userVideos, userLikedVideos]);

  return (
    <div className="w-full ml-2">
      <div className="flex w-full gap-6 mb-4 bg-white md:gap-10">
        <div className="w-16 h-16 md:w-32 md:h-32 ">
          <Image
            src={user.image}
            alt={user.userName}
            width={120}
            height={120}
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="flex items-center justify-center gap-1 text-2xl font-semibold tracking-wider lowercase ">
            {user.userName.replaceAll(" ", "")}
            <GoVerified className="text-blue-400" />
          </p>
          <p className="text-lg text-gray-400 capitalize md:text-xl ">
            {user.userName}
          </p>
        </div>
      </div>
      <div className="w-full">
        <div className="flex w-full gap-10 my-10 ml-2 bg-white border-b-2 border-gray-200 ">
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${videos} `}
            onClick={() => setShowUserVideos(true)}
          >
            Videos
          </p>
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${liked}  `}
            onClick={() => setShowUserVideos(false)}
          >
            Liked
          </p>
        </div>
        <div className="flex flex-col gap-6 md:justify-start">
          {videosList.length > 0 ? (
            videosList.map((post: Video, index: number) => (
              <VideoCard key={index} post={post} />
            ))
          ) : (
            <NoResults
              text={`${
                showUserVideos ? "Tidak Memiliki" : "Belum Menyukai"
              } Video Apapun `}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { id } = params;
  const { data } = await axios.get(`${BASE_URL}/api/profile/${id}`);

  return {
    props: {
      data,
    },
  };
};
