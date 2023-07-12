import React, { useState, useEffect } from "react";
import { MdFavorite } from "react-icons/md";
import useAuthStore from "@/store/authStore";

type Props = {
  likes: any[];
  handleLike: () => void;
  handleDislike: () => void;
};

export default function LikeButton({
  likes,
  handleLike,
  handleDislike,
}: Props) {
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const { userProfile }: any = useAuthStore();

  const filteredLikes = likes?.filter((item) => item._ref === userProfile?._id);

  useEffect(() => {
    if (filteredLikes?.length > 0) {
      setAlreadyLiked(true);
    } else {
      setAlreadyLiked(false);
    }
  }, [filteredLikes, likes]);

  return (
    <div className="flex gap-6">
      <div className="flex flex-col items-center justify-center mt-4 cursor-pointer ">
        {alreadyLiked ? (
          <div
            className="rounded-full bg-primary p-2 md:p-4 text-[#f51997]"
            onClick={handleDislike}
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        ) : (
          <div
            className="p-2 rounded-full bg-primary md:p-4"
            onClick={handleLike}
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        )}
        <p className="text-base font-semibold">{likes?.length | 0}</p>
      </div>
    </div>
  );
}
