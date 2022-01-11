// const fs = require('fs');
const { Buffer } = require('buffer');


const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  // route: home page
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Section 01</title><body>Welcome to my Website!<p>Please enter your information below:</p></body></head>');
    res.write('<body>');
    res.write('<form action="/create-user" method="POST">');
    res.write('<div>Name: <input type ="text" name="username"></div>');
    res.write('<div>Favorite Color: <input type ="text" name="color"></div>');
    res.write('<div>Age: <input type ="text" name="age"></div>');
    res.write('<button type="submit">Submit</button>');
    res.write('</form>');
    res.write('</body>');
    res.write('</html>');
    return res.end();
  }

  // route: get users
  if(url === '/users' ) {
    res.write('<html>');
    res.write('<head><title>Section 01</title></head>');
    res.write('<body><ul><li>Darcee</li><li>Stephen</li></ul></body>');
    res.write('</html>');
    return res.end();
  }

  // route: create user
  if(url === '/create-user' && method === 'POST') {
    const body = [];

    // when data is received, push data on to body
    req.on('data', (chunk) => {
      body.push(chunk);
    });

    // when there is no more data, parse the body
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const username = parsedBody.split('&')[0].split('=')[1];
      const color = parsedBody.split('&')[1].split('=')[1];
      const age = parsedBody.split('&')[2].split('=')[1];
      console.log(username, color, age);
    });

    // create and return response
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }
};

exports.handler = requestHandler;
