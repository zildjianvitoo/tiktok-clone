import { NextApiRequest, NextApiResponse } from "next";
import { client } from "@/utils/client";
import { searchPostsQuery } from "@/utils/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const searchTerm = req.query.searchTerm!;

  if (req.method == "GET") {
    const videosQuery = searchPostsQuery(searchTerm);

    const videos = await client.fetch(videosQuery);
    res.status(200).json(videos);
  }
}
