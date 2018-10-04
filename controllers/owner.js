var sha256 = require('js-sha256');

module.exports = (pool) => {
    return {
        hello : "byeeeeee",

        login :(request, response) => {
            response.render('users/login');
        },

        loginPost : (request, response) => {

            console.log( request.body )


            let sqlText = "SELECT * FROM users WHERE name='"+request.body.name.toLowerCase()+"'";

            console.log( sqlText );

            pool.query(sqlText, (error, queryResult) => {

              if (error){

                console.log('error!', error);

                response.status(500).send('Network error!');

              }else{

                console.log("result", queryResult.rows);

                const user = queryResult.rows[0];

                console.log( user );

                var hashedValue = sha256(request.body.password);

                // console.log("db:",user.password);

                // console.log("input: ", hashedValue );

                if (user === undefined) {

                    response.render('users/signup');

                } else if ( user.password === hashedValue ){

                    response.cookie('loggedin', 'true');

                    response.redirect('/users/'+queryResult.rows[0].id+'/catch');

                }else{

                    response.render('users/wrongpw');

                }
              }
            })
        }
    };
};