let mySql = require("./mysql.js")();
module.exports = class sql {
    
    constructor() {

    }
    
    Login(usn, psw, callback) {
        
        mySql.query('SELECT * FROM Users where username=? and psw=?', [usn, psw], function(err, rows) {
            if (err) throw err;
        	callback(rows);
        });
       
    }
    Fetch_All_Products(callback){
        mySql.query('Select pd.url,pd.prod_id,pd.price,pd.qty,pd.name"pdname",b.name"bname",c.name"cname",pd.About from Product_Details pd,Category c,Brands b where pd.cat_id=c.Cat_id and pd.Brand_id=b.Brand_id', function(err, rows) {
            if (err) throw err;
            callback(rows);
        });
        
    }
    Fetch_One_Products(prod_id,callback){
        mySql.query('Select pd.url,pd.prod_id,pd.name"pdname",pd.price,b.name"bname",c.name"cname",pd.About,pd.qty from Product_Details pd,Category c,Brands b where pd.cat_id=c.Cat_id and pd.Brand_id=b.Brand_id and pd.prod_id='+prod_id, function(err, rows) {
            if (err) throw err;
            callback(rows);
        });
        
    }
    
}