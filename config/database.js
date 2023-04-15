const { Sequelize } = require("sequelize");
const { db } = require("../app/app.js");
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(db.database, db.user, db.password, {
  host: db.host,
  dialect: db.dialect,
});

module.exports = {sequelize,db};
