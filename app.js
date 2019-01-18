const layout = require("./views/layout");
const express = require('express');
const morgan = require('morgan');
const { db } = require('./models');
const app = express();

console.log(db.User);

db.authenticate().
then(() => {
  console.log('connected to the database');
});

app.get('/', (req, res, next) => {
  res.send(layout(''));
});


const PORT = 3000;

const init = async () => {
  await db.sync();

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
  });
};

init();








