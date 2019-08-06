var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    port     :  3306,
    user     : 'root',
    password: 'root',
    database : 'bamazon_db'
  });

  connection.connect(function(err){
    if(err) throw err;
    console.log('connected as id' + connection.threadId + "\n")

});

function 









// function createProduct(){
//     console.log("Inserting a new product... \n")
//     const query = connection.query( "INSERT INTO products SET ?",
//      {
//         product_name: "",
//         department_name: "",
//         price: 0,
//         stock_quantity: 0

//      },

//      function(err, res) {
//         if (err) throw err;
//         console.log(res.affectedRows + " product inserted!\n");
//         // Call updateProduct AFTER the INSERT completes
//       }
    
//     );

}


   
