import { NextApiRequest, NextApiResponse } from "next";
import { client } from "@/utils/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = req.body;

  if (req.method == "POST") {
    client
      .createIfNotExists(user)
      .then(() => res.status(200).json("Login Succes"));
  }
}
