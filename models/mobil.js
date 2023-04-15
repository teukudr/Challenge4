'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mobil extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Mobil.init({
    name_mobil: DataTypes.STRING,
    rent_mobil: DataTypes.INTEGER,
    size_mobil: DataTypes.INTEGER,
    photo_mobil: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Mobil',
  });
  return Mobil;
};