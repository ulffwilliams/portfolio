import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const formData = await request.formData().then((data) => {
    resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: process.env.RESEND_TO_EMAIL,
      subject: `[PORTFOLIO] New message from ${data.get("name")}`,
      html: `
      <h1>Portfolio-inbox</h1>
      <br/>
      <h2>Nytt meddelande från ${data.get("name")}</h2>
      <br />
      <p><strong>Email:</strong> ${data.get("E-mail")}</p>
      <br />
      <p><strong>Message:</strong> ${data.get("message")}</p>
      `,
    });
  });

  return NextResponse.json({ success: true });
}
