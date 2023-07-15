import axios from "axios";
import { Video } from "@/utils/videos";
import VideoCard from "@/components/VideoCard";
import NoResults from "../components/NoResults";

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

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let response = null;

  if (topic) {
    response = await axios.get(`http://localhost:3000/api/discover/${topic}`);
  } else {
    response = await axios.get(`http://localhost:3000/api/post`);
  }

  return {
    props: {
      videos: response.data,
    },
  };
};
