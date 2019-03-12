const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3');
const crypto = require('crypto');

let db = new sqlite3.Database('db.sqlite');

let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(3000, "0.0.0.0", function() {
  console.log("Running");
});

app.get('/api/match', function(req, res) {
  db.all("SELECT id, image FROM cat ORDER BY RANDOM() LIMIT 2", (err, rows) => {
    if (err) {
      res.status(500);
      res.json({
        error : "Cannot get cats : " + err
      });
      return;
    }

    let results = [];
    for (let row of rows) {
      results.push({
        id : row.id,
        image : row.image
      });
    }

    res.json(results);
  });
});

app.post('/api/match', function(req, res) {
  db.run("INSERT INTO match (winner, looser) VALUES (?, ?)", [req.body.winner, req.body.looser], (err) => {
    if (err) {
      res.status(500);
      res.json({
        error : "Can not register match : " + err
      });
      return;
    }

    res.json({});
  });
});

app.get('/api/results', function(req, res) {
  db.all(`
    SELECT
      id,
      image,
      (SELECT COUNT(id) FROM match WHERE winner = cat.id) as count_winner,
      (SELECT COUNT(id) FROM match WHERE looser = cat.id) as count_looser
    FROM cat
    ORDER BY count_winner - count_looser DESC
    `, (err, rows) => {
    if (err) {
      res.status(500);
      res.json({
        error : "Cannot get results : " + err
      });
      return;
    }

    let results = [];
    for (let row of rows) {
      results.push({
        id : row.id,
        image : row.image,
        count_winner : row.count_winner,
        count_looser : row.count_looser
      });
    }

    res.json(results);
  });
});

