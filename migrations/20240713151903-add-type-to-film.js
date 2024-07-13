"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "films", // Replace with your actual table name
      "type", // Replace with your desired column name
      {
        type: Sequelize.STRING, // Specify the data type (adjust as needed)
        allowNull: true, // Set whether the column allows null values
      }
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("films", "type");
  },
};
