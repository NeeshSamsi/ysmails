import dotenv from "dotenv"
import nodemailer from "nodemailer"
import { google } from "googleapis"
import { MailOptions, Attachment, EmailStatus } from "../types"

dotenv.config()
const OAuth2 = google.auth.OAuth2

// GOOGLE OAUTH2

const createTransporter = async () => {
  try {
    const oauth2Client = new OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    )

    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    })

    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          reject(err)
        }
        resolve(token)
      })
    })

    const transporter = nodemailer.createTransport({
      // @ts-ignore - Nodemailer types are wrong
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        accessToken,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
      },
    })

    return transporter
  } catch (error) {
    console.log(error)
  }
}

// NODEMAILER

// emailOptions - {to, from, subject, text || html, attachments: []}
export const sendEmail = async (mailOptions: MailOptions) => {
  let emailTransporter = await createTransporter()
  if (!emailTransporter) return

  let log
  log = await emailTransporter.sendMail(mailOptions)
  // @ts-ignore - Nodemailer types are wrong
  if (log.error) {
    // @ts-ignore - Nodemailer types are wrong
    return { status: EmailStatus.ERROR, error: log.error }
  } else {
    return { status: EmailStatus.SUCCESS, error: log.accepted[0] }
  }
}

export default sendEmail
