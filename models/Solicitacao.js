const { DataTypes } = require("sequelize");
const sequelizeconnect = require("../config/connection");

const Solicitacao = sequelizeconnect.define(
  "Solicitacao",
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true, // Validação extra para garantir e-mail válido
      },
    },
    mensagem: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pendente", "concluido"),
      allowNull: false,
      defaultValue: "pendente",
    },
  },
  {
    // Adiciona createdAt e updatedAt automaticamente
    timestamps: true,
    tableName: "solicitacoes",
    underscored: false,
  }
);

module.exports = Solicitacao;