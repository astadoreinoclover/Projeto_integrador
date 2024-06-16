import { DataTypes } from 'sequelize';
import { sequelize } from '../database/conecta.js';

export const Item = sequelize.define('iten', {
  id : {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  titulo: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  genero: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  volume: {
    type: DataTypes.INTEGER(3),
    allowNull: false
  },
  sinopse: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  foto: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
  autor: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  editora: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  categoria: {
    type: DataTypes.STRING(20),
    allowNull: false
  }
});