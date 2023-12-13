require('dotenv').config({ path: './.env' });
const express = require("express");
const cookieParser = require('cookie-parser');
const db = require("./models/index");
const admin = db.admins;
const cors = require("cors");
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");
const app = express();
const notfound = require("./middlewares/notFound");
const authenticate = require("./middlewares/authenticate");
const manageUserRouter = require('./routes/user.routes');
const manageLawyerRouter = require('./routes/lawyer.routes');
//const sendEmail =require("./utils/sendEmail");





//To Get DATA and COOKIES from Frontend
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());



db.sequelize
  .sync()

  .catch(error => logError('Something went wrong', error))
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.use("/register", require('./routes/register'));
app.use("/login", require('./routes/login'));
app.use("/logout", require('./routes/logout'));
app.use("/verify-otp", require('./routes/verifyOtp'));
app.use("/forgot-password", require('./routes/forgotPassword'));
app.use("/otp-mail",require('./routes/otpMail'));
app.use('/admin/manage-lawyers', manageLawyerRouter);
app.use('/admin/manage-users', manageUserRouter);
app.use('/user/view-lawyers',manageLawyerRouter);


// app.get('/admin/add',(req,res) =>
// {
//     const data={
//       admin_email : "f200374@cfd.nu.edu.pk",
//       admin_name : "Umair Shahid",
//       admin_password : "admin"
//     }
//     //Insert
//     admin.create(data)
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the Admin.",
//       });
//     });
// });



//Authentication
app.get('/auth', authenticate, (req, res) => {
});

//To Mail
app.get("/mail", function (req, res) {
  // sendEmail('xyz@gmail.com', 'OTP Verification', `Your OTP is: 12asq2`);
  const nodemailer = require("nodemailer");
  let testAccount = nodemailer.createTestAccount();

  // connect with the smtp
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'reba75@ethereal.email',
      pass: 'KMWjtqwMnNpnFT7JGG'
    }
  });

  let info = transporter.sendMail({
    from: '"Welcome to Legalease Nesus" <legalease-nexus@gmail.com>',
    to: "umair.shahid644@gmail.com",
    subject: "Test mail2",
    text: "This is my test mail",
    html: "<h1 style='color:red;'>Mail through node mailer</h1>",
  })
   .then(info => {
    console.log("Message sent: %s", info.messageId);
    res.json(info);
  })
    .catch(error => {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Legalease Nexus!" });
});

app.use("*", notfound);

app.get('*', function (req, res) {
  res.send(`The Url you are accessing is invalid ${req.url}`, 404);
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://127.0.01:${PORT} .`);
});