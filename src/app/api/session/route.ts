import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Extract caller IP address from the request headers
  const ip = req.headers.get("x-forwarded-for") || req.ip || '';

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ip }),
  });

  const data = await response.json();
  const newResponse = NextResponse.json(data, { status: response.status });

  return newResponse;
}
