const { DataTypes } = require('sequelize');
const sequelizeconnect = require('../config/connection');

const Cargo = sequelizeconnect.define('Cargo', {
  nomecargo: { // ⚠️ deve bater exatamente com o nome da coluna no banco PostgreSQL
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  esfera: {
    type: DataTypes.STRING,
    allowNull: true
  },
  poder: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'cargos', // nome da tabela no banco
  timestamps: true
});

module.exports = Cargo;