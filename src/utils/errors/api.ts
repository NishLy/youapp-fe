import { GenericErrorResponse } from "@/common/types/response";
import { AxiosError } from "axios";
import { NextResponse } from "next/server";

export function handleApiError(error: AxiosError<GenericErrorResponse>) {
  if (error.response) {
    // Error dari server (axios-like / fetch JSON error dengan status code)
    return NextResponse.json(
      {
        message: error.response.data?.message || "Server error",
        errors: error.response.data?.errors || null,
      },
      { status: error.response.status }
    );
  } else if (error.request) {
    // Request dibuat tapi tidak ada response
    return NextResponse.json(
      { message: "No response from server" },
      { status: 503 }
    );
  } else {
    // Error lain (network, parsing, dsb.)
    return NextResponse.json(
      { message: error.message || "Unexpected error" },
      { status: 500 }
    );
  }
}
