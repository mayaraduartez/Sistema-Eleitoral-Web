"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("secao_eleitoral", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      nome: {type: Sequelize.STRING, allowNull: false},
      rua: Sequelize.STRING,
      nro_local: Sequelize.INTEGER,
      bairro: Sequelize.STRING,
      cidade: Sequelize.STRING,
      zonaEleitoral_id: Sequelize.INTEGER,
      // urna_id: Sequelize.INTEGER,
      
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("secao_eleitoral");
  },
};