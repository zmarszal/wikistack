const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');

db.authenticate().
  then(() => {
  console.log('connected to the database');
});

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  }
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

const slug = (title) => {
  return title.replace(/ /g, '_').replace(/[^\w_]+/g, "");
};

Page.beforeValidate((page) => {
  page.slug = slug(page.title);
});

Page.belongsTo(User, { as: 'author' });


module.exports = { Page, User };
// module.exports = { db };
