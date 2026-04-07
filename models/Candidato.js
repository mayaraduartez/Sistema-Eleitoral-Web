const { DataTypes } = require("sequelize");
const sequelizeconnect = require("../config/connection");

const Candidato = sequelizeconnect.define(
  "Candidato",
  {
    eleitor_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },

    numero: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    partido_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    cargo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true, 
    tableName: "candidato",
  }
);

Candidato.associate = (models) => {
  Candidato.belongsTo(models.Eleitor, {
    foreignKey: "eleitor_id",
  });
};

module.exports = Candidato;