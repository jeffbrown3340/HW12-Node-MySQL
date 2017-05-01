// dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");

// to store text of my queries

// connection parameters
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "NotSecure3340",
    database: "bamazonDB"
});

//establish DB connection and start the show
connection.connect(function(err) {
    if (err) throw err;
    orderSequence();
});

// show the products then query the user
var orderSequence = function() {
    connection.query("SELECT item_id, product_name, price FROM products",
        function(err, res) {
            for (var i = 0; i < res.length; i++) {
                console.log(
                    "Item ID: " + res[i].item_id +
                    " || Product: " + res[i].product_name +
                    " || Price: " + res[i].price
                );
            }
            // query the user
            placeOrder()
        });
}

// query the user
var placeOrder = function() {
    inquirer.prompt([{
        name: "item",
        type: "input",
        message: "Which item do you want? (enter the Item ID for desired product):"
    }, {
        name: "quantity",
        type: "input",
        message: "How many do you want? (Enter quantity):"
    }]).then(function(answer) {
        // exit on blank selections/double carriage return, just saves hitting Ctrl-C
        if (answer.item === '' || answer.quantity === '') {
            connection.end();
            return;
        }
        // query for the selected item, we're requiring item_id so we are unique
        connection.query("SELECT price, stock_quantity, product_name FROM products WHERE ?", { item_id: answer.item },
            function(err, res) {
                if (err) throw err;
                // in case of no results
                if (res.length === 0) {
                    connection.end();
                    return;
                }
                // expose the data important to the specs
                console.log("===============================================");
                // check answer quanity requested against stock_quantity
                if (res[0].stock_quantity >= answer.quantity) {
                    // calculate the total price
                    var totalCost = answer.quantity * res[0].price;
                    // display a pleasantly silly message, format cost as currency (kind of)
                    console.log("Good thing you ordered now!\nWe only have " +
                        res[0].stock_quantity + " " + res[0].product_name + "s in stock ..." +
                        "\nThey're selling like " + res[0].product_name + "-cakes." +
                        "\n\nThanks for your order! Total cost = " +
                        answer.quantity + " @ $" + res[0].price.toFixed(2) + " == $" + totalCost.toFixed(2));
                    // calculate the new quantity and update to DB
                    var new_qty = res[0].stock_quantity - answer.quantity;
                    connection.query("UPDATE products SET ? WHERE ?", [{ stock_quantity: new_qty }, { item_id: answer.item }],
                        function(err) {
                            if (err) throw err;
                            // expose new quantity for debugging/grading convenience
                            console.log("New quantity in stock=", new_qty);
                        });
                } else {
                    // stock_quantity is less than answer.quantity,
                    // so use the terniary operator to say "out of" if zero, otherwise "we only have n"
                    console.log("Oopsie! Those " + res[0].product_name + "s, we" +
                        (res[0].stock_quantity === 0 ? "'re out-of-" :
                            " only have " + res[0].stock_quantity + " in ") +
                        "stock", ", sorry about that.")
                }
                //that's it, we're done
                connection.end();
                return;
            });
    });
};