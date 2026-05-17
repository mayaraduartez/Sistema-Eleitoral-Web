const { DataTypes } = require('sequelize');
const sequelizeconnect = require('../config/connection');

const Chapa = sequelizeconnect.define('Chapa', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },

  prefeitoNome: {
    type: DataTypes.STRING,
    allowNull: false
  },

  viceNome: {
    type: DataTypes.STRING,
    allowNull: false
  },

  partido_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  numero: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false
  },
}, {
  tableName: 'chapas',
  timestamps: true
});

Chapa.associate = (models) => {

  // uma chapa pertence a um partido
  Chapa.belongsTo(models.Partido, {
    foreignKey: 'partido_id',
    as: 'partido'
  });

  // uma chapa tem muitos votos
  Chapa.hasMany(models.Voto, {
    foreignKey: 'chapa_id',
    as: 'votos'
  });

};

module.exports = Chapa;