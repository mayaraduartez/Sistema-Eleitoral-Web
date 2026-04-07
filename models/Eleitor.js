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
}
  },
  {
    timestamps: false,
    tableName: "eleitores",
  },
);

 Eleitor.associate = (models) => {
    // Use 'models.Candidato' ao invés de 'Candidato' diretamente
    Eleitor.hasOne(models.Candidato, { foreignKey: 'eleitor_id' });
  };
module.exports = Eleitor;