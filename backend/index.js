//For backend

//npm init
//npm i express cors mongoose
//node index.js
//npm i nodemon
//under test of script tag in package.json
/*"dev":"nodemon index.js",
"start":"node index.js"*/
//To start server "npm run dev"

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

//middleware
const corsOptions = {
  origin: "http://localhost:3000"
}

const app = express();
app.use(cors(corsOptions));
//Gives error "undefined" because when data is coming from an Api it should be converted to JSON format
//Gives error "request entity too large" when limit is not set
app.use(express.json({ limit: "10mb" })); //2.14.44
//2.19.51

const PORT = process.env.PORT || 8080;

//Mongodb connection
//In env file copy the password in the url and add the collection name "user" after the exclamation mark
console.log(process.env.MONGODB_URL);

//Gives error "undefined" because env was not installed in package.json
//To install "npm install dotenv" 2.28.56
//To fix error "URI must include hostname, domain name, and tld at resolveSRVRecord", use percentage for special characters like "@, /, #"
//connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connect to Database"))
  .catch((err) => console.log(err));

// User Schema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmPassword: String,
  image: String,
});

//User Model
const userModel = mongoose.model("user", userSchema);

//API
app.get("/", (req, res) => {
  res.send("Server is running");
});

//SignUp API 2.04.5
app.post("/signup", (req, res) => {
  // console.log(req.body);
  //To check if email is available in the database
  const { email } = req.body;

  userModel
    .findOne({ email: email })
    .then((result) => {
      if (!result) {
        const data = userModel(req.body);
        return data.save();
      } else {
        res.send({ message: "Email id already registered", alert: false });
      }
    })
    .then(() => {
      res.send({ message: "Successfully signed up", alert: true }); //When alert is true,directs to login page
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: "Error occured" });
    });
});

//Login API
app.post("/login", (req, res) => {
  // console.log(req.body); //2.52.39
  //To check if email is available in the database
  const { email } = req.body;

  userModel.findOne({ email: email }).then((result) => {
    if (result) {
      // console.log(result)
      const dataSend = {
        _id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        //adminemail : "admin123@gmail.com",
        // password: '123',
        // confirmPassword: '123',
        image: result.image,
      };
      // console.log(dataSend);
      res.send({
        message: "Logged in successfully",
        alert: true,
        data: dataSend,
      });
    }

    else {
      res.send({ message: "Email does not exist", alert: false });
    }
  });
});

//Product Schema
const productSchema = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
});

//Product Model
const productModel = mongoose.model("product", productSchema);

//Product API
app.post("/uploadProduct", async (req, res) => {
  // console.log(req.body);
  const data = await productModel(req.body); //to save product in database
  const datasave = await data.save();
  res.send({ message: "Uploaded successfully" });
});

//Api to fetch all the products 5.16.20
app.get("/product", async (req, res) => {
  const data = await productModel.find({});
  //res.send(data)
  res.send(JSON.stringify(data));
  //create useEffect in App.js
});

//Reservation Schema
const reservationSchema = mongoose.Schema({
  noOfPerson: String,
  date: String,
  month: String,
  year: String,
  startTime: String,
  endTime: String,
  selectTable: String,
});

// app.get("/reservation", async (req, res) => {
//   res.send("Server is running");
// });

//Reservation model
const reservationModel = mongoose.model("reservation", reservationSchema);

//Reservation API
app.post("/reservation", async (req, res) => {
  // console.log(req.body);
  const data = await reservationModel(req.body)
  const datasave = await data.save()
  res.send({message : "Reserved successfully", alert : true})

});

//Checkout
app.post("/checkout", async (req, res) => {
  // console.log(req.body)

  res.send({message : "payment gateway", success : true})
})

app.listen(PORT, () => console.log("server is running at port : " + PORT));
