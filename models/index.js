const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {logging: false});

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    isUrl: true
  },
  content: {
    type: Sequelize.TEXT, 
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
    defaultValue: 'closed'
  }
  // author: {
  //   type: Sequelize.STRING,
  //   defaultValue: User.name
  // }
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false, 
    isEmail: true,
  }
});

module.exports = {
  db, Page, User
}

