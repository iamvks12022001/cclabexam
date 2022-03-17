var express = require("express");
var app = express();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var cors = require("cors");
var multer = require("multer"),
  bodyParser = require("body-parser"),
  path = require("path");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/vikash_111915138_DB");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "error in connecting the database"));

db.once("open", function () {
  console.log("Connected to Database ::Mongo DB");
});

// mongoose.connect("mongodb://localhost/productDB");
var fs = require("fs");
var product = require("./model/product.js");
var user = require("./model/user.js");

app.use(cors());
//app.use(express.static("uploads"));
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: false,
  })
);

app.use("/", (req, res, next) => {
  try {
    if (req.path == "/login" || req.path == "/register" || req.path == "/") {
      next();
    } else {
      /* decode jwt token if authorized*/
      jwt.verify(req.headers.token, "shhhhh11111", function (err, decoded) {
        if (decoded && decoded.user) {
          req.user = decoded;
          next();
        } else {
          return res.status(401).json({
            errorMessage: "User unauthorized!",
            status: false,
          });
        }
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: "Something went wrong!",
      status: false,
    });
  }
});

app.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    title: "Apis",
  });
});

/* login api */
app.post("/login", (req, res) => {
  try {
    if (req.body && req.body.username && req.body.password) {
      user.find({ username: req.body.username }, (err, data) => {
        if (data.length > 0) {
          if (bcrypt.compareSync(data[0].password, req.body.password)) {
            checkUserAndGenerateToken(data[0], req, res);
          } else {
            res.status(400).json({
              errorMessage: "Username or password is incorrect!",
              status: false,
            });
          }
        } else {
          res.status(400).json({
            errorMessage: "Username or password is incorrect!",
            status: false,
          });
        }
      });
    } else {
      res.status(400).json({
        errorMessage: "Add proper parameter first!",
        status: false,
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: "Something went wrong!",
      status: false,
    });
  }
});

/* register api */
app.post("/register", (req, res) => {
  try {
    if (req.body && req.body.username && req.body.password) {
      user.find({ username: req.body.username }, (err, data) => {
        if (data.length == 0) {
          let User = new user({
            username: req.body.username,
            password: req.body.password,
            empId: req.body.empId,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            dob: req.body.dob,
            contact_number: req.body.contact_number,
            misnumber: req.body.misnumber,
          });

          User.save((err, data) => {
            if (err) {
              res.status(400).json({
                errorMessage: err,
                status: false,
              });
            } else {
              res.status(200).json({
                status: true,
                title: "Registered Successfully.",
              });
            }
          });
        } else {
          res.status(400).json({
            errorMessage: `UserName ${req.body.username} Already Exist!`,
            status: false,
          });
        }
      });
    } else {
      res.status(400).json({
        errorMessage: "Add proper parameter first!",
        status: false,
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: "Something went wrong!",
      status: false,
    });
  }
});

function checkUserAndGenerateToken(data, req, res) {
  jwt.sign(
    { user: data.username, id: data._id },
    "shhhhh11111",
    { expiresIn: "1d" },
    (err, token) => {
      if (err) {
        res.status(400).json({
          status: false,
          errorMessage: err,
        });
      } else {
        res.json({
          message: "Login Successfully.",
          token: token,
          status: true,
        });
      }
    }
  );
}

app.post("/delete-product", (req, res) => {
  try {
    if (req.body && req.body.id) {
      product.findByIdAndUpdate(
        req.body.id,
        { is_delete: true },
        { new: true },
        (err, data) => {
          if (data.is_delete) {
            res.status(200).json({
              status: true,
              title: "Product deleted.",
            });
          } else {
            res.status(400).json({
              errorMessage: err,
              status: false,
            });
          }
        }
      );
    } else {
      res.status(400).json({
        errorMessage: "Add proper parameter first!",
        status: false,
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: "Something went wrong!",
      status: false,
    });
  }
});

app.get("/get-product", (req, res) => {
  try {
    user.find({}).then((users) => {
      console.log("f", users);
      return res.status(200).json({
        status: true,
        title: "Product retrived.",
        products: users,
      });
    });
  } catch (e) {
    //waiting till it get all the users
    res.status(400).json({
      errorMessage: "Something went wrong!",
      status: false,
    });
  }
});

app.get("/get-salary", (req, res) => {
  try {
    let sa1 = new product({
      empId: "1",
      misnumber: "111915138",
      job: "student",
      month_salary: "3000",
      yearly_salary: "48000",
    });
    sa1.save();
    product.find({}).then((sal) => {
      console.log("fsa", sal);
      return res.status(200).json({
        status: true,
        title: "Product retrived.",
        sal: sal,
      });
    });
  } catch (e) {
    //waiting till it get all the users
    res.status(400).json({
      errorMessage: "Something went wrong!",
      status: false,
    });
  }
});

app.listen(2000, () => {
  console.log("Server is Runing On port 2000");
});
