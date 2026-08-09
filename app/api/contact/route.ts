import { NextResponse } from 'next/server';

const TO_EMAIL = 'support.lunarbloom.pk@gmail.com';
const FROM_EMAIL = 'DRESXO Website <onboarding@resend.dev>';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'RESEND_API_KEY is missing on the server' }, { status: 500 });
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `New message from ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 520px;">
            <h2>New Contact Form Message</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          </div>
        `,
      }),
    });

    const resendBody = await res.text();

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Resend rejected the request', resendStatus: res.status, resendBody },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Exception thrown', details: String(error) }, { status: 500 });
  }
}
