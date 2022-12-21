const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
var nodemailer = require('nodemailer');
// const sabproductswalaarray = require('C:/Users/91976/OneDrive/Desktop/Udemy/bootstraps/public/js/script2.js');

const app = express();

var newtitle="grocers";

var registername="";
var registerusername="";
var registerpass="";
var registerphone=0;
var registeremail="";
var registeraddress="";

var cattoadd="";
var subcattoadd="";
var nametoadd="";
var pricetoadd="";
var quatoadd="";

var logusername="profile";

var nameofbuyer = "";
var usernameofbuyer = "";
var passwordofbuyer = "";
var mobileofbuyer = "";
var emailofbuyer = "";
var addressofbuyer = "";

let date_ob = new Date();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
var todaymonth = "";
let year = date_ob.getFullYear();

var thatarray = [];
var thata = "";
var thatab = 0;
var thatac = 0;
var thatabi = "";
var thataci = "";
var thattax = "";

let myArrayz = [];
let jik = [];

var bestitems = [];

app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect("mongodb+srv://QWERTY:agkmkb@cluster0.hkatlut.mongodb.net/newdb");

const structure = new mongoose.Schema({
  Product: String,
  Price: String,
  Quantity: String
});
const structure2 = new mongoose.Schema({
  Name: String,
  Username: String,
  Password: String,
  PhoneNumber: Number,
  Email: String,
  Address: String
});
const structure3 = new mongoose.Schema({
  Nameofcust: String,
  Items: [structure],
  totalam: String,
  totaltax: String
});
const structure4 = new mongoose.Schema({
  Category: String,
  SubCategory: String,
  Product: String,
  Price: String,
  Quantity: String,
  Image: String
});
const structure5 = new mongoose.Schema({
  Name: String,
  Username: String,
  Password: String,
  PhoneNumber: String,
  Email: String,
  Address: String,
  Items: [structure],
  totalam: String,
  totaltax: String
});

const collection4 = mongoose.model("collection4", structure);

const collection3 = mongoose.model("collection3", structure);

const collection = mongoose.model("collection1", structure3);

const collection2 = mongoose.model("collection2", structure2);

const collection5 = mongoose.model("onewhereadminentersitems", structure4);

const collection6 = mongoose.model("collection6", structure5);

app.get('/', function(request, response){
  response.render('index', {yis:"", titlename: newtitle, stateofbutton:"", newcust:"profile", city: "Naigaon", city2: "Dadar", city3: "Mumbai"});
})

app.post('/', function(request, response){
  newtitle = request.body.searchitem;
  response.redirect("/");
})


app.post('/logedin', function(request, response){
  logusername= request.body.username;
  let directbest = [];
  collection2.exists({Username:logusername}, function (err, doc) {
    if (err){
        console.log(err)
    }
    else {
        if(doc){
          var bestselers = [];
          async function run() {

            const agg = collection3.aggregate([{$sortByCount:  "$Product"}]);
            for await (const doc of agg) {
              bestselers.push(doc._id);
            }
            // console.log(bestselers);
            for(var i=0;i<15;i++) {
              console.log(bestselers[i]);
              collection5.find({Product:bestselers[i]},function(err, alldocs){
                if(err){
                  console.log(err);
                }
                else{
                  console.log(alldocs[0]);
                }
              });
            }
          }
          run();
          collection2.find({Username:logusername},function (err, twodoc){
            if(err){
              console.log(err);
            }
            else{
              allinfoseven = twodoc[0].Address;
              jik = allinfoseven.split(", ");
              response.render('index', {yis:"",titlename: newtitle, stateofbutton:"disabled", newcust: logusername, city: jik[2], city2: jik[3], city3: jik[4]});
            }
          })
        }
        else{
          console.log("Incorrect username or password");
          response.redirect("/");
        }
    }
  });
})

app.post('/adminlogedin', function(request, response){
  var adminuname= request.body.usernameadmin;
  if(adminuname="a"){
    response.render('adminpage', {varchnaav: "Grocers"});
  }
  else{
    console.log("Incorrect username or password");
    response.redirect("/");
  }
})

app.post('/viewhist', function(request, response){
  collection6.find({},{_id:0,__v:0},function(err, alldocs){
    if(err){
      console.log(err);
    }
    else{
      for (var i = 0, array2 = []; i < alldocs.length; i++) {
        var el2 = alldocs[i];
        array2.push([el2.Name, el2.Address, el2.Items]);
      }
      for (var i = 0, array3 = []; i < alldocs.length; i++) {
        var el3 = alldocs[i];
        array3.push(el3.Items);
      }
      response.render('transpage', {varchnaav2: "Transaction histories", alldocs: array2, alldocs2: array3});
      // 
    }
  });
  
})

app.post('/viewcusts', function(request, response){
  collection2.find({},{_id:0,__v:0},function(err, alldocs){
    if(err){
      console.log(err);
    }
    else{
      for (var i = 0, array2 = []; i < alldocs.length; i++) {
        var el2 = alldocs[i];
        array2.push([el2.Name, el2.Username, el2.Password, el2.PhoneNumber, el2.Email, el2.Address]);
      }
      response.render('custdetails', {varchnaav3: "Customer Details", alldocs: array2});
    }
  });
  
})

app.post('/viewprods', function(request, response){
  collection5.find({},{_id:0,__v:0},function(err, alldocs){
    if(err){
      console.log(err);
    }
    else{
      for (var i = 0, array2 = []; i < alldocs.length; i++) {
        var el2 = alldocs[i];
        array2.push([el2.Product, el2.Price, el2.Quantity, el2.Category, el2.SubCategory, el2.Image]);
      }
      response.render('productdetails', {varchnaav4: "Product Details", alldocs: array2});
      // 
    }
  });
  
})

app.post('/adminadditem', function(request, response){
  console.log(request.body.categoryadd);
  console.log(request.body.subcategoryadd1);
  console.log(request.body.Proaddname);
  console.log(request.body.Proaddprice);
  console.log(request.body.Proaddquantity);

  cattoadd=request.body.categoryadd;
  subcattoadd=request.body.subcategoryadd1;
  nametoadd=request.body.Proaddname;
  pricetoadd=request.body.Proaddprice;
  quatoadd=request.body.Proaddquantity;

  const itemtobeadded = new collection5({
    Category: cattoadd,
    SubCategory: subcattoadd,
    Product: nametoadd,
    Price: pricetoadd,
    Quantity: quatoadd,
    Image: "images/wholewheat.avif"
  });
  
  collection5.insertMany([itemtobeadded], function(err){
      if(err){
        console.log(err);
      }
      else{
        response.render('index', {yis:"",titlename: newtitle, stateofbutton:"", newcust:"profile", city: "Naigaon", city2: "Dadar",city3:"Mumbai"});
      }
  })
  // response.redirect("/");
})

app.post('/gotonext', function(req, res){
  if(logusername=="profile"){
    // alert("login first");
    res.render('index', {yis:"", titlename: newtitle, stateofbutton:"", newcust:"profile", city: "Naigaon", city2: "Dadar",city3:"Mumbai"});
  }
  else{
  collection5.find({},{_id:0,__v:0},function(err, alldocs){
    if(err){
      console.log(err);
    }
    else{
      for (var i = 0, array2 = [], array3 = [], array4 = [], array5 = [], array6 = [], array7 = []; i < alldocs.length; i++) {
        var el2 = alldocs[i];
        if(el2.SubCategory=="Milk"){
          array2.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="Bread"){
          array3.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="Breakfast"){
          array4.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="Eggs"){
          array5.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="Curd"){
          array6.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="Butter"){
          array7.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
      }
      res.render('catpage', {newcust: logusername, alldocs: array2, alldocs2: array3, alldocs3: array4, alldocs4: array5, alldocs5: array6, alldocs6: array7});
    }
  });}
})

app.post('/gotonext2', function(req, res){
  collection5.find({},{_id:0,__v:0},function(err, alldocs){
    if(err){
      console.log(err);
    }
    else{
      for (var i = 0, array2 = [], array3 = [], array4 = [], array5 = [], array6 = [], array7 = []; i < alldocs.length; i++) {
        var el2 = alldocs[i];
        if(el2.SubCategory=="masks"){
          array2.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="handwash"){
          array3.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="feminine"){
          array4.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="wound"){
          array5.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="needs"){
          array6.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="oth"){
          array7.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
      }
      res.render('catpage2', {newcust: logusername,alldocs: array2, alldocs2: array3, alldocs3: array4, alldocs4: array5, alldocs5: array6, alldocs6: array7});
    }
  });
})

app.post('/gotonext3', function(req, res){
  collection5.find({},{_id:0,__v:0},function(err, alldocs){
    if(err){
      console.log(err);
    }
    else{
      for (var i = 0, array2 = [], array3 = [], array4 = [], array5 = [], array6 = [], array7 = []; i < alldocs.length; i++) {
        var el2 = alldocs[i];
        if(el2.SubCategory=="kitchen"){
          array2.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="cleaning"){
          array3.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="electricals"){
          array4.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="disinfictants"){
          array5.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="home"){
          array6.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="others"){
          array7.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
      }
      res.render('catpage3', {newcust: logusername, alldocs: array2, alldocs2: array3, alldocs3: array4, alldocs4: array5, alldocs5: array6, alldocs6: array7});
    }
  });
})

app.post('/gotonext4', function(req, res){
  collection5.find({},{_id:0,__v:0},function(err, alldocs){
    if(err){
      console.log(err);
    }
    else{
      for (var i = 0, array2 = [], array3 = [], array4 = [], array5 = [], array6 = [], array7 = []; i < alldocs.length; i++) {
        var el2 = alldocs[i];
        if(el2.SubCategory=="chips"){
          array2.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="beverages"){
          array3.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="sauces"){
          array4.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="sweets"){
          array5.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="instant"){
          array6.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="others3"){
          array7.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
      }
      res.render('catpage4', {newcust: logusername, alldocs: array2, alldocs2: array3, alldocs3: array4, alldocs4: array5, alldocs5: array6, alldocs6: array7});
    }
  });
})

app.post('/gotonext5', function(req, res){
  collection5.find({},{_id:0,__v:0},function(err, alldocs){
    if(err){
      console.log(err);
    }
    else{
      for (var i = 0, array2 = [], array3 = [], array4 = [], array5 = [], array6 = [], array7 = []; i < alldocs.length; i++) {
        var el2 = alldocs[i];
        if(el2.SubCategory=="Vegetables"){
          array2.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="Fruits"){
          array3.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="Seasonal"){
          array4.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="Exotics"){
          array5.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="FreshCuts"){
          array6.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="FrozenVeg"){
          array7.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
      }
      res.render('catpage5', {newcust: logusername, alldocs: array2, alldocs2: array3, alldocs3: array4, alldocs4: array5, alldocs5: array6, alldocs6: array7});
    }
  });
})

app.post('/gotonext6', function(req, res){
  collection5.find({},{_id:0,__v:0},function(err, alldocs){
    if(err){
      console.log(err);
    }
    else{
      for (var i = 0, array2 = [], array3 = [], array4 = [], array5 = [], array6 = [], array7 = []; i < alldocs.length; i++) {
        var el2 = alldocs[i];
        if(el2.SubCategory=="Cookies"){
          array2.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="Cream"){
          array3.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="Bread"){
          array4.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="Rusks"){
          array5.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="Bakingingredients"){
          array6.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="CakesRols"){
          array7.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
      }
      res.render('catpage6', {newcust: logusername, alldocs: array2, alldocs2: array3, alldocs3: array4, alldocs4: array5, alldocs5: array6, alldocs6: array7});
    }
  });
})

app.post('/gotonext7', function(req, res){
  collection5.find({},{_id:0,__v:0},function(err, alldocs){
    if(err){
      console.log(err);
    }
    else{
      for (var i = 0, array2 = [], array3 = [], array4 = [], array5 = [], array6 = [], array7 = []; i < alldocs.length; i++) {
        var el2 = alldocs[i];
        if(el2.SubCategory=="Tea"){
          array2.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="Coffee"){
          array3.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="GreenTea"){
          array4.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="HealthDrinks"){
          array5.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="ColdCoffee"){
          array6.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="FruJuices"){
          array7.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
      }
      res.render('catpage7', {newcust: logusername, alldocs: array2, alldocs2: array3, alldocs3: array4, alldocs4: array5, alldocs5: array6, alldocs6: array7});
    }
  });
})

app.post('/gotonext8', function(req, res){
  collection5.find({},{_id:0,__v:0},function(err, alldocs){
    if(err){
      console.log(err);
    }
    else{
      for (var i = 0, array2 = [], array3 = [], array4 = [], array5 = [], array6 = [], array7 = []; i < alldocs.length; i++) {
        var el2 = alldocs[i];
        if(el2.SubCategory=="SoftDrinks"){
          array2.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="EnergyDrinks"){
          array3.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="FruJuices"){
          array4.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="SodaMixers"){
          array5.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="Paani"){
          array6.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="ColdCoffee"){
          array7.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
      }
      res.render('catpage8', {newcust: logusername, alldocs: array2, alldocs2: array3, alldocs3: array4, alldocs4: array5, alldocs5: array6, alldocs6: array7});
    }
  });
})

app.post('/gotonext9', function(req, res){
  collection5.find({},{_id:0,__v:0},function(err, alldocs){
    if(err){
      console.log(err);
    }
    else{
      for (var i = 0, array2 = [], array3 = [], array4 = [], array5 = [], array6 = [], array7 = []; i < alldocs.length; i++) {
        var el2 = alldocs[i];
        if(el2.SubCategory=="Atta"){
          array2.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="BSM"){
          array3.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="Flours"){
          array4.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="Rice"){
          array5.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="Daals"){
          array6.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="others9"){
          array7.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
      }
      res.render('catpage9', {newcust: logusername, alldocs: array2, alldocs2: array3, alldocs3: array4, alldocs4: array5, alldocs5: array6, alldocs6: array7});
    }
  });
})

app.post('/gotonext10', function(req, res){
  collection5.find({},{_id:0,__v:0},function(err, alldocs){
    if(err){
      console.log(err);
    }
    else{
      for (var i = 0, array2 = [], array3 = [], array4 = [], array5 = [], array6 = [], array7 = []; i < alldocs.length; i++) {
        var el2 = alldocs[i];
        if(el2.SubCategory=="Ketchups"){
          array2.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="DipsandSpread"){
          array3.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="PeanuButter"){
          array4.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="Honey"){
          array5.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="Jam"){
          array6.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="Chutney"){
          array7.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
      }
      res.render('catpage10', {newcust: logusername, alldocs: array2, alldocs2: array3, alldocs3: array4, alldocs4: array5, alldocs5: array6, alldocs6: array7});
    }
  });
})

app.post('/gotonext11', function(req, res){
  collection5.find({},{_id:0,__v:0},function(err, alldocs){
    if(err){
      console.log(err);
    }
    else{
      for (var i = 0, array2 = [], array3 = [], array4 = [], array5 = [], array6 = [], array7 = []; i < alldocs.length; i++) {
        var el2 = alldocs[i];
        if(el2.SubCategory=="appliances"){
          array2.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="kitchen"){
          array3.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="stationary"){
          array4.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="toys"){
          array5.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="sports"){
          array6.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="decor"){
          array7.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
      }
      res.render('catpage11', {newcust: logusername, alldocs: array2, alldocs2: array3, alldocs3: array4, alldocs4: array5, alldocs5: array6, alldocs6: array7});
    }
  });
})

app.post('/gotonext12', function(req, res){
  collection5.find({},{_id:0,__v:0},function(err, alldocs){
    if(err){
      console.log(err);
    }
    else{
      for (var i = 0, array2 = [], array3 = [], array4 = [], array5 = [], array6 = [], array7 = []; i < alldocs.length; i++) {
        var el2 = alldocs[i];
        if(el2.SubCategory=="soaps"){
          array2.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="oral"){
          array3.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="feminine"){
          array4.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="cosmetics"){
          array5.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="handwash"){
          array6.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="moisturizers"){
          array7.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
      }
      res.render('catpage12', {newcust: logusername, alldocs: array2, alldocs2: array3, alldocs3: array4, alldocs4: array5, alldocs5: array6, alldocs6: array7});
    }
  });
})

app.post('/gotonext13', function(req, res){
  collection5.find({},{_id:0,__v:0},function(err, alldocs){
    if(err){
      console.log(err);
    }
    else{
      for (var i = 0, array2 = [], array3 = [], array4 = [], array5 = [], array6 = [], array7 = []; i < alldocs.length; i++) {
        var el2 = alldocs[i];
        if(el2.SubCategory=="chicken"){
          array2.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="seafood"){
          array3.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="SSH"){
          array4.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="Eggs"){
          array5.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="frozon"){
          array6.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="fakemeat"){
          array7.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
      }
      res.render('catpage13', {newcust: logusername, alldocs: array2, alldocs2: array3, alldocs3: array4, alldocs4: array5, alldocs5: array6, alldocs6: array7});
    }
  });
})

app.post('/gotonext14', function(req, res){
  collection5.find({},{_id:0,__v:0},function(err, alldocs){
    if(err){
      console.log(err);
    }
    else{
      for (var i = 0, array2 = [], array3 = [], array4 = [], array5 = [], array6 = [], array7 = []; i < alldocs.length; i++) {
        var el2 = alldocs[i];
        if(el2.SubCategory=="Breakfast"){
          array2.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="Noodles"){
          array3.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="Pasta"){
          array4.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="soup"){
          array5.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="frozon"){
          array6.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
        else if(el2.SubCategory=="mixes"){
          array7.push([el2.Category, el2.SubCategory, el2.Product, el2.Price, el2.Quantity, el2.Image]);
        }
      }
      res.render('catpage14', {newcust: logusername, alldocs: array2, alldocs2: array3, alldocs3: array4, alldocs4: array5, alldocs5: array6, alldocs6: array7});
    }
  });
})

app.post('/viewbill', function(request, response){


  collection6.find({},{_id:0, __v:0},function (err, onedoc){
    if(err){
      console.log(err);
    }
    else{
      thata = onedoc[0].totalam;
      var tyuo = onedoc[0].totaltax.split("₹");
      thatab = parseFloat(thata).toFixed(2);
      thatac = parseFloat(tyuo[1]);
      thatabi = thatab.toString();
      thataci = thatac.toString();
      var ghyu = thatab - thatac;
      var asdfcgvb = ghyu.toFixed(2);
      thattax = asdfcgvb.toString();
      thatarray = onedoc[0].Items;

      date_ob = new Date();
      hours = date_ob.getHours();
      minutes = date_ob.getMinutes();
      date = ("0" + date_ob.getDate()).slice(-2);
      month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      year = date_ob.getFullYear();

      switch(month){
        case "01": todaymonth = "January";
            break;
        case "02": todaymonth = "February";
            break;
        case "03": todaymonth = "March";
            break;
        case "04": todaymonth = "April";
            break;
        case "05": todaymonth = "May";
            break;
        case "06": todaymonth = "June"; 
            break;
        case "07": todaymonth = "July";
            break;
        case "08": todaymonth = "August";
            break;
        case "09": todaymonth = "September";
            break;
        case "10": todaymonth = "October";
            break;
        case "11": todaymonth = "November";
            break;
        case "12": todaymonth = "December";
            break;
        }

      nameofbuyer = onedoc[0].Name;
      emailofbuyer = onedoc[0].Email;
      usernameofbuyer = onedoc[0].Username;
      passwordofbuyer = onedoc[0].Password;
      mobileofbuyer = onedoc[0].PhoneNumber;
      addressofbuyer = onedoc[0].Address;

      myArrayz = addressofbuyer.split(", ");

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'kaptnn3m0@gmail.com',
          pass: 'yxgeafrakfunhvfo'
        }
      });
      
      var mailOptions = {
        from: 'kaptnn3m0@gmail.com',
        to: emailofbuyer,
        // to: 'ingletanmay404@gmail.com',
        subject: 'Grocers Invoice',
        text: ``,
        html: `<h2>GROCERS : Invoice for your order CRN-108837541</h2>
        <br>
        <h3>Hello ${nameofbuyer}!,</h3>
        <p>Thank you for choosing Grocers. Your order has been succesfully placed.<br>
        With Grocers, everything is accounted for.<br>
        Looking forward to serving you again.
        </p>      
        <span><h4>Order No: CRN-108837541</h4></span>
        <h4>Delivery Address: </h4>
        <p">${myArrayz[0]},<br> 
        ${myArrayz[1]},<br> 
        ${myArrayz[2]},<br>
        ${myArrayz[3]},<br> 
        ${myArrayz[4]},<br> 
        ${myArrayz[5]}
        </p>
        <table style="width:750px;margin-top:20px;">
          <tr>
            <td style="font-size:0.8rem">${date}th ${todaymonth} ${year}, ${hours}:${minutes} Hrs</td>
            <td style="font-size:0.8rem;text-align:right;">Payment Mode: Cash on Delivery </td>
          </tr>
          <tr>
            <td style="font-size:1.1rem;font-weight:Bolder">Subtotal</td>
            <td style="font-size:1.2rem;font-weight:Bolder;text-align:right;">Rs ${thatabi}</td>
          </tr>
        </table>
        <p style="text-align:center;">__________________________________________________________________</p>`  
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      response.render('invoice', {allitemsboughtnow: thatarray, monthn: todaymonth, yearn: year, daten: date, addressarray: myArrayz, amn: thataci, taxn:thattax, totn: thatabi, heisenbergkaemail: emailofbuyer, heisenbergkanumber: mobileofbuyer, heisenberg: nameofbuyer});
    
    }
  }).limit(1).sort({$natural:-1})
  


})

app.post('/custdataintodb', function(req, res){
  var registeraddone = "";
  var registeraddtwo = "";
  var registeraddthree = "";
  var registeraddfour = "";
  var registeraddfive = "";
  var registeraddsix = "";
  registername=req.body.regname;
  registerusername=req.body.regusername;
  registerpass=req.body.regpassword;
  registerphone=req.body.regphonenumber;
  registeremail=req.body.regEmailadd;
  registeraddone=req.body.regdateofaddone;
  registeraddtwo=req.body.regdateofaddtwo;
  registeraddthree=req.body.regdateofaddthr;
  registeraddfour=req.body.regdateofaddfor;
  registeraddfive=req.body.regdateofaddfiv;
  registeraddsix=req.body.regdateofaddsix;
  registeraddress=`${registeraddone}, ${registeraddtwo}, ${registeraddthree}, ${registeraddfour}, ${registeraddfive}, ${registeraddsix}`;

  const details = new collection2({
    Name: registername,
    Username: registerusername,
    Password: registerpass,
    PhoneNumber: registerphone,
    Email: registeremail,
    Address: registeraddress 
  });

  collection2.exists({Name:registername}, function (err, doc) {
    if (err){
        console.log(err)
    }
    else {
        if(doc){
          console.log("Already exists");
          res.redirect("/");
        }
        else{
          collection2.insertMany([details], function(err){
              if(err){
                console.log(err);
              }
              else{
                console.log("succesfully inserted");
              }
            }
          )
          res.render('index', {yis:"", titlename: newtitle, stateofbutton:"", newcust:"profile", city: "Naigaon", city2: "Dadar", city3:"Mumbai"});
        }
    }
  });
})

app.post('/done', function(req, res){
  res.redirect("/");
})

app.post("/request", (req, res) => {
  //  console.log(req.body.Items);
  //  console.log(req.body.totalam);
  //  console.log(req.body.totaltax);

   var elevenhourwork = req.body;

   var same = req.body.Items;
   var sametwo = req.body.totaltax;
   var samethree = req.body.totalam;
   var custnameagain = req.body.Nameofcust;
   var allinfoone = "";
   var allinfotwo = "";
   var allinfothree = "";
   var allinfofour = "";
   var allinfofive = "";
   var allinfosix = "";

   collection2.find({Username:custnameagain},function (err, onedoc){
    if(err){
      console.log(err);
    }
    else{
      allinfoone = onedoc[0].Name;
      allinfotwo = onedoc[0].Username;
      allinfothree = onedoc[0].Password;
      allinfofour = onedoc[0].PhoneNumber;
      allinfofive = onedoc[0].Email;
      allinfosix = onedoc[0].Address;

      const kuchtohkuch = new collection6({
        Name: allinfoone,
        Username:allinfotwo,
        Password:allinfothree,
        PhoneNumber:allinfofour,
        Email:allinfofive,
        Address:allinfosix,
        Items: same,
        totalam: sametwo,
        totaltax: samethree
      });
      collection6.insertMany([kuchtohkuch], function(err){
        if(err){
          console.log(err);
        }
        else{
          console.log("succesfully inserted");
        }
      })
    }
  })

  collection3.insertMany(same, function(err){
    if(err){
      console.log(err);
    }
    else{
      console.log("succesfully inserted");
    }
  })

  collection.insertMany(elevenhourwork, function(err){
    if(err){
      console.log(err);
    }
    else{
      console.log("succesfully inserted")
    }
  })

   
   var bestselers2 = [];
   async function run() {

      const agg = collection3.aggregate([{$sortByCount:  "$Product"}]);
      for await (const doc of agg) {
        bestselers.push(doc._id);
      }
      console.log(bestselers);
      for(var i=0;i<15;i++) {
        console.log(bestselers[i]);
        collection3.find({Product:bestselers[i]},function(err, alldocs){
          if(err){
            console.log(err);
          }
          else{
            console.log(alldocs);
            var bestselcol = new collection4(alldocs[0]);
            collection4.insertMany([bestselcol], function(err){
                if(err){
                  console.log(err);
                }
                else{
                  console.log("succesfully inserted");
                }
              });
          }
        });
      }
    }

  // run();

})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port);
