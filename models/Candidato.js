const { DataTypes } = require("sequelize");
const sequelizeconnect = require("../config/connection");

const Candidato = sequelizeconnect.define(
  "Candidato",
  {
    eleitorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    numeroCandidato: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    partidoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cargoDisputado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "ativo",
    },
  },
  {
    timestamps: false,
    tableName: "candidatos",
  }
);

module.exports = Candidato;