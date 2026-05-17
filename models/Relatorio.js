const { DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

const Relatorio = sequelize.define("Relatorio", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  conteudo: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
}, {
  tableName: "relatorios",
  timestamps: true,
});

module.exports = Relatorio;
