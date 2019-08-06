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
    query()
});

function query(){
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
    })

}




   
