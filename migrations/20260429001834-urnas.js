"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("urnas", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      situacao: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("urnas");
  },
};