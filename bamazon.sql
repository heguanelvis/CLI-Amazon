DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products
(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(30) NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  price INT NOT NULL, 
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products
    (item_id, product_name, department_name, price, stock_quantity)
VALUES
    (NULL, 'Microsoft Surface Laptop', 'Electronics', 1200, 10),
    (NULL, 'iPhone X', 'Electronics', 999, 5),
    (NULL, 'Google Pixel 2', 'Electronics', 899, 5),
    (NULL, 'strawberry cupcakes', 'Food', 10, 20 ),
    (NULL, 'fresh bananas', 'Food', 3, 10),
    (NULL, 'Cheetos', 'Food', 2, 10),
    (NULL, 'burger buns', 'Food', 5, 10),
    (NULL, 'red wine', 'Drinks', 49, 5),
    (NULL, 'purse', 'Fashion', 300, 5),
    (NULL, 'XBOX', 'Electronics', 400, 5),
    (NULL, 'face scrub', 'Cosmetics', 15, 5),
    (NULL, 'necklace', 'Fashion', 200, 5),
    (NULL, 'shaving cream', 'Cosmetics', 15, 5)
