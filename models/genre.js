"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class genre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      genre.hasMany(models.film, { foreignKey: "genre_id" });
      genre.belongsTo(models.film, { foreignKey: "id" });
    }
  }
  genre.init(
    {
      nama_genre: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "genre",
      paranoid: true,
    }
  );
  return genre;
};
