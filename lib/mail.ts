import { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/new-verification?token=${token}`

  const { data, error } = await resend.emails.send({
    from: 'Auth App <onboarding@resend.dev>',
    to: email,
    subject: 'Hello world',
    html: `<p>Click <a href=${confirmLink}>here</a></p>`
  });
};

export { sendVerificationEmail };