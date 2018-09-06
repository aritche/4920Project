'use strict';

const express = require('express');

const app = express();
var path = require('path');

app.use(express.static('build'));

console.log(path.resolve(__dirname, 'build', 'index.html'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

if (module === require.main) {
  // [START server]
  // Start the server
  const server = app.listen(process.env.PORT || 8080, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
  // [END server]
}

module.exports = app;
