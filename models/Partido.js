const { DataTypes } = require("sequelize");
const sequelizeconnect = require("../config/connection");

const Partido = sequelizeconnect.define(
  "Partido",
  {
    nomePartido: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    sigla: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ideologia: {
      type: DataTypes.STRING,
    },
    numero: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
  },
  {
    freezeTableName: true,
    tableName: "Partidos",
  }
);

module.exports = Partido;
