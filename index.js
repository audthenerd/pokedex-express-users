/**
 * To-do for homework on 28 Jun 2018
 * =================================
 * 1. Create the relevant tables.sql file
 * 2. New routes for user-creation
 * 3. Change the pokemon form to add an input for user id such that the pokemon belongs to the user with that id
 * 4. (FURTHER) Add a drop-down menu of all users on the pokemon form
 * 5. (FURTHER) Add a types table and a pokemon-types table in your database, and create a seed.sql file inserting relevant data for these 2 tables. Note that a pokemon can have many types, and a type can have many pokemons.
 */

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// Initialise postgres client
const config = {
  user: 'audreykow',
  host: '127.0.0.1',
  database: 'pokemon_db',
  port: 5432,
};

if (config.user === 'ck') {
	throw new Error("====== UPDATE YOUR DATABASE CONFIGURATION =======");
};

const pool = new pg.Pool(config);

pool.on('error', function (err) {
  console.log('Idle client error', err.message, err.stack);
});

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));



// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

var sha256 = require('js-sha256');

/**
 * ===================================
 * Route Handler Functions
 * ===================================
 */

 const getRoot = (request, response) => {
  // query database for all pokemon

  // respond with HTML page displaying all pokemon
  //
  const queryString = 'SELECT * from pokemon;';
  pool.query(queryString, (err, result) => {
    if (err) {
      console.error('Query error:', err.stack);
    } else {
      // console.log('Query result:', result);

      // redirect to home page
      response.render( 'pokemon/home', {pokemon: result.rows} );
    }
  });
}

const getNew = (request, response) => {
  response.render('pokemon/new');
}

const getPokemon = (request, response) => {
  let id = request.params['id'];
  const queryString = 'SELECT * FROM pokemon WHERE id = ' + id + ';';
  pool.query(queryString, (err, result) => {
    if (err) {
      console.error('Query error:', err.stack);
    } else {
      console.log('Query result:', result);

      // redirect to home page
      response.render( 'pokemon/pokemon', {pokemon: result.rows[0]} );
    }
  });
}

const postPokemon = (request, response) => {
  let params = request.body;

  const queryString = 'INSERT INTO pokemon(name, img, height, weight) VALUES($1, $2, $3, $4);';
  const values = [params.name, params.img, params.height, params.weight];

  pool.query(queryString, values, (err, result) => {
    if (err) {
      console.log('query error:', err.stack);
    } else {
      console.log('query result:', result);

      // redirect to home page
      response.redirect('/');
    }
  });
};

const editPokemonForm = (request, response) => {
  let id = request.params['id'];
  const queryString = 'SELECT * FROM pokemon WHERE id = ' + id + ';';
  pool.query(queryString, (err, result) => {
    if (err) {
      console.error('Query error:', err.stack);
    } else {
      console.log('Query result:', result);

      // redirect to home page
      response.render( 'pokemon/edit', {pokemon: result.rows[0]} );
    }
  });
}

const updatePokemon = (request, response) => {
  let id = request.params['id'];
  let pokemon = request.body;
  const queryString = 'UPDATE "pokemon" SET "num"=($1), "name"=($2), "img"=($3), "height"=($4), "weight"=($5) WHERE "id"=($6)';
  const values = [pokemon.num, pokemon.name, pokemon.img, pokemon.height, pokemon.weight, id];
  console.log(queryString);
  pool.query(queryString, values, (err, result) => {
    if (err) {
      console.error('Query error:', err.stack);
    } else {
      console.log('Query result:', result);

      // redirect to home page
      response.redirect('/');
    }
  });
}

const deletePokemonForm = (request, response) => {
  response.send("COMPLETE ME");
}

const deletePokemon = (request, response) => {
  response.send("COMPLETE ME");
}
/**
 * ===================================
 * User
 * ===================================
 */


const userNew = (request, response) => {
  response.render('users/new');
}


const userCreate = (request, response) => {

  const queryString = 'INSERT INTO users (name, password) VALUES ($1, $2)';

  var hashedValue = sha256(request.body.password.toLowerCase());

  const values = [request.body.name.toLowerCase(), hashedValue];

  console.log(queryString);

  pool.query(queryString, values, (err, result) => {

    if (err) {

      console.error('Query error:', err.stack);
      response.send('dang it.');
    } else {

      console.log('Query result:', result);
      response.render('users/catch', result);
      // redirect to home page

    }
  });
  // response.redirect('/');

};


const userCatch = (request, response) => {

    // const queryString = 'SELECT users.id, pokemon.id FROM users_pokemon';

    response.render('users/catch', {id: request.params.id});
};


const pokeCaught = (request, response) => {

    console.log(request.body);

    const queryString = 'INSERT INTO users_pokemon (user_id, pokemon_id) VALUES ($1, $2)';

        let values = [request.body.user_id, request.body.pokemon_id];

        pool.query(queryString, values, (err, result) => {

                if (err) {

                  console.error('Query error:', err.stack);
                  response.send('dang it.');

                } else {
                  console.log('Query result:', result);
                  response.redirect('/users/'+request.body.user_id+'/caught');
                };
     });

};



const pokeName = (request, response) => {


    const queryString = `SELECT pokemon.name, pokemon.id FROM pokemon INNER JOIN users_pokemon ON (users_pokemon.pokemon_id = pokemon.id) WHERE users_pokemon.user_id = ${request.params.id}`;

        pool.query(queryString, (err, result) => {

                if (err) {

                  console.error('Query error:', err.stack);
                  response.send('dang it.');

                } else {
                  console.log('Query result:', result.rows);

                  response.render('users/caught', {caught: (result.rows)});
                };

        });
};


const pokeShow = (request, response) => {

    console.log("show poke", request.query);

    response.redirect('/pokemon/'+ request.query.pokemon_id);
};

/**
 * ===================================
 * COOKIE COUNT
 * ===================================
 */

const cookieCount = (request, response) => {

    console.log("current visits: ", request.cookies['visits']);

    var visits;

    if( request.cookies['visits'] === undefined ){

        visits = 1;

    }else{
        visits = parseInt( request.cookies['visits'] ) + 1;
    }

    // set cookie
    response.cookie('visits', visits);

    console.log('works!: '+visits);
};




/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/', getRoot);
app.get('/', cookieCount);
app.get('/pokemon/:id/edit', editPokemonForm);
app.get('/pokemon/new', getNew);
app.get('/pokemon/:id', getPokemon);
app.get('/pokemon/:id/delete', deletePokemonForm);

app.post('/pokemon', postPokemon);

app.put('/pokemon/:id', updatePokemon);

app.delete('/pokemon/:id', deletePokemon);

// TODO: New routes for creating users

app.get('/users/new', userNew);
app.post('/users/catch', userCreate);
app.get('/users/:id/catch', userCatch);
app.post('/users/inter', pokeCaught);
app.get('/users/:id/caught', pokeName);
app.get('/pokemon', pokeShow);

var thing = require('./routes');
thing( app, pool );




/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3001, () => console.log('~~~ Ahoy we go from the port of 3001!!!'));



// Handles CTRL-C shutdown
function shutDown() {
  console.log('Recalling all ships to harbour...');
  server.close(() => {
    console.log('... all ships returned...');
    pool.end(() => {
      console.log('... all loot turned in!');
      process.exit(0);
    });
  });
};

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);


