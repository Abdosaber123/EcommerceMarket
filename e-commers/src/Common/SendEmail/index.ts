import * as nodemailer from "nodemailer"
import { MailOptions } from "nodemailer/lib/json-transport"
export const sendEmail = async (mailoption: MailOptions) => {
    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASSWORD
        }
    })
    mailoption.from = `Abn Saber <${process.env.USER_EMAIL}`
    await transport.sendMail(mailoption)
}