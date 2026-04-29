"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("urnas", "numero", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
    await queryInterface.addColumn("urnas", "localizacao", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("urnas", "numero");
    await queryInterface.removeColumn("urnas", "localizacao");
  },
};