import { NextRequest, NextResponse } from "next/server";

// const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Send email using Resend
    // const { data, error } = await resend.emails.send({
    //   from: "Fileme <noreply@fileme.com>",
    //   to: ["your@email.com"], // Replace with your actual email
    //   subject: `New Contact Form Submission from ${name}`,
    //   html: `
    //     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    //       <h2 style="color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
    //         New Contact Form Submission
    //       </h2>

    //       <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
    //         <h3 style="color: #374151; margin-top: 0;">Contact Details:</h3>
    //         <p><strong>Name:</strong> ${name}</p>
    //         <p><strong>Email:</strong> ${email}</p>
    //         <p><strong>Message:</strong></p>
    //         <div style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #3b82f6;">
    //           ${message.replace(/\n/g, "<br>")}
    //         </div>
    //       </div>

    //       <div style="background-color: #dbeafe; padding: 15px; border-radius: 8px; margin-top: 20px;">
    //         <p style="margin: 0; color: #1e40af; font-size: 14px;">
    //           This message was sent from the Fileme contact form. Please respond to the customer's inquiry.
    //         </p>
    //       </div>
    //     </div>
    //   `,
    // });

    // if (error) {
    //   console.error("Resend error:", error);
    //   return NextResponse.json(
    //     { error: "Failed to send email" },
    //     { status: 500 }
    //   );
    // }
    return;
    // return NextResponse.json(
    //   { message: "Email sent successfully", data },
    //   { status: 200 }
    // );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
