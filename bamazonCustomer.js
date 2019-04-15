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
        .then(function (answer) {
            if (answer.purchase === "Yes") {
                purchase();
            } else {
                console.log("Come back soon!");
                connection.end();
            }
        })
}

function purchase() {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function (err, res) {
        if (err) throw err;
        var prods = [];
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " | " + res[i].product_name + " | " + "Price: " + res[i].price)
            prods.push([res[i].item_id, res[i].product_name, res[i].stock_quantity,res[i].price]);
        }

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
                    message: "How many would you like to purchase",
                }
            ])
            .then(function (answer) {
                var itemid = answer.id;
                var quantWant = answer.quantity;
                var chosenID;
                console.log(prods);
                console.log(itemid);
                console.log(quantWant);

                for (var i = 0; i < prods.length; i++) {
                    if (prods[i][0] === itemid) {
                        chosenID = prods[i][0];
                        console.log(chosenID);
                        if (quantWant <= prods[i][1]) {
                            console.log("We have enough in stock!");
                            console.log("Your total is " + (quantWant * prods[i][2]) + " .");
                            // purchaseDBUpdate(itemid, quantWant);
                        } else {
                            console.log("Unfortunately, we do not have enough in stock.");
                        }
                    }
                }

                // NOTES_---------------------------------------------------------------------------------
                //         //then run an update query to update that item's inventory in the database.  Subtracting the quantity
                //         //to be purchased from the existing inventory.  IF the quantity requested is greater than the inventory,
                //         //then send an error to the user that we do not have enough in stock.  
                //         //Personal bonus:  Offer to sell the user the number that we have in stock.  If they say yes, then set quantity = inventory 
                //         //and then subtract that value to zero out the inventory and thank the customer for shopping.
                //         //show the customer the total cost of the items and then re-run the prompt
                //         //consider building in logic that if the customer wants to buy anything else that it says "Would you like to buy anything else?" for a custom feel.
                // });

            })
    })
}

function purchaseDBUpdate(id, quant){
    console.log("We made it to db update.");
    // connection.query(
    //     "UPDATE products SET ? WHERE",
    //     [
    //         {
    //             stock_quantity: stock_quantity - quant
    //         },
    //         {
    //             item_id: id
    //         }
    //     ],
    //     function (error) {
    //         if (error) throw err;
    //         start();
    //     }
    // );
}
