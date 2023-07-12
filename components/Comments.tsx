import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, FormEvent } from "react";
import { GoVerified } from "react-icons/go";
import useAuthStore from "@/store/authStore";
import NoResults from "@/pages/NoResults";

interface IProps {
  isPostingComment: boolean;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: FormEvent) => void;
  comments: IComment[];
}

interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: {
    _ref: string;
    _id: string;
  };
}

export default function Comments({
  comment,
  comments,
  addComment,
  setComment,
  isPostingComment,
}: IProps) {
  const { userProfile } = useAuthStore();

  return (
    <div className="border-t-2 border-gray-200 pt-4 px-10 bg-[#f8f8f8] border-b-2 pb-[100px] lg:pb-0">
      <div className="overflow-y-scroll overflow-x-hidden h-[475px]">
        {comments?.length > 0 ? (
          <div>videos</div>
        ) : (
          <NoResults text="Jadilah orang pertama yang komen!" />
        )}
      </div>
      {userProfile && (
        <div className="absolute bottom-0 left-0 w-full px-2 pb-6 md:px-10">
          <form onSubmit={addComment} className="flex w-full gap-4">
            <input
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              placeholder="Komen apa saja..."
              className="px-6 py-4 text-base font-medium border-2 w-4/5 bg-primary border-gray-100 focus:outline-none focus:border-[#f51997] focus:border-2 rounded-lg"
            />
            <button type="submit" className="text-gray-400 text-md">
              {isPostingComment ? "Commenting..." : "Comment"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
