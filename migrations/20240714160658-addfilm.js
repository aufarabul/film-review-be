"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("films", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nama_film: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      genre_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      sutradara: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      tahun: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      image_film: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      rating: {
        allowNull: true,
        type: Sequelize.DECIMAL(2, 2),
      },
      id_tmdb: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      deletedAt: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("films");
  },
};
