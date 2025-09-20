import { GenericSuccessResponse } from "@/common/types/response";
import api from "@/services/api";
import { LoginDTO } from "../types/login";

export const mutateLogin = async (
  data: LoginDTO
): Promise<GenericSuccessResponse & { access_token: string }> => {
  const response = await api.post<
    GenericSuccessResponse & { access_token: string }
  >("/login", data);
  return response.data;
};
