const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('./dist/circle-of-fifths'));

app.get('/*', function(req, res) {
  res.sendFile(path.join('./dist/circle-of-fifths/index.html'));
});

app.listen(process.env.PORT || 3000);