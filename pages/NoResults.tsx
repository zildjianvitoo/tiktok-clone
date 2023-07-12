import { MdOutlineVideocamOff } from "react-icons/md";
import { BiCommentX } from "react-icons/bi";
type NoResultsProps = {
  text: string;
};

export default function NoResults({ text }: NoResultsProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <p className="text-8xl">
        {text === "Jadilah orang pertama yang komen!" ? (
          <BiCommentX />
        ) : (
          <MdOutlineVideocamOff />
        )}
      </p>
      <p className="text-2xl text-center">{text}</p>
    </div>
  );
}
