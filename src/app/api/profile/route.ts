import { GenericErrorResponse } from "@/common/types/response";
import apiServer from "@/services/api.server";
import { handleApiServerError } from "@/utils/errors/api";
import { forwardRequestHeaders } from "@/utils/request/headers";
import { AxiosError } from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const res = await apiServer.get("/getProfile", {
      headers: forwardRequestHeaders(req),
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error: unknown) {
    return handleApiServerError(error as AxiosError<GenericErrorResponse>);
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const res = await apiServer.put("/updateProfile", body, {
      headers: forwardRequestHeaders(req),
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error: unknown) {
    return handleApiServerError(error as AxiosError<GenericErrorResponse>);
  }
}
