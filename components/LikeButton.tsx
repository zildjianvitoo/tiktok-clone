import React, { useState, useEffect } from "react";
import { MdFavorite } from "react-icons/md";
import useAuthStore from "@/store/authStore";

type Props = {
  handleLike: () => void;
  handleDislike: () => void;
};

export default function LikeButton({ handleLike, handleDislike }: Props) {
  const [alreadyLiked, setAlreadyLiked] = useState(true);
  const { userProfile } = useAuthStore();

  return (
    <div className="gap-6 ">
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
        {/* <p className="text-base font-semibold">{likes?.length | 0}</p> */}
      </div>
    </div>
  );
}
