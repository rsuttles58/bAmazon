# bAmazon

bAmazon is a text-based command line storefront application with both a customer interface as well as a managerial application to support business administration.  The application allows the users to view available products along with their current prices and to make a purchase if they so choose.  The managerial application allows a manager to view inventory, view low inventory items, add inventory to the database when a new shipment arrives, and to the inventory as new product lines are developed.  


## Installation

Use the package manager [NPM](https://www.npmjs.com/) to install mySQL and inquirer.

```bash
npm install mysql
npm install inquirer
```

## How to run the program

To run the customer application type:

```bash
node bamazonCustomer.js
```

To run the manager application type:

```bash
node bamazonmanager.js
```

## Project Technical Specs-
This application utilizes node.js to run the command-line application.  The applications themselves use javascript, inquirer to guide the user experience, and is supported on the backend by a mysql database that stores the store product lines and available inventory.  
