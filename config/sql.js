let mySql = require("./mysql.js")();
module.exports = class sql {
    constructor() {}
    Login(usn, psw, callback) {
        mySql.query('SELECT * FROM Users where username=? and psw=?', [usn, psw], function(err, rows) {
            if (err) throw err;
            callback(rows);
        });
    }
    SignUp(usn, psw, callback) {
        mySql.query('insert into Users(FName,LName,UserName,psw,Email_id,Mob_no,Address) values("Test","lst",?,?,"sms@gmail.com","9731733623","Vat Mang")', [usn, psw], function(err, rows) {
            if (err) throw err;
            callback(rows);
        });
    }
    Fetch_All_Products(callback) {
            mySql.query('Select pd.url,pd.prod_id,pd.price,pd.qty,pd.name"pdname",b.name"bname",c.name"cname",pd.About from Product_Details pd,Category c,Brands b where pd.cat_id=c.Cat_id and pd.Brand_id=b.Brand_id', function(err, rows) {
                if (err) throw err;
                callback(rows);
            });
        }
        // Add_Address_Book(Address){
        //     mySql.query('insert into Guest_Address_book(FName,LName,Email_id,Mob_no,Address) values(?,?,?,?,?)', [Address.FName,Address.LName,Address.Email,Address.Mob,Address.Address]);
        // }
    Add_Guest_Order(cart, Address) {
        //console.log('inserted::',cart);
        for (var key in cart) {
            //console.log('inserted::',key,cart[key].qty);
            //mySql.query('insert into Guest_Delivery_book(prod_id,Qty,Address,Status) values(?,?,?,"Order Placed")', [cart[key].id,cart[key].qty,Address]);
            mySql.query('update Product_Details set Qty=Qty-? where prod_id=?', [cart[key].qty, cart[key].id]);
        }
    }
}
