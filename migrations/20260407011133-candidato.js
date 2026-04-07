"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("candidato", {
      
      eleitor_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: "eleitores",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },

      numero: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      partido_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      cargo_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "cargos",
          key: "id",
        },
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("candidato");
  },
};