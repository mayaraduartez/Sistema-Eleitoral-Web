const { DataTypes } = require('sequelize');
const sequelizeconnect = require('../config/connection');

const Cargo = sequelizeconnect.define(
  "Cargo",
  {
    nome:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    esfera:{
      type: DataTypes.ENUM('Federal', 'Estadual', 'Municipal'),
      allowNull: false
    },
    poder: {
      type: DataTypes.ENUM('Executivo', 'Legislativo'),
      allowNull: false
    }
  },
  {
    timestamps: true,
    tableName: 'cargos'
  }
);

module.exports = Cargo;

