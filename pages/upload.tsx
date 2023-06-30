import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import useAuthStore from "@/store/authStore";
import { client } from "@/utils/client";
import { SanityAssetDocument } from "@sanity/client";
import { topics } from "@/utils/constants";
import { BASE_URL } from "@/utils";

type Props = {};

export default function Upload({}: Props) {
  const [isLoading, setLoading] = useState(false);
  const [videoAsset, setVideoAsset] = useState<
    SanityAssetDocument | undefined
  >();
  const [wrongFileType, setWrongFileType] = useState(false);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState(topics[0].name);
  const [savingPost, setSavingPost] = useState(false);
  const { userProfile }: { userProfile: any } = useAuthStore();
  const router = useRouter();

  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0];
    const filedTypes = ["video/mp4", "video/webm", "video/ogg"];

    if (filedTypes.includes(selectedFile.type)) {
      setLoading(true);
      setWrongFileType(false);
      client.assets
        .upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => setVideoAsset(data));
      setLoading(false);
    } else {
      // setLoading(false);
      setWrongFileType(true);
    }
  };

  const handlePost = async () => {
    if (caption && videoAsset?._id && category) {
      setSavingPost(true);
      console.log("masuk");
      const document = {
        _type: "post",
        caption,
        video: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: videoAsset?._id,
          },
        },
        userId: userProfile._id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile._id,
        },
        category,
      };
      await axios.post(`${BASE_URL}api/post`, document);
      router.push("/");
    }
  };

  return (
    <div className="flex w-full h-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#f8f8f8] justify-center">
      <div className="bg-white rounded-lg xl:h-[80vh] w-[60%]  flex flex-wrap gap-6 justify-between items-center p-14 pt-6 ">
        <div>
          <div>
            <p className="font-bold text2xl">Upload Video</p>
            <p className="mt-1 text-base text-gray-400">Post Video</p>
          </div>
          <div className="flex flex-col items-center justify-center border-4 border-gray-200 border-dashed outline-none rounded-xl mt-6 w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100 ">
            {isLoading ? (
              <p>Uploading...</p>
            ) : (
              <div>
                {" "}
                {videoAsset ? (
                  <div>
                    <video
                      src={videoAsset.url}
                      loop
                      controls
                      className="rounded-xl h-[450px] mt-16 bg-black "
                    ></video>
                  </div>
                ) : (
                  <label className="cursor-pointer ">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="flex flex-col items-center justify-center ">
                        <p className="text-xl font-bold">
                          <FaCloudUploadAlt className="text-6xl text-gray-300" />
                        </p>
                        <p className="font-semibold textxl">Upload Video</p>
                      </div>
                      <p className="mt-10 text-sm leading-10 text-center text-gray-400">
                        MP4 or WebM or ogg <br />
                        720x1280 or higher <br />
                        Up to 10 minutes <br />
                        Less tah 2GB
                      </p>
                      <p className="p-2 mt-10 text-base font-medium text-center text-white bg-red-500 rounded outline-none w-52">
                        Select File
                      </p>
                    </div>
                    <input
                      type="file"
                      name="upload-video"
                      className="w-0 h-0"
                      onChange={uploadVideo}
                    />
                  </label>
                )}
              </div>
            )}
            {wrongFileType && (
              <p className="text-xl text-center text-red-400 font-semibold mt-4 w-[250px]">
                Please select a video file
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 pb-10">
          <label className="text-base font-medium">Caption</label>
          <input
            type="text"
            value={caption}
            onChange={(e) => {
              setCaption(e.target.value);
            }}
            className="p-2 text-base border-2 border-gray-200 rounded outline-none"
          />
          <label htmlFor="">Choose a category </label>
          <select
            name=""
            id=""
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            className="p-2 capitalize border-2 border-gray-200 rounded outline-none cursor-pointer "
          >
            {topics.map((topic) => (
              <option
                value={topic.name}
                key={topic.name}
                className="p-2 text-base text-gray-700 capitalize bg-white outline-none hover:bg-slate-300"
              >
                {topic.name}
              </option>
            ))}
          </select>
          <div className="flex gap-6 mt-10 ">
            <button
              onClick={() => {}}
              type="button"
              className="p-2 text-base font-medium border-2 border-gray-300 rounded outline-none w-29 lg:w-44 "
            >
              Discard
            </button>
            <button
              onClick={handlePost}
              type="button"
              className="p-2 text-base font-medium text-white bg-red-500 border-2 border-gray-300 rounded outline-none w-29 lg:w-44 "
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
