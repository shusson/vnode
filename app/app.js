var express = require('express')
  , cors = require('cors')
  , app = express();


let mysql = require('mysql')
let connection = mysql.createConnection({
    host     : 'sql',
    user     : 'root',
    password : 'a',
    database : 'v'
});

connection.connect();


app.use(cors());
app.options('*', cors());

function mockResponse (re,res) {
  let c = re.query.chromosome;
  let start = re.query.positionStart;
  let end = re.query.positionEnd;
  let lim = re.query.limit;
  let skip = re.query.skip ? re.query.skip : 0;
  let count = "SELECT COUNT(*) AS size FROM vs where chromosome='" + c + "' and start<=" + end + " and start>=" + start;
  connection.query(count, function (err, count, _) {
    if (err) throw err
    let total = count.length > 0 ? count[0].size : 0;
    if (total > 0) {
      let query = "SELECT * FROM vs where chromosome='" + c + "' and start<=" + end + " and start>=" + start + " LIMIT " + skip + "," + lim;
      connection.query(query, function (err, rows, _) {
        if (err) throw err
        let response = {
            success: true,
            variants: rows,
            total: [total]
        }
        res.json(response);
      });
    }
  });
}

app.get('*', mockResponse);

app.post('*', mockResponse);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
