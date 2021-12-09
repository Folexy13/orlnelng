// Module Dependencies
require("dotenv").config();
var express = require("express");
var path = require("path");
var logger = require("morgan");
var session = require("express-session");
var mailer = require("nodemailer");

// Configuring our app
var app = express();
//Setting Port
PORT = process.env.PORT || 3000
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// Serving static File
app.use(express.static("public"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({ secret: "mySecret", resave: false, saveUninitialized: false })
);
app.use(express.static(path.join(__dirname, "public")));

// Get the homepage
app.get("/", (req, res, next) => {
  res.render("index", { title: "Ornelng|Home"});
});

// Get the pdf File
app.get("/pdf", function (req, res) {
  res.sendFile(__dirname + "/pdf/plan_sheet.pdf");
});

// Mail handler
app.post("/report", function (req, res) {
  var transporter = mailer.createTransport({
    service: "GMAIL",
    port: 465,
    secure: true,
    auth: {
      user: "folajimiopeyemisax13@gmail.com",
      pass: "orcwvywibveowbql",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  let from = "folajimi<folajimiopeyemisax13@gmail.com>";
  var name = req.body.name;
  var email = req.body.email;
  var emailOptions = {
    from: from,
    to: email,
    cc: "folajimiopeyemisax13@gmail.com",
    subject: "Request Recieved",
    text:
      "Dear Mr/Mrs " +
      name +
      " We Recieved Your Mail but kindly wait for us while an agent get back to you on/before 24 hours. We would reply you on " +
      email,
  };
  transporter.sendMail(emailOptions, (err, info) => {
    if (err) {
      console.log(err);
      res.redirect("/");
    } else {
      res.redirect("back");
    }
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(PORT, () => {
  console.log(`Server now Listening on ${PORT} `)
})
module.exports = app;
