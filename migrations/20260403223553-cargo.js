'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('cargos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      esfera: {
        type: Sequelize.ENUM('Federal', 'Estadual', 'Municipal'),
        allowNull: false
      },
      poder: {
        type: Sequelize.ENUM('Executivo', 'Legislativo'),
        allowNull: false
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

    await queryInterface.bulkInsert('cargos', [
      {
        nome: "Presidente",
        esfera: "Federal",
        poder: "Executivo",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Vice-Presidente",
        esfera: "Federal",
        poder: "Executivo",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Senador",
        esfera: "Federal",
        poder: "Legislativo",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Deputado Federal",
        esfera: "Federal",
        poder: "Legislativo",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Governador",
        esfera: "Estadual",
        poder: "Executivo",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Vice-Governador",
        esfera: "Estadual",
        poder: "Executivo",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Deputado Estadual",
        esfera: "Estadual",
        poder: "Legislativo",
        createdAt: new Date(),
        updatedAt: new Date()   
      },
      {
        nome: "Prefeito",
        esfera: "Municipal",
        poder: "Executivo",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Vice-Prefeito",
        esfera: "Municipal",
        poder: "Executivo",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Vereador",
        esfera: "Municipal",
        poder: "Legislativo",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('cargos');
    }
};