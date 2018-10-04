var React = require("react");

class Pokemon extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
            <div>
                <img src={this.props.pokemon.img} />
            </div>
            <div>
            <ul className="pokemon-list">
              <li className="pokemon-attribute">
                id: {this.props.pokemon.id}
              </li>
              <li className="pokemon-attribute">
                name: {this.props.pokemon.name}
              </li>
              <li className="pokemon-attribute">
                height: {this.props.pokemon.height}
              </li>
              <li className="pokemon-attribute">
                weight: {this.props.pokemon.weight}
              </li>

            </ul>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Pokemon;
