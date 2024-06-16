import { DataTypes, INTEGER } from 'sequelize';
import { sequelize } from '../database/conecta.js';
import { User } from './User.js';
import { Item } from './Item.js';

export const Colecao = sequelize.define('colecoe', {
  id : {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  valor : {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  timestamps: false
});

Colecao.belongsTo(User, {
    foreignKey: {
        name: "user_id",
        allowNull: false
    }
})

User.hasMany(Colecao, {
    foreignKey: "user_id"
})

Colecao.belongsTo(Item, {
    foreignKey: {
        name:"item_id",
        allowNull: false
    }
})

Item.hasMany(Colecao, {
    foreignKey: "item_id"
})