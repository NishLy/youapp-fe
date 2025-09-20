import { GenericErrorResponse } from "@/common/types/response";
import { AxiosError } from "axios";
import { NextResponse } from "next/server";

export function handleApiServerError(error: AxiosError<GenericErrorResponse>) {
  if (error.response) {
    return NextResponse.json(
      {
        message: error.response.data?.message || "Server error",
        errors: error.response.data?.errors || null,
      },
      { status: error.response.status }
    );
  } else if (error.request) {
    return NextResponse.json(
      { message: "No response from server" },
      { status: 503 }
    );
  } else {
    return NextResponse.json(
      { message: error.message || "Unexpected error" },
      { status: 500 }
    );
  }
}
