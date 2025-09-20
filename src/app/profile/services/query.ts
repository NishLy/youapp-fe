import { GenericResponseWithData } from "@/common/types/response";
import api from "@/services/api";
import { QueryFunction } from "@tanstack/react-query";
import IProfile from "../types/profile";

export const queryProfile: QueryFunction<
  GenericResponseWithData<IProfile>
> = async () => {
  return await api.get("profile");
};
