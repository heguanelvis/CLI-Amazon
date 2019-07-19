require("dotenv").config();
require("console.table");

var mysql = require("mysql");
var inquirer = require("inquirer");
var validator = require("validator");
var productID;
var howmanytobuy;

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: 3306,

  // Your username
  user: process.env.DB_USER,

  // Your password
  password: process.env.DB_PASSWORD,
  database: "bamazondb"
});

connection.connect(function(err) {
  if (err) throw err;
  // put functions here
  displayAllItems();
  setTimeout(function() {
    start();
  }, 1000);
});

function start() {
  inquirer
    .prompt([
      {
        name: "buyornot",
        message: "Would you like to buy something?",
        type: "confirm",
        default: true
      }
    ])
    .then(answers => {
      if (answers.buyornot) {
        userBuy();
      } else {
        console.log("See you next time!");
        process.exit();
      }
    });
}

function isID(value) {
  if (validator.isInt(value) == false) {
    return "Please enter a valid ID number.";
  }
  return true;
}

function isNum(value) {
  if (validator.isInt(value) == false) {
    return "Please enter a valid quantity number.";
  }
  return true;
}

function displayAllItems() {
  connection.query("SELECT * FROM bamazondb.products", (err, res) => {
    console.table(res);
  });
}

function userBuy() {
  inquirer
    .prompt([
      {
        name: "productID",
        type: "input",
        message: "What is the ID of the product you would like to buy?",
        validate: isID
      },
      {
        name: "howmanytobuy",
        type: "input",
        message: "How many of the products would you like to buy?",
        validate: isNum
      }
    ])
    .then(answers => {
      productID = answers.productID;
      howmanytobuy = answers.howmanytobuy;

      var query = "SELECT * FROM bamazondb.products WHERE ?";
      connection.query(query, { item_id: productID }, (err, res) => {
        res = JSON.parse(JSON.stringify(res))[0];
        if (res.stock_quantity < howmanytobuy) {
          console.log("Insufficient Quantity...");
          setTimeout(function() {
            start();
          }, 1000);
        } else {
          console.log("Processing Order...");
          var numLeft = res.stock_quantity - parseInt(howmanytobuy);
          updateProduct(numLeft, productID);
          setTimeout(function() {
            start();
          }, 1000);
        }
      });
    });
}

function updateProduct(updateNum, id) {
  var query = "UPDATE bamazondb.products SET ? WHERE ?";
  connection.query(
    query,
    [
      {
        stock_quantity: updateNum
      },
      {
        item_id: id
      }
    ],
    (err, res) => {
      console.log("Check our updated product list!");
      displayAllItems();
    }
  );
}
