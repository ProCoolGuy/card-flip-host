const app = require('express')();
const resolvePath = require('path').resolve;
const compression = require('compression');
const fs = require('fs');
const routes = require('./routes');
const cors = require('cors');
const bodyparser = require('body-parser');
var cookieParser = require('cookie-parser');
const { initDatabase, initTable} = require('./utils/database');

app.use(cors());
app.use(compression());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cookieParser());

initDatabase();
initTable();

app.use('/history', routes);
app.use(require('express').static(resolvePath(__dirname, './build')));
app.get('*', (req, res) => {
  const contents = fs.readFileSync(
    resolvePath(__dirname, './build/index.html'),
    'utf8'
  );
  res.send(contents);
});

app.listen(process.env.APP_PORT || 5000, () => {
  console.log(`Server running at 5000`);
});
