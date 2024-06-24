"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class film extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      film.hasMany(models.ulasan, { foreignKey: "film_id" });
      film.hasMany(models.genre, { foreignKey: "film_id" });
    }
  }
  film.init(
    {
      nama_film: DataTypes.STRING,
      genre_id: DataTypes.INTEGER,
      sutradara: DataTypes.STRING,
      tahun: DataTypes.INTEGER,
      description: DataTypes.STRING,
      image_film: DataTypes.TEXT,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "film",
      paranoid: true,
    }
  );
  return film;
};
