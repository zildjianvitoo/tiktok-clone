import { FormEvent } from "react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillPlayFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import axios from "axios";
import { GetServerSideProps } from "next";
import { BASE_URL } from "@/utils";
import { Video } from "@/utils/videos";
import Link from "next/link";
import useAuthStore from "@/store/authStore";
import Comments from "@/components/Comments";
import LikeButton from "@/components/LikeButton";
import { data } from "autoprefixer";

type DetailProps = {
  postDetails: Video;
};

export default function PostId({ postDetails }: DetailProps) {
  const [post, setPost] = useState(postDetails);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [comment, setComment] = useState("");
  const [isPostingComment, setIsPostingComment] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  const { userProfile }: any = useAuthStore();

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
    if (videoRef?.current) {
      videoRef.current.play();
    }
  }, []);

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like,
      });
      setPost({ ...post, likes: data.likes });
    }
  };

  const addComment = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (userProfile && comment) {
        setIsPostingComment(true);
        const { data } = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
          comment,
          userId: userProfile._id,
        });
        setPost({ ...post, comments: data.comments });
        setComment("");
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsPostingComment(false);
    }
  };

  if (!post) return null;

  return (
    <div className="absolute top-0 left-0 flex flex-wrap w-full bg-white lg:flex-nowrap">
      <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black/90">
        <div className="absolute z-50 flex gap-6 top-6 left-2 lg:left-6">
          <p className="cursor-pointer" onClick={() => router.back()}>
            <MdOutlineCancel className="text-white text-[35px]" />
          </p>
        </div>
        <div className="relative ">
          <div className="lg:h-[100vh] h-[60vh]">
            <video
              ref={videoRef}
              muted={isVideoMuted}
              loop
              autoPlay
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
      <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
        <div className="mt-10 lg:mt-12">
          <div className="flex gap-3 p-2 ml-4 font-semibold rounded cursor-pointer">
            <div className="w-20 h-20 md:w-16 md:h-16">
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
                <div className="flex flex-col gap-2 ">
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
          <p className="px-10 text-lg text-gray-600">{post.caption}</p>
          <div className="px-10">
            {userProfile && (
              <LikeButton
                likes={post.likes}
                handleLike={() => handleLike(true)}
                handleDislike={() => handleLike(false)}
              />
            )}
          </div>
          <Comments
            comment={comment}
            setComment={setComment}
            addComment={addComment}
            comments={post.comments}
            isPostingComment={isPostingComment}
          />
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
