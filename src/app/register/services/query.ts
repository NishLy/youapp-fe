import { GenericSuccessResponse } from "@/common/types/response";
import api from "@/services/api";
import { RegisterDTO } from "../types/register";

export const mutateRegister = async (
  data: RegisterDTO
): Promise<GenericSuccessResponse> => {
  const response = await api.post<GenericSuccessResponse>("/register", data);
  return response.data;
};
