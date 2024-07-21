import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { action } = await req.json();

  // Extract cookies from the incoming request headers
  const cookies = req.headers.get("cookie") || "";

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Cookie: cookies },
    body: JSON.stringify({ action }),
    credentials: "include",
  });

  const data = await response.json();
  const newResponse = NextResponse.json(data, { status: response.status });

  if (action === "start" && response.headers.has("set-cookie")) {
    newResponse.headers.set("set-cookie", response.headers.get("set-cookie")!);
  }

  if (action === "end") {
    newResponse.headers.set("set-cookie", "sessionId=; Max-Age=0; Path=/");
  }

  return newResponse;
}

export async function GET(req: NextRequest) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sessions/check`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
