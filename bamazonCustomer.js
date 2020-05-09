const login = require("./login");
const mysql = require("mysql");
const inquirer = require("inquirer");

//Setting up the connection to mysql.
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: login.password,
    database: "bamazon"
});

connection.connect((err) => {
    if (err) throw err;
    start();
});

function start() {
    inquirer
        .prompt([
            {
                name: "purchase",
                type: "list",
                message: "Would you like to make a purchase? ",
                choices: ["Yes", "No"]
            },
        ])
        .then((answer) => {
            if (answer.purchase === "Yes") {
                purchase();
            } else {
                console.log("Thank you for visiting.  Please come and see our new products soon.");
                connection.end();
            }
        })
}

function purchase() {
    connection.query("SELECT * FROM products",(err, results) => {
        if (err) throw err;

        inquirer
          .prompt([
              {
                name: "choice",
                type: "rawlist",
                choices: function() {
                    let choiceArray = [];
                    for (let i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].product_name);
                    }
                    return choiceArray;
                },
                message: "What item would you like to purchase?"
            },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many units would you like to purchase?"
                }
            ])
            .then((answer) => {
                let chosenProduct;
                for (let i = 0; i < results.length; i++) {
                    if (results[i].product_name === answer.choice) {
                        chosenProduct = results[i];
                    }
                }
                if (chosenProduct.stock_quantity > parseInt(answer.quantity)) {
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: chosenProduct.stock_quantity - answer.quantity
                            },
                            {
                                item_id: chosenProduct.item_id
                            }
                        ],
                    function(error) {
                        if (error) throw err;
                        var checkoutTotal = chosenProduct.price * answer.quantity;
                        console.log("Your order was placed!" + "Your total is: $" + checkoutTotal + ".");
                        start();
                    }
                );
            } else {
                console.log("Unfortunately, we do not have enough in stock to fulfill your order.");
                start();
            }
            });
    });
}
