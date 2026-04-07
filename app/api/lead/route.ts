import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    if (!body?.consent) {
      return NextResponse.json({ message: "Consent required" }, { status: 400 });
    }
    if (!body?.phone || String(body.phone).length < 10) {
      return NextResponse.json({ message: "Valid phone required" }, { status: 400 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Server error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
