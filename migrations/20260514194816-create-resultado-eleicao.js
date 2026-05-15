'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('resultado_eleicao', {

      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      cargo_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'cargos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      chapa_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'chapas',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },

      candidato_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'candidato',
          key: 'eleitor_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },

      total_votos: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      total_validos: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      total_brancos: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      total_nulos: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }

    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('resultado_eleicao');
  }
};