const connection = require('../config/connection.js');

const orm = {
    //This will be posting the new user data to the database
    createUser: function (table, vals, cb) {
        connection.query('INSERT INTO ?? (email,password) VALUES (?,?)', [table, vals], function (err, result) {
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
    eVerUpdate: function (table, id, cb) {
        connection.query('UPDATE ?? SET isActive = true WHERE id = ?', [table, id], function (err, result) {
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

    appendMatch: function (tableInput, id, cb) {
        connection.query('SELECT * FROM ?? where id = ??', [tableInput, id], function (err, result) {
            if (err) {
                throw err;
            }
                console.log(result[0].primary_training_type);
            // connection.query('SELECT * FROM ?? where primary_training_type = 'cb(result[0].primary_training_type)'', [tableInput], function (err, result) {
            //     if (err) {
            //         throw err;
            //     }
            //     cb(result);
            // });


              cb(result);
        });
    }
}


module.exports = orm;
