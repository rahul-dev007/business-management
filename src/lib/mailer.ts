import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER!, // Non-null assertion: নিশ্চিত `.env` আছে
    pass: process.env.EMAIL_PASS!,
  },
});

export async function sendOTPEmail(to: string, otp: string): Promise<boolean> {
  const mailOptions = {
    from: process.env.EMAIL_USER!,
    to,
    subject: 'আপনার OTP কোড',
    html: `<h2>আপনার OTP: ${otp}</h2><p>এই কোডটি 5 মিনিটের জন্য কার্যকর থাকবে।</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ OTP ইমেইল পাঠানো হয়েছে');
    return true;
  } catch (error) {
    console.error('❌ ইমেইল পাঠাতে সমস্যা হয়েছে:', error);
    return false;
  }
}
