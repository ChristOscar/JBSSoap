import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

// Server-side fallback for contact form if EmailJS is unavailable.
// In practice, the client-side EmailJS call handles this.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { first_name, last_name, email, subject, message } = body;

    if (!first_name || !email || !message) {
      return NextResponse.json(
        { error: "first_name, email, and message are required." },
        { status: 400 }
      );
    }

    // Log for now — wire up a server-side email provider here if needed
    console.log("Contact form submission:", {
      name: `${first_name} ${last_name}`,
      email,
      subject,
      message,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to process contact form." },
      { status: 500 }
    );
  }
}
