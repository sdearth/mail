const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')

//create route handler
const router = express.Router()
const app = express()
const port = 3000

//create middleware to process request url encoded JSON body
//can handle string and array values w/i JSON
app.use(bodyParser.urlencoded( {extended: false}))
app.use(bodyParser.json())

//set up middleware to serve static html files
app.use('/', express.static('public/html'))

//process POST requests sent to the handle path
router.post('/handle', (req, resp) => {
    console.log(req.body.email)
    console.log(req.body.resume)

    //send email using gmail account specified in the 
    //USER and PASS environment variables
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.USER,
          pass: process.env.PASS
        }
    });

    //set up mail message to be sent
    const mailOptions = {
        from: 'sdfilter@gmail.com',
        to: req.body.email,
        subject: 'Sending Email using Node.js',
        text: req.body.resume
    };
    //send the email, and send a response back based on whether 
    //it sent successfully.
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            resp.status(500).end(error.message)
        } else {
            resp.status(200).end('email sent')
        }
    });
})

// set up router to handle the application route.
app.use("/", router)

// start listening for requests on the specified port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})