import {
  GenericResponseWithData,
  GenericSuccessResponse,
} from "@/common/types/response";
import api from "@/services/api";
import { QueryFunction } from "@tanstack/react-query";
import IProfile from "../types/profile";

export const queryProfile: QueryFunction<
  GenericResponseWithData<{ data: IProfile; message: string }>
> = async () => {
  return await api.get("profile");
};

export const mutateUpdateProfile = async (
  data: IProfile
): Promise<GenericSuccessResponse> => {
  const response = await api.put<GenericSuccessResponse>("/profile", data);
  return response.data;
};
