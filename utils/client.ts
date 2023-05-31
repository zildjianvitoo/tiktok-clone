import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "jgkze3y9",
  dataset: "production",
  useCdn: false,
  apiVersion: "2023-05-31",
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
