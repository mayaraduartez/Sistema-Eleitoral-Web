'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('chapas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },

      prefeitoNome: {
        type: Sequelize.STRING,
        allowNull: false
      },

      viceNome: {
        type: Sequelize.STRING,
        allowNull: false
      },

      partido_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Partidos',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },

      numero: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('chapas');
  }
};