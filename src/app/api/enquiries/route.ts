import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
    const message = typeof body?.message === "string" ? body.message.trim() : "";

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "Please provide your name, phone number, and enquiry message." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        received: true,
        reference: `AV-ENQ-${Date.now().toString().slice(-6)}`,
        message:
          "Thank you for reaching out to Aliveli Vasthralaya. Your enquiry details have been validated; connect a mail/CRM webhook or send via WhatsApp for immediate response.",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 }
    );
  }
}
