import nodemailer from 'nodemailer';

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'abyuday.in@gmail.com',
        pass: 'gqsdkpawejphqgwn'
    }
});

// Function to send OTP email
const sendOtpEmail = async (recipientEmail, otp) => {
    const mailOptions = {
        from: 'abyuday.in@gmail.com',
        to: recipientEmail,
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otp}`,
        html:  `
        <html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify your login</title>
    <!--[if mso]><style type="text/css">body, table, td, a { font-family: Arial, Helvetica, sans-serif !important; }</style><![endif]-->
    <style type="text/css">
        /* Mobile-specific styles */
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
            }
        }
    </style>
</head>
<body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;">
    <table role="presentation" class="email-container" style="width: 100%; max-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: rgb(239, 239, 239); margin: 0 auto;">
        <tbody>
            <tr>
                <td align="center" style="padding: 1rem; vertical-align: top;">
                    <table role="presentation" style="width: 100%; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left;">
                        <tbody>
                            <tr>
                                <td style="padding: 20px 0px;">
                                    
                                    <div style="padding: 20px; background-color: rgb(255, 255, 255); border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                                        <div style="color: rgb(0, 0, 0); text-align: center;">
                                            <h1 style="margin: 1rem 0; color: #333;">Verification Code</h1>
                                           
                                            <div style="background-color: #f0f0f0; padding: 12px 24px; font-size: 36px; font-weight: bold; color: #333; border-radius: 8px; display: inline-block;">
                                                ${otp}
                                            </div>
                                            <p style="padding-top: 16px; padding-bottom: 16px;">If you didn’t request this, you can ignore this email.</p>
                                            <p style="padding-bottom: 16px;">Thanks,<br>The Abyuday team</p>
                                        </div>
                                    </div>
                                    <div style="padding-top: 20px; color: rgb(153, 153, 153); text-align: center;">
                                        <p style="padding-bottom: 16px;">Made with ♥ in India</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</body>
</html>

    `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
        console.log('Message ID:', info.messageId);
    } catch (error) {
        console.error('Error occurred:', error.message);
    }
};


export {sendOtpEmail};