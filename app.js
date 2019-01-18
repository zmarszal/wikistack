const layout = require("./views/layout");
const express = require('express');
const morgan = require('morgan');
const models = require('./models');
const app = express();
const bodyParser = require('body-parser');

// console.log(models.User);
app.use(express.static(__dirname + "/stylesheets"));
app.use(bodyParser.urlencoded({extended: false}));

app.use('/wiki', require('./Routes/wiki'));
app.use('/user', require('./Routes/user'));

const PORT = 3000;

const init = async () => {
  await models.User.sync({ force: true});
  await models.Page.sync( {force: true} );

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
  });
};

init();

app.get('/', (req, res, next) => {
  res.redirect('/wiki');
});
