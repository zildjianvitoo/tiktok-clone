import axios from "axios";
import jwt_decode from "jwt-decode";

type decodedUser = {
  name: string;
  sub: string;
  picture: string;
};

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const createOrGetUser = async (res: any, addUser: any) => {
  const decoded: decodedUser = jwt_decode(res.credential);
  const { name, picture, sub } = decoded;

  const user = {
    _id: sub,
    _type: "user",
    userName: name,
    image: picture,
  };
  addUser(user);

  await axios.post(`${BASE_URL}/api/authUser`, user);
};
