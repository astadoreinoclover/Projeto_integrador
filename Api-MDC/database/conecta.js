import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  'projeto', 'root', '24122001', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
});