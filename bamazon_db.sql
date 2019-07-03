DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
	id INTEGER(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL,
    
    PRIMARY KEY (id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('Gucci Umbrella', 'Fashion', 14.99, 10);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('Louis Vitton Crocs', 'Fashion', 29.99, 15);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('Jeter Baseball Card', 'Memoribilia', 24.99, 5);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('FIFA 25', 'Video Games', 59.99, 30);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('Zune Music Player', 'Electronics', 0.99, 100);

SELECT * FROM products;