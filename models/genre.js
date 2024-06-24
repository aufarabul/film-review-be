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
      // genre.hasMany(models.film, { foreignKey: "film_id" });
      genre.belongsTo(models.film, { foreignKey: "film_id" });
    }
  }
  genre.init(
    {
      nama_genre: DataTypes.STRING,
      film_id: DataTypes.INTEGER,
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
