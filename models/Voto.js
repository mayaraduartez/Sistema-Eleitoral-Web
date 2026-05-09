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

  candidato_id:{
    type: DataTypes.INTEGER,
    allowNull: true,
  },
},{
  tableName: "votos",
  timestamps: true,
});

Voto.associate = (models) => {

  Voto.belongsTo(models.Candidato, {
    foreignKey: "candidato_id",
    targetKey: "eleitor_id",
    as: "candidato",
  });

  Voto.belongsTo(models.Urna, {
    foreignKey: "urna_id",
    as: "urna",
  });

};


module.exports = Voto;