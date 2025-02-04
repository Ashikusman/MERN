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
const cors = require("cors"); //(cors-get permission to connect with backend)
const mongoose = require("mongoose"); //(mongoose-help to connect with database)
const dotenv = require("dotenv").config(); //(dotenv-to use the environment variables in our project)
//const jwt = require("jsonwebtoken"); //Create token for user authentication


//middleware
const app = express();
app.use(cors());
//Gives error "undefined" because when data is coming from an Api it should be converted to JSON format
//Gives error "request entity too large" when limit is not set
app.use(express.json({ limit: "10mb" })); 


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

//API
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => console.log("server is running at port : " + PORT));

// User Schema
const userSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
    unique: true,
  },
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
const userModel = mongoose.model("newUser", userSchema);

//SignUp API 
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
      } 
      else {
        res.json({ success:false, message: "Email id already registered", alert: false });
      }
    })
    .then(() => {
      //const token = createToken(userModel._id)
      res.json({success:true, message: "Successfully signed up", alert: true }); //When alert is true,directs to login page      
      
    })
    .catch((err) => {
      console.log(err);
      res.json({ success: false, message: "Error occured" });
    });
});

// const createToken = (id) => {
//   return jwt.sign({id}, process.env.JWT_SECRET)
// }

//Login API
app.post("/login", (req, res) => {
  // console.log(req.body); 
  //To check if email is available in the database
  const { email } = req.body;

  userModel.findOne({ email: email }).then((result) => {
    if (result) {
      // console.log(result)
      const dataSend = {
        //_id: result._id,
        userId: result.userId,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        //adminemail : "admin123@gmail.com",
        // password: '123',
        // confirmPassword: '123',
        image: result.image,
      };
      // console.log(dataSend);
      //const token = createToken(userModel._id);
      res.json({
        success:true,
        message: "Logged in successfully",
        alert: true,
        data: dataSend,
      });          
    }
    else {
      res.json({success:false, message: "Email does not exist", alert: false });
    }
  });
});

//Api to fetch all the users 
app.get("/signup", async (req, res) => {
  const data = await userModel.find({});
  //res.send(data)
  res.send(JSON.stringify(data));
  //create useEffect in App.js
});

//Product Schema
const productSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
    unique: true,
  },
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
});

//Product Model
const productModel = mongoose.model("newProduct", productSchema);

//Product API
app.post("/uploadProduct", async (req, res) => {
  // console.log(req.body);
  const data = await productModel(req.body); //to save product in database
  const datasave = await data.save();
  res.send({ message: "Uploaded successfully" });
});

//Api to fetch all the products 
app.get("/product", async (req, res) => {
  const data = await productModel.find({});
  //res.send(data)
  res.send(JSON.stringify(data));
  //create useEffect in App.js
});

// Update specific product
app.post("/editproduct/id", async (req, res) => {
  try {
    const updatedProduct = await productModel.findOneAndUpdate(
      { id: req.params._id },
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).send("Product not found");
    }
    res.send({message: "Updated successfully",updatedProduct, alert: true});
  } catch (error) {
    res.status(500).send(error.message);
  }
});


//Reservation Schema
const reservationSchema = mongoose.Schema({
  reservationId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
    unique: true,
  },
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
const reservationModel = mongoose.model("newReservation", reservationSchema);

//Reservation API
app.post("/reservation", async (req, res) => {
  // console.log(req.body);
  const data = await reservationModel(req.body)
  const datasave = await data.save()
  res.send({message : "Reserved successfully", alert : true})

});

//Api to fetch last reservation 5.16.20
app.get("/reservation", async (req, res) => {
  //const data = await reservationModel.find({}); 
  const data = await reservationModel.find({})//.sort({reservationId:-1}).limit(1);
  //const data = await reservationModel.findOne({}).sort({_id:-1}); Uncaught (in promise) TypeError: action.payload is not iterable
  //const data = await reservationModel.findByAndUpdate(req.body._id).sort({_id:-1}).limit(1); //TypeError: reservationModel.findByAndUpdate is not a function
  //res.send(data)
  res.send(JSON.stringify(data));
  //create useEffect in App.js
});

const orderSchema = mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "newUser",
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "newProduct",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  reservation: {
    reservationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "newReservation",
    },
    noOfPerson: String,
    date: String,
    month: String,
    year: String,
    startTime: String,
    endTime: String,
    selectTable: String,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "Pending",
    enum: ["Pending", "Processing", "Delivered", "Cancelled"],
  },
});

const orderModel = mongoose.model("newOrder", orderSchema);

// API to create a new order
app.post("/order", async (req, res) => {
  try {
    const { user, products, totalAmount, reservation } = req.body;

    // Create a new order instance
    const order = new orderModel({
      user,
      products,
      totalAmount,
      reservation,
    });

    // Save the order to the database
    const savedOrder = await order.save();
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: savedOrder,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error occurred while creating order" });
  }
});



