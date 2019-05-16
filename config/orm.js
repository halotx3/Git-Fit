const connection = require('../config/connection.js');

const orm = {
    //This will be posting the new user data to the database
    createUser: function(table, vals, cb){
        connection.query('INSERT INTO ?? (email,password) VALUES (?)',[table,vals], function(err,result){
            if (err) throw err
            cb(result)
        });
    },
    //This will be used for cross checking with the DB to confirm if the active status is true or false
    eVerVal: function (table, id, cb) {
        connection.query('SELECT * FROM ?? WHERE id = ?', [table, id], function (err, result) {
            if (err) throw err
            cb(result)
        })
    },
    //Updates the active status in the DB to true
    eVerUpdate: function(table, id, cb){
        connection.query('UPDATE ?? SET active = 1 WHERE id = ?;',[table,id], function(err,result){
            if (err) throw err
            cb(result)
        })
    },
    // SLC for query matching
    match: function (tableInput, cb) {
        connection.query('SELECT * FROM ?? limit 3', tableInput, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    findzip: function (tableInput, id, cb) {
        connection.query('SELECT * FROM ?? where id = ?', [tableInput, id], function (err, result) {
            if (err) {
                throw err;
            }
              cb(result);
        });
    },


    zipmatch: function (tableInput, id, origin, cb) {
        connection.query('SELECT * FROM ?? where home_zip = ? and id <> ?', [tableInput, id, origin], function (err, result) {
            if (err) {
                throw err;
            }

              cb(result);
        });
    },
    showOnlineUsers: function(table, JoinTable, vals){
      connection.query('SELECT usercreds.email, profile.first_name, usercreds.logged FROM ?? LEFT JOIN ?? on profile.cred_id = usercreds.id WHERE usercreds.logged = ?', [table, JoinTable, vals], function (err, result) {
        if (err){
          throw err;
        }
          console.log(result);
      });
    },
}

module.exports = orm;
