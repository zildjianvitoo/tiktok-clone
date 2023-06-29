import React from "react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillPlayFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import axios from "axios";
import { GetServerSideProps } from "next";
import { BASE_URL } from "@/utils";
import { Video } from "@/utils/videos";

type DetailProps = {
  postDetails: Video;
};

export default function PostId({ postDetails }: DetailProps) {
  const [post, setPost] = useState(postDetails);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onVideoClick = () => {
    if (isPlaying) {
      videoRef?.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef?.current?.play();
      setIsPlaying(true);
    }
  };
  useEffect(() => {
    console.log(isPlaying);
  }, [isPlaying]);

  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [post, isVideoMuted]);

  if (!post) return null;

  return (
    <div className="absolute top-0 left-0 flex flex-wrap w-full bg-white lg:flex-nowrap">
      <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black/90">
        <div className="absolute z-50 flex gap-6 top-6 left-2 lg:left-6">
          <Link href="/">
            <MdOutlineCancel className="text-white text-[35px]" />
          </Link>
        </div>
        <div className="relative ">
          <div className="lg:h-[100vh] h-[60vh]">
            <video
              ref={videoRef}
              loop
              onClick={onVideoClick}
              src={post.video.asset.url}
              className="h-full cursor-pointer "
            ></video>
          </div>
          <div className="absolute top-[45%] left-[45%] cursor-pointer">
            {!isPlaying && (
              <button onClick={onVideoClick}>
                <BsFillPlayFill className="text-6xl text-white lg:text-8xl" />
              </button>
            )}
          </div>
        </div>
        <div className="absolute cursor-pointer bottom-5 lg:bottom-10 right-5 lg:right-10">
          {isVideoMuted ? (
            <button onClick={() => setIsVideoMuted(false)}>
              <HiVolumeOff className="text-2xl text-white lg:text-4xl" />
            </button>
          ) : (
            <button onClick={() => setIsVideoMuted(true)}>
              <HiVolumeUp className="text-2xl text-white lg:text-4xl" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${params?.id}`);

  return {
    props: { postDetails: data },
  };
};
