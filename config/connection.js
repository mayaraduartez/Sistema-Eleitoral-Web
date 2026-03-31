const Sequelize = require("sequelize");
const sequelizeconnect = new Sequelize(
    "db_sistemaeleitoral",
    "postgres",
    "adminn",
    {
        host: "localhost",
        port: "5432",
        dialect: "postgres",
    }
);

module.exports = sequelizeconnect;