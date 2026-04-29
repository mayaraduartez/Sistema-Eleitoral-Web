const { DataTypes } = require("sequelize");
const sequelizeconnect = require("../config/connection");

const Urna = sequelizeconnect.define(
  "Urna",
  {
    numero: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    localizacao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    situacao: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
    tableName: "urnas",
  }
);

Urna.associate = (models) => {
  Urna.hasOne(models.SecaoEleitoral, {
    foreignKey: "urna_id",
    as: "secao",
  });
};


module.exports = Urna;