const connection = require('../config/connection.js');

const orm = {
    //This will be posting the new user data to the database
    createUser: function(table, vals, cb){
        connection.query('INSERT INTO ?? (email,password) VALUES (?,?)',[table,vals], function(err,result){
            if (err) throw err
            cb(result)
        });
    },
    //This will be used for cross checking with the DB to confirm if the active status is true or false
    eVerVal: function(table, id, cb){
        connection.query('SELECT id, isActive FROM ?? WHERE id = ?', [table,id], function(err,result){
            if (err) throw err
            cb (result)
        })
    },
    //Updates the active status in the DB to true
    eVerUpdate: function(table, id, cb){
        connection.query('UPDATE ?? SET isActive = true WHERE id = ?',[table,id], function(err,result){
            if (err) throw err
            cb (result)
        })
    }
}