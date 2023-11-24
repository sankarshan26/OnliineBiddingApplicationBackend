const express = require("express");
const mongoose = require("mongoose");
const core = require("cors");
const UserModel = require("./models/Users");
const ItemModel = require("./models/Items");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");

const app = express();
app.use(core());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://sankarshan:sankarshan@cluster0.5tiy4jr.mongodb.net/?retryWrites=true&w=majority"
);

//Getting Details of all users for admin side.
app.get("/getallusers", (req, res) => {
  UserModel.find({})
    .then((users) => res.json(users))
    .catch((err) => console.log(err));
});

//Sign Up functionality
app.post("/createuser", (req, res) => {
  console.log(req.body);
  UserModel.create(req.body.signupState)
    .then((users) => res.json("success"))
    .catch((err) => res.json("not success"));
});

//Login Functionality
app.post("/userloginauthentication", async (req, res) => {
  // console.log(req.body.email);
  const email = req.body.email;
  const password = req.body.password;

  try {
    const check = await UserModel.findOne({ email: email, password: password });
    console.log(check +" Checking ");
    if (check) {
      res.json(["exist", check]);
    } else {
      res.json("Not exist");
    }
  } catch (e) {
    res.json("not exist");
  }
});

app.put("/updateuser", (req, res) => {
  const email = req.body.email;
  console.log(req.body)
  UserModel.findOneAndUpdate(
    { email: email },
    {
      email : email ,
      username: req.body.username,
      address: req.body.address,
      zipcode: req.body.zipcode,
      password: req.body.password,
      fullname: req.body.fullname,
      wallet: req.body.wallet,
    }
  ).then(user=>res.json(users))
  .catch(err=>res.json(err))
});

//getting all products
app.get("/getallproducts", (req, res) => {
  ItemModel.find({})
    .then((users) => {console.log(users);res.json(users)})
    .catch((err) => console.log(err));
});

//adding Product to inventory
app.post("/AddProduct", async (req, res) => {
  console.log(req.body);
  ItemModel.create(req.body.formDataSubmit)
    .then((users) => res.json("success"))
    .catch((err) => res.json(err));
});

//updating the current Price and Bid amount
app.put("/updatebid",(req,res)=>{
  // console.log(req.body.currPrice+10)
  const product = ItemModel.findOneAndUpdate({id : req.body.id},{
    name : req.body.name,
    rating : req.body.rating,
    endDate : req.body.endDate ,
    basePrice : req.body.basePrice,
    currPrice : req.body.currPrice ,
    Topbidder : req.body.Topbidder,
    image : req.body.image,
    images : [...req.body.images] ,
    TrendingDeal : req.body.TrendingDeal,
    TopDeal : req.body.TopDeal,
    description : req.body.description ,
  }).then(product=>res.json(product))
  .catch(error=>res.json(error)) ;
})


//delete user
app.delete("/deleteuser/:email",(req,res)=>{
  const email = req.params.email
  UserModel.findOneAndDelete({email : email})
  .then(result=>res.json(result))
  .catch(err=>res.json(err))
})

app.listen(8000, () => {
  console.log("Server is running ");
});
