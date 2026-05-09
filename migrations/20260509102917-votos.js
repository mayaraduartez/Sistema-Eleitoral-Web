"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("votos", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      tipo: {
        type: Sequelize.ENUM("valido", "nulo", "branco"),
        allowNull: false,
        defaultValue: "valido",
      },

      urna_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "urnas",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },

      candidato_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "candidato",
          key: "eleitor_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("votos");
  },
};