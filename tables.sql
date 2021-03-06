CREATE TABLE IF NOT EXISTS pokemon (
	id SERIAL PRIMARY KEY,
	name TEXT,
	img TEXT,
	weight TEXT,
	height TEXT
);


CREATE TABLE IF NOT EXISTS users (
	id SERIAL PRIMARY KEY,
	name TEXT,
	password CHAR(64)
);


CREATE TABLE IF NOT EXISTS users_pokemon (
	id SERIAL PRIMARY KEY,
	user_id INTEGER,
	pokemon_id INTEGER
);