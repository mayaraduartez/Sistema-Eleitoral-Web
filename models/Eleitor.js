const { DataTypes } = require("sequelize");
const sequelizeconnect = require("../config/connection");

const Eleitor = sequelizeconnect.define(
  "Eleitor",
  {
    nome: {
      type: DataTypes.STRING,
    },
    sobrenome: {
      type: DataTypes.STRING,
    },
    foto: {
      type: DataTypes.STRING,
    },
    cpf: {
      type: DataTypes.STRING,
      unique: true,
    },
    data_nascimento: {
      type: DataTypes.DATEONLY,
    },
    titulo: {
      type: DataTypes.STRING,
    },
    rua: {
      type: DataTypes.STRING,
    },
    bairro: {
      type: DataTypes.STRING,
    },
    cidade: {
      type: DataTypes.STRING,
    },
    nro_endereco: {
      type: DataTypes.STRING,
    },
    UF: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'ativo'
    },
    
    secao_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    timestamps: false,
    tableName: "eleitores",
  },
);

Eleitor.associate = (models) => {
  Eleitor.hasOne(models.Candidato, { foreignKey: 'eleitor_id' });
  Eleitor.belongsTo(models.SecaoEleitoral, { foreignKey: 'secao_id', as: 'secao' });
};

module.exports = Eleitor;