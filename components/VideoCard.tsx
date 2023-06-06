import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsFillPlayFill, BsFillPauseFill, BsPlay } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import { Video } from "@/utils/videos";

type VideoCardProps = {
  post: Video;
};

export default function VideoCard({ post }: VideoCardProps) {
  const [isHover, setIsHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onVideoPress = () => {
    if (playing) {
      videoRef.current?.pause();
      setPlaying(false);
    } else {
      videoRef.current?.play();
      setPlaying(true);
    }
  };

  return (
    <div className="flex flex-col pb-6 border-b-2 border-gray-200">
      <div className="">
        <div className="flex gap-3 p-2 font-semibold rounded cursor-pointer">
          <div className="w-10 h-10 md:w-16 md:h-16">
            <Link href="/">
              <>
                <Image
                  width={62}
                  height={62}
                  className="rounded-full"
                  src={post.postedBy?.image}
                  alt="photo profile"
                />
              </>
            </Link>
          </div>
          <div>
            <Link href="/">
              <div className="flex items-center gap-2 ">
                <p className="flex font-bold md:text-lg text-primary">
                  {post.postedBy?.userName}{" "}
                  <GoVerified className="mt-1 ml-1 text-blue-400 text-md" />
                </p>
                <p className="hidden text-xs font-medium text-gray-500 capitalize md:block">
                  {post.postedBy?.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="relative flex gap-4 lg:ml-20">
        <div
          className="rounded-3xl "
          onMouseEnter={() => {
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
        >
          <Link href="/">
            <video
              ref={videoRef}
              src={post.video.asset.url}
              loop
              className="rounded-2xl cursor-pointer w-[200px] bg-gray-200  lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px]"
            ></video>
          </Link>
          {isHover && (
            <div className=" absolute z-10 flex gap-10 cursor-pointer bottom-6 left-6 md:left-14 lg:left-0 lg:justify-between w-[100px] md:w-[600px] p-3">
              {playing ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className="text-2xl text-black lg:text-4xl" />
                </button>
              ) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className="text-2xl text-black lg:text-4xl" />
                </button>
              )}
              {isVideoMuted ? (
                <button onClick={() => setIsVideoMuted(false)}>
                  <HiVolumeOff className="text-2xl text-black lg:text-4xl" />
                </button>
              ) : (
                <button onClick={() => setIsVideoMuted(true)}>
                  <HiVolumeUp className="text-2xl text-black lg:text-4xl" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
