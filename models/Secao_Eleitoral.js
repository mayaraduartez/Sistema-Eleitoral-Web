const { DataTypes } = require("sequelize");
const sequelizeconnect = require("../config/connection");

const SecaoEleitoral = sequelizeconnect.define(
  "SecaoEleitoral",
  
    {
       id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
      nro_secao: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
   },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rua: {
      type: DataTypes.STRING,
    },
    nro_local: {
      type: DataTypes.INTEGER,
    },
    bairro: {
      type: DataTypes.STRING,
    },
    cidade: {
      type: DataTypes.STRING,
    },
    zonaEleitoral_id: {
     type: DataTypes.INTEGER,
      allowNull: false,
    },
  urna_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "secao_eleitoral",
  },
);

 SecaoEleitoral.associate = (models) => {
  SecaoEleitoral.belongsTo(models.ZonaEleitoral, {foreignKey: 'zonaEleitoral_id', as: 'zonaEleitoral'});
  SecaoEleitoral.belongsTo(models.Urna, {foreignKey: 'urna_id', as: 'urna'});
  SecaoEleitoral.hasMany(models.Eleitor, { foreignKey: 'secao_id' });
};
module.exports = SecaoEleitoral;