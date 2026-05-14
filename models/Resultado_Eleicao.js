const { DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

const ResultadoEleicao = sequelize.define("ResultadoEleicao", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },

  cargo_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  chapa_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  candidato_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  total_votos: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },

  total_validos: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },

  total_brancos: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },

  total_nulos: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  }

}, {
  tableName: "resultado_eleicao",
  timestamps: true,
});

ResultadoEleicao.associate = (models) => {

  ResultadoEleicao.belongsTo(models.Cargo, {
    foreignKey: "cargo_id",
    as: "cargo"
  });

  ResultadoEleicao.belongsTo(models.Chapa, {
    foreignKey: "chapa_id",
    as: "chapa"
  });

  ResultadoEleicao.belongsTo(models.Candidato, {
    foreignKey: "candidato_id",
    as: "candidato"
  });

};

module.exports = ResultadoEleicao;