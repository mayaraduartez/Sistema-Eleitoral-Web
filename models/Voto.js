const { DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const Candidato = require("./Candidato");
const Urna = require("./Urna");

const Voto = sequelize.define("Voto",{
  id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },

  tipo: {
    type: DataTypes.ENUM("valido", "nulo", "branco"),
    allowNull: false,
    defaultValue: "valido",
  },

  urna_id:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  chapa_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },

  candidato_id:{
    type: DataTypes.INTEGER,
    allowNull: true,
  },
},{
  tableName: "votos",
  timestamps: true,
});

Voto.associate = (models) => {

  // Voto pertence a uma urna
  Voto.belongsTo(models.Urna, {
    foreignKey: 'urna_id'
  });

  // Voto pode ser de uma chapa (prefeito/vice)
  Voto.belongsTo(models.Chapa, {
    foreignKey: 'chapa_id',
    as: 'chapa'
  });

  // Voto pode ser de um candidato (vereador)
  Voto.belongsTo(models.Candidato, {
    foreignKey: 'candidato_id',
    as: 'candidato'
  });

};

module.exports = Voto;