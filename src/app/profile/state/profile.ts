import { atom } from "jotai";
import IProfile from "../types/profile";

const ProfileAtom = atom<IProfile>({
  displayName: "",
  email: "",
  username: "",
  gender: "",
});

export default ProfileAtom;
