const functions = require('firebase-functions');
const axios = require('axios');

exports.getProfile = functions.https.onRequest((req, res) => {
  // Set CORS headers
  // e.g. allow GETs from any specified origin with the Content-Type header
  // and cache preflight response for 3600s
  let allowedOrigins = [
    'http://localhost:8080',
  ];
  let origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Access-Control-Max-Age', '3600');
  // Send response to OPTIONS requests and terminate the function execution
  if (req.method === 'OPTIONS') {
    res.status(204).send('');
  } else if (req.method === 'GET') {
    axios.get('https://peaceful-springs-7920.herokuapp.com/profile/')
    .then(response => {
      console.log('Get Profile Success', response);
      send(res, 200, response);
    }).catch(error => {
      console.log('Get Profile Error', error);
      send(res, 500, error);
    });
  } else {
    console.log('get err', e);
    send(res, 500, {
      error: `Only Accepting GET requests to this API.`,
    });
  }
});

exports.helloWorld = functions.https.onRequest((req, res) => {
  // Set CORS headers
  // e.g. allow GETs from any specified origin with the Content-Type header
  // and cache preflight response for 3600s
  let allowedOrigins = [
    'http://localhost:8080',
  ];
  let origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Access-Control-Max-Age', '3600');
  // Send response to OPTIONS requests and terminate the function execution
  if (req.method === 'OPTIONS') {
    res.status(204).send('');
  } else if (req.method === 'GET') {
    send(res, 200, {
      message: 'Success',
      description: 'GET is working!',
    });
  } else {
    console.log('get err', e);
    send(res, 500, {
      error: `The server received an unexpected error. Please try again and contact the site admin if the error persists.`,
    });
  }
});

function send(res, code, body) {
  res.send({
    statusCode: code,
    // headers: {'Access-Control-Allow-Origin': '*'},
    body: JSON.stringify(body)
  });
}
