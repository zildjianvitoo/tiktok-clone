import axios from "axios";
import { Video } from "@/utils/videos";
import VideoCard from "@/components/VideoCard";
import NoResults from "./NoResults";

interface HomeProps {
  videos: Video[];
}

export default function Home({ videos }: HomeProps) {
  return (
    <div className="flex flex-col h-full gap-10 videos">
      {videos.length > 0 ? (
        videos.map((video: Video) => <VideoCard post={video} key={video._id} />)
      ) : (
        <NoResults text={"No Videos"} />
      )}
    </div>
  );
}

export const getServerSideProps = async () => {
  const { data } = await axios.get(`http://localhost:3000/api/post`);
  return {
    props: {
      videos: data,
    },
  };
};
