CREATE DATABASE BamazonDB;

USE BamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL,
  product_name VARCHAR(10) NULL,
  department_name VARCHAR(10) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products VALUES (1, "BOO", "Gadgets", 0.12, 10);
INSERT INTO products VALUES (2, "COO", "Widgits", 3.45, 15);
INSERT INTO products VALUES (3, "DOO", "Fidgits", 6.78, 20);
INSERT INTO products VALUES (4, "FOO", "Gadgets", 9.01, 25);
INSERT INTO products VALUES (5, "GOO", "Widgits", 2.34, 30);
INSERT INTO products VALUES (6, "HOO", "Fidgits", 5.67, 35);
INSERT INTO products VALUES (7, "JOO", "Gadgets", 8.90, 40);
INSERT INTO products VALUES (8, "KOO", "Widgits", 1.23, 45);
INSERT INTO products VALUES (9, "LOO", "Fidgits", 4.56, 50);
INSERT INTO products VALUES (10, "MOO", "Gadgets", 7.89, 55);
INSERT INTO products VALUES (11, "NOO", "Widgits", 9.87, 60);
INSERT INTO products VALUES (12, "POO", "Fidgits", 6.54, 65);

SELECT * FROM products;