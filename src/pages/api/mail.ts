// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MailtrapClient } from 'mailtrap';
import type { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.method === 'POST') {
        try {
            var reg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
            const token = process.env.MAILTRAP_TOKEN;
            const sendemail = process.env.MAILTRAP_SENDER;
            const reciver = process.env.MAILTRAP_RECIPIENT;
            const { email, name, message } = req.body;
            if(!token || !sendemail || !reciver) {
                return res.status(400).json({error: true, message: 'No token provided'});
            }
            if(!email) {
                return res.status(400).json({error: true, message: 'No email provided'});
            }
            if(!name) {
                return res.status(400).json({error: true, message: 'No name provided'});
            }
            if(!message) {
                return res.status(400).json({error: true, message: 'No message provided'});
            }
            if(!reg.test(email)) {
                return res.status(400).json({error: true, message: 'Invalid email'});
            }
            const client = new MailtrapClient({ token: token });
            const sender = { name: `${email}`, email: sendemail};
    
            await client
            .send({
              category: "nokkvi.is",
              from: sender,
              to: [{ email: reciver }],
              subject: `Message from ${name}`,
              html: `
              <!doctype html>
                <html>
                <head>
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                </head>
                <body style="font-family: sans-serif;">
                    <div style="display: block; margin: auto; max-width: 600px;" class="main">
                    <h1 style="font-size: 18px; font-weight: bold; margin-top: 20px">You have new message from: ${name}, email: ${email}</h1>
                    <p>${message}</p>
                    </div>
                    <!-- Example of invalid for email html/css, will be detected by Mailtrap: -->
                    <style>
                    .main { background-color: white; }
                    </style>
                </body>
                </html>
            `
            });
            return res.status(200).json({ success: true })
        } catch (error:any) {
            console.log(error);
            return res.status(400).json({ error: true, message: error.message });
        }
    }
}
