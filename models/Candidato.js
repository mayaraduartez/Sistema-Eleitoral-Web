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
     status: {
      type: DataTypes.ENUM('ativo', 'inativo'),
      allowNull: false,
      defaultValue: 'ativo'
    },
  },
  {
    timestamps: true, 
    tableName: "candidato",
  }
);

Candidato.associate = (models) => {
  Candidato.belongsTo(models.Eleitor, { foreignKey: 'eleitor_id', as: 'eleitor' });
  Candidato.belongsTo(models.Partido, { foreignKey: 'partido_id', as: 'partido' });
  Candidato.belongsTo(models.Cargo, { foreignKey: 'cargo_id', as: 'cargo' });
};

module.exports = Candidato;