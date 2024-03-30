const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const path = require('path'); // Node.js module for file paths


// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.post('/submit', (req, res) => {
    const formData = req.body;

    // Set up nodemailer transporter with SMTP credentials
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Assuming you're using Gmail. You can change it based on your email provider.
        auth: {
            user: 'harishkumar251603@gmail.com', // Your email address
            pass: 'nksclugggkzkmonu' // Your email password or an app-specific password
        }
    });

    // Email content
    const mailOptions = {
        from: 'harishkumar251603@gmail.com',
        to: 'harishkumar251603@gmail.com', // Send to your own email address
        subject: 'New Form Submission',
        text: `Form Data: ${JSON.stringify(formData)}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent:', info.response);
            res.send('Form submitted successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
