import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const sessionId = url.pathname.split("/").pop();

  if (!sessionId) {
    return NextResponse.json({ message: "No session ID provided" }, { status: 400 });
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sessions/${sessionId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const sessionId = url.pathname.split("/").pop();

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sessions/${sessionId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
