const { DataTypes } = require("sequelize");
const sequelizeconnect = require("../config/connection");

const SecaoEleitoral = sequelizeconnect.define(
  "SecaoEleitoral",
  {
    nome: { type: DataTypes.STRING },
    rua: { type: DataTypes.STRING },
    nro_local: { type: DataTypes.INTEGER },
    bairro: { type: DataTypes.STRING },
    cidade: { type: DataTypes.STRING },
    zonaEleitoral_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    timestamps: false,
    tableName: "secao_eleitoral",
  },
);

SecaoEleitoral.associate = (models) => {
  SecaoEleitoral.belongsTo(models.ZonaEleitoral, {foreignKey: 'zonaEleitoral_id', as: 'zonaEleitoral'});
};

module.exports = SecaoEleitoral;