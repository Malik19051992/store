

var sqlcon = require('mssql');
function GetSQLData(queryCallback){
    //SQL Configuration
    var config = {
        user:'###'            //SQL User Id. Please provide a valid user
        ,password:'######'    //SQL Password. Please provide a valid password
        ,server:'localhost\\SQL2K14'
        ,database: 'master'        //You can use any database here
    }
    var connection = new sqlcon.Connection(config,function(err){
        if (err) console.log(err);

        var dbQuery = new sqlcon.Request(connection);
        dbQuery.query("WAITFOR DELAY '00:00:05';SELECT * FROM INFORMATION_SCHEMA.TABLES",function(err,resultset){
            if (err) console.log(err);
            queryCallback(resultset);
        })
    });
}
function callback (resultset){
    console.dir('Results returned and printed from the call back function');
    console.dir(resultset);

    //Exit the application
    console.dir('Exiting the Application');
    process.exit(0);
}
//Calling the function
console.dir('Calling GetSQLData');
GetSQLData(callback);
/*
 Once we call this function even there's a delay to return the results
 you will see the next line printing 'Waiting for callback function to get invoked...'
 */
console.dir('Waiting for callback function to get invoked...');