import { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const { data, error } = await resend.emails.send({
    from: '<onboarding@resend.dev>',
    to: email,
    subject: '@2FA Code',
    html: `<p>Your 2FA code: ${token}</p>`
  });
}

const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/new-verification?token=${token}`

  const { data, error } = await resend.emails.send({
    from: '<onboarding@resend.dev>',
    to: email,
    subject: 'Verification email',
    html: `<p>Click <a href=${confirmLink}>confirm email.</a></p>`
  });
};

const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/new-password?token=${token}`

  const { data, error } = await resend.emails.send({
    from: '<onboarding@resend.dev>',
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href=${resetLink}>reset password.</a></p>`
  });
};

export { sendVerificationEmail, sendPasswordResetEmail };