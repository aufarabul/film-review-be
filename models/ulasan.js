"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ulasan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ulasan.init(
    {
      nama_user: DataTypes.STRING,
      film_id: DataTypes.INTEGER,
      comment: DataTypes.STRING,
      rating: DataTypes.INTEGER,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "ulasan",
      paranoid: true,
    }
  );
  return ulasan;
};
