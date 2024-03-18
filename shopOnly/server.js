const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/send-email', (req, res) => {
  const userName = req.query.userName; // Correct the variable name to userName
  const userEmail = req.query.userEmail;
console.log("userName",userName)
console.log("userEmail",userEmail)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'top2006design@gmail.com',
      pass: 'elps vofs vnnl zwfn'
    }
  });

  const mailOptions = {
    /* from: '"هيك الكيك" <top2006design@gmail.com>', */ // Set the alias here,
    from: {
      name: 'هيك الكيك',
      address: 'top2006design@gmail.com'
    },
    to: userEmail,
    subject: userName + ' تم استلام بيانات طلب التوظيف!',
    text:'اهلا بك ' + userName + ' في بوابة هيك الكيك للتوظيف. تم استلام طلب التوظيف الخاص بكم، وسيتم التواصل معكم عن طريق البريد الالكتروني او الواتس اب للمزيد من التفاصيل. \r\n هيك الكيك',
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email sent successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
