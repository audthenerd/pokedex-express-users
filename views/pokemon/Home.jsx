var React = require("react");
var DefaultLayout = require('../layout/default');

class Home extends React.Component {
  render() {
    console.log(this);
    return (
    <DefaultLayout title="Welcome to Pokedex">
      <html>
        <head />
        <body>
          <h1>Welcome to Pokedex</h1>
          <div className="intro">Gotta Catch 'Em All!</div>
          <div className="links"><a href="/users/login" class="myButton">Login</a>&nbsp; &nbsp;
          <a href="/users/new" class="myButton">Register</a></div>
          <ul className="list">
            {this.props.pokemon.map(pokemon => (
              <li key={pokemon.id}><img src={pokemon.img} /><br />
                {pokemon.name}
              </li>
            ))}
          </ul>
        </body>
      </html>
    </DefaultLayout>
    );
  }
}

module.exports = Home;
