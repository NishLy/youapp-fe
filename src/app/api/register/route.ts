import { GenericErrorResponse } from "@/common/types/response";
import apiServer from "@/services/api.server";
import { handleApiError } from "@/utils/errors/api";
import { AxiosError } from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await apiServer.post("/register", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error: unknown) {
    handleApiError(error as AxiosError<GenericErrorResponse>);
  }
}
