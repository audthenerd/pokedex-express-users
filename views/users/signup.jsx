var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
            <h1>We couldn't find your account!</h1>
            <p> Please fill in your details below to create one!</p>
              <form method="POST" action="/users/catch">
                <div>
                  Username:<input name="name" type="text" />
                </div>
                <div>
                  Password:<input name="password" type="char(64)" />
                </div>
                <input type="submit" value="Submit" />
              </form>
        </body>
      </html>
    );
  }
}

module.exports = New;
