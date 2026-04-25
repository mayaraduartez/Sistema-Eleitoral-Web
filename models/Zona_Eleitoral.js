const { DataTypes } = require("sequelize");
const sequelizeconnect = require("../config/connection");

const ZonaEleitoral = sequelizeconnect.define(
  "ZonaEleitoral",
  {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    numero: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "unique_zona_estado",
    },

    estado: {
      type: DataTypes.STRING(2),
      allowNull: false,
      unique: "unique_zona_estado",
    },
  },
  {
    timestamps: true,
    tableName: "zona_eleitoral",
  }
);
ZonaEleitoral.associate = (models) => {
  ZonaEleitoral.hasMany(models.SecaoEleitoral, { foreignKey: 'zonaEleitoral_id' });
};

module.exports = ZonaEleitoral;
