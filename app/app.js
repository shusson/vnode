var express = require('express')
  , cors = require('cors')
  , app = express();

app.use(cors());
app.options('*', cors());

function mockResponse (re,res) {
  var variants = Array(2000).fill({});

  variants = variants.map(function (e, i) {
      return {
          name: 'fred',
          dbSNP: '',
          chromosome: 2,
          start: i,
          end: i,
          reference: 'C',
          alternate: 'G',
          type: 'INDEL',
          variantStats: [
              {
                  maf: 0.5,
                  altAlleleFreq: 0.5,
                  genotypesCount: {
                    '1/1': 0,
                    '0/1': 0,
                    './.':1
                  }
              }
          ],
      }
  })
  var response = {
      success: true,
      variants: variants,
      total: [1]
  }
  var waitTill = new Date(new Date().getTime() + 1000);
  while(waitTill > new Date()){}
  res.json(response);
}

app.get('*', mockResponse);

app.post('*', mockResponse);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
