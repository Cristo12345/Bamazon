// npm install these packages first
var inquire = require("inquirer");
var mysql = require("mysql");

// creating the connection to the bamazon database
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Soccer!101",
    database: "bamazon_db"
})

// Initialize affter connection to database
connection.connect(function (err) {
    if (err) throw err;
    console.log("Welcome to Bamazon!");
    displayItems();
})



// function to display items in DB as well as ask user what thay would like to buy and how much
function displayItems() {
    // displaying products and their info to the console
    var query = connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        // having trouble with inquirer choice, this is my work around
        // create an array storing all the id's and allow user to select from that array
        var resIDs = [];

        for (let i = 0; i < res.length; i++) {
            console.log("Product Name: " + res[i].product_name);
            console.log("Product ID: " + res[i].id);
            console.log("Price: " + res[i].price);
            console.log("Department: " + res[i].department_name);
            console.log("Quantity: " + parseFloat(res[i].stock_quantity));
            console.log("-----------------------------------\n");
            // adding each id to our array
            resIDs.push(res[i].id);
        }


        // list prompt for user to select ID of the item they would like to buy
        inquire.prompt({
            name: "product",
            type: "list",
            message: "Select the ID of the product you would like to buy.",
            choices: resIDs
            //after user selects an ID, ask how many of that item they want
        }).then(function (res) {
            console.log("You selected item " + res.product);
            inquire.prompt({
                name: "quantity",
                type: "input",
                message: "How many would you like to buy?",
                // validation to make sure that user input is a whole, non-negative number
                validate: function (value) {
                    if ((Number.isInteger(parseFloat(value)) === true) && (value > 0)) {
                        return true;
                    }
                    return false;
                }
                // using the original ID they chose, grab the corresponding item from the DB
                // ----this is where i'm having issues---
            }).then(function (res) {
                console.log("You want " + res.quantity);
                var selection = connection.query("SELECT FROM products WHERE ?", {
                    id: res
                });
                console.log(selection);

                // we are then going to check if the user's desired quantity is less than or equal to quantity of the item in the DB
                
                // if it's good
                //      - update quantity of the item in the DB (something like, item.quantity -= userQuantity)
                //      - calculate total price (totalPrice = userQuantity * item.price)

                // else
                //     - tell user there isn't enough and return them back to square one by calling displayItems()
            })
        })
    });
}