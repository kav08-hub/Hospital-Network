const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.get('/data', (req, res) => {
  let data = fs.readFileSync('data.json');
  res.send(data);
});

app.post('/data', (req, res) => {
  fs.writeFileSync('data.json', JSON.stringify(req.body));
  res.send("Saved");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});