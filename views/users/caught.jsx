var React = require("react");

class Caught extends React.Component {
  render() {

    console.log("this props poke caught:", this.props.caught);
    let item = this.props.caught;


        let dropList = this.props.caught.map(caught=> {
            return <option value = {caught.id}>{caught.name}</option>
        });

    return (
      <html>
        <head />
        <body>
          <h1>Guess What You Caught?</h1>
            <form action="/pokemon">
                <label>Pokemon caught</label>
                <select name = "pokemon_id">
                    {dropList}
                </select>
                <input type="submit" value="Submit" />
            </form>
        </body>
      </html>
    );
  }
}

module.exports = Caught;