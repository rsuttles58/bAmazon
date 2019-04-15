const login = require("./login");
const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: login.password,
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    prompt();
});

function prompt() {
    inquirer
        .prompt({
            name: "tool",
            type: "list",
            message: "Hello Manager.  Please select a management module.",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "EXIT"]
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.tool === "View Products for Sale") {
                viewProducts();
            } else if (answer.tool === "View Low Inventory") {
                viewLowInventory();
            } else if (answer.tool === "Add to Inventory") {
                addInventory();
            } else if (answer.tool === "Add New Product") {
                newProduct();
            } else {
                connection.end();
            }
        });
}

function viewProducts() {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " | " + res[i].product_name + " | " + "Price: " + res[i].price)
        }
    });
    prompt();
}

function viewLowInventory() {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity < 5", function (err, res) {
        if (err) throw err;
        if (res.length === 0) {
            console.log("-----------------------------------------------------------");
            console.log("Inventory levels are normal for all product lines.");
            console.log("-----------------------------------------------------------");
        } else {
            for (var i = 0; i < res.length; i++) {
                console.log("ID: " + res[i].item_id + " | " + res[i].product_name + " | " + "Price: " + res[i].price)
            }
        }
    });
    prompt();
}

function addInventory() {
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "Enter the ID of the item you would like to increase the inventory of.",
            },
            {
                name: "quantity",
                type: "input",
                message: "How many units would you like to add to current stock?",
            }
        ])
        .then(function (answer) {
            var itemid = answer.id;
            var invIncrease = answer.quantity;

            connection.query(
                "UPDATE products SET stock_quantity = stock_quantity +" + invIncrease + "WHERE item_id =" + itemid,
                function (error) {
                    if (error) throw err;
                    prompt();
                }
            );
            prompt();
        })
}

function newProduct() {

}