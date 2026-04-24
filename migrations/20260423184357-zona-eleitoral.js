'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("zona_eleitoral", {
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      numero:{
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: "unique_zona_estado",
      },

      estado:{
        type: Sequelize.STRING(2),
        allowNull: false,
        unique: "unique_zona_estado",
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

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("zona_eleitoral");
  }
};
