import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { to } = await req.json(); 

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    console.log({ to, otp });

    const transporter = nodemailer.createTransport({
      secure: true,
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const html = `
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #e6fffa;">
      <div style="max-width: 500px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <h1 style="color: #0f766e; font-size: 24px;">Welcome to NoteKeep!</h1>
        <p style="font-size: 18px; color: #155e75;">
          Hi! Thanks for signing up with NoteKeep. Here is your OTP for verification:
        </p>
        <div style="font-size: 30px; font-weight: bold; color: #065f46; padding: 10px; background-color: #ccfbf1; display: inline-block; border-radius: 5px;">
          ${otp}
        </div>
        <p style="font-size: 16px; color: #0f766e; margin-top: 10px;">
          This OTP is valid for 5 minutes.
        </p>
        <p style="font-size: 14px; color: #475569; margin-top: 20px;">
          If you didn't request this, please ignore this email.
        </p>
      </div>
    </div>`;

    const mailOptions = {
      from: process.env.MAIL_USER, 
      to,
      subject: 'Your OTP Code',
      html, 
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);

    return Response.json({ success: true, otp }, { status: 200 }); 
  } catch (error) {
    console.error('Error sending email:', error);
    return Response.json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
}
