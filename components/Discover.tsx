import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { topics } from "../utils/constants";
type Props = {};

export default function Discover({}: Props) {
  const router = useRouter();
  const { topic } = router.query;

  const activeTopicStyle =
    "xl:border-2 hover:bg-primary xl:border-[#F51997] px-3 py-2 rounded xl: rounded-full flex items-center gap-2 text-[#F51997]";
  const topicStyle =
    "xl:border-2 hover:bg-primary xl:border-gray-300 px-3 py-2 rounded xl: rounded-full flex items-center gap-2 text-black";

  return (
    <div className="pb-6 xl:border-b-2 xl:border-gray-200">
      <p className="hidden m-3 font-semibold text-gray-400 xl:block">
        Topik Populer
      </p>
      <div className="flex flex-wrap items-center gap-3">
        {topics.map((item) => (
          <Link href={`/?topic=${item.name}`} key={item.name}>
            <div
              className={topic === item.name ? activeTopicStyle : topicStyle}
            >
              <span className="text-2xl font-bold xl:text-lg">{item.icon}</span>
              <span className="hidden font-medium capitalize text-md xl:block">
                {" "}
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
