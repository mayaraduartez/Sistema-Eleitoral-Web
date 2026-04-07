const { DataTypes } = require('sequelize');
const sequelizeconnect = require('../config/connection');

const Cargo = sequelizeconnect.define('Cargo', {
  nome: {
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
  tableName: 'cargos',
  timestamps: true
});

Cargo.associate = (models) => {
  // Cargo tem muitos Candidatos
  Cargo.hasMany(models.Candidato, { foreignKey: 'cargo_id' });
};
module.exports = Cargo;