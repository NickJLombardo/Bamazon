var mysql = require('mysql');
var inquirer = require('inquirer')
var Table = require ("cli-table")
var connection = mysql.createConnection({
    host     : 'localhost',
    port     :  3306,
    user     : 'root',
    password: 'root',
    database : 'bamazon_db'
  });

  connection.connect(function(err){
    if(err) throw err;
    // console.log('connected as id' + connection.threadId + "\n")
    display()
});

function display(){
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        const displayTable = new Table({
            head: ["Item_id", "Product Name", "Department Name", "Price", "Stock Quantity"],
            colWidths: [10,25,25,10,14]
        });
            for(let i =0; i<res.length; i++){
                displayTable.push([res[i].item_id, res[i].product_name,res[i].department_name, res[i].price, res[i].stock_quantity])
            }
        
            console.log(displayTable.toString())
        askQuestion()
    })

}

function askQuestion(){
    inquirer.prompt([
        {
           name: "ID",
           type: "input",
           message: "What is the ID of the titem you would like to purchase? [Quit with Q]",
           filter:Number
         },
         {
           name: "Quantity",
           type: "input",
           message: "How many would you like?",
           filter: Number
         },
    ])
    .then(function(answer){
         const quantity = answer.Quantity;
         const idNumber = answer.ID;
            productCheck(idNumber, quantity)
    })
}

function productCheck(ID, quantity){

 connection.query('SELECT * FROM products WHERE item_id =' + ID, function (err, res){
        if (err) throw err;
        if(quantity <=res[0].stock_quantity){
            console.log("Good News your order is in stock")
            connection.query("UPDATE products SET stock_quantity = stock_quantity - " + quantity + " WHERE item_id = " + ID)

        } else{
            console.log("Sorry we do not have enough of " + res[0].product_name)
        };
        display()
       
  });

}




   
