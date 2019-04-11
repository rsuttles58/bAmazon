const login = require("./login");
const mysql = require("mysql");
const inquirer = require("inquirer");

//Setting up the connection to mysql.
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: login.password,
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    inventoryDisplay();
});


function inventoryDisplay() {
    connection.query("SELECT item_id, product_name, price FROM products", function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " | " + res[i].product_name + " | " + "Price: " + res[i].price)
        }
    })
};

function prompt() {
    inquirer
        .prompt([
            {
                name: "purchase",
                type: "checkbox",
                message: "Would you like to make a purchase? ",
                choices: ["Yes", "No"]
            },
        ])
        .then(function (answer) {
            if (answer === "Yes"){
                purchase();
            } else {
                console.log("Come back soon!");
            }
        })

}

function purchase() {
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "Enter the ID of the item you would like to purchase ",

            },
            {
                name: "quantity",
                type: "input",
                message: "How many would you like to purchase ",

            }
        ])
        .then(function (answer) {
            console.log(answer[0].name);
            console.log(answer[1].message);
            // var query = "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
            // connection.query(query, [answer.start, answer.end], function (err, res) {
            // }
            // );
        });
}

