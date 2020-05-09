DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
item_id INT AUTO_INCREMENT NOT NULL,
product_name VARCHAR(100) NULL,
department_name VARCHAR(100) NULL,
price DECIMAL(8,2) NULL,
stock_quantity INT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Settlers of Catan", "Games", 40, 100), 
("Ticket To Ride", "Games", 35, 75), 
("Gloomhaven", "Games", 115, 35), 
("Keyforge", "Games", 10, 50), 
("Crokinole", "Games", 150, 10), 
("Bicycle", "Outdoors", 65, 35), 
("Skateboard", "Outdoors", 15, 20), 
("Roller Blades", "Outdoors", 40, 100), 
("Helmet", "Outdoors", 20, 120), 
("Hammer", "Hardware",6, 100), 
("Nails", "Hardware", 5, 100), 
("Screwdriver", "Hardware", 5, 110),
("Shovel", "Hardware", 14, 20),
("Wheelbarrow", "Hardware", 60,10);



