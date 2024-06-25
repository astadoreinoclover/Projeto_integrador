import { DataTypes, INTEGER } from 'sequelize';
import { sequelize } from '../database/conecta.js';
import { User } from './User.js';
import { Item } from './Item.js';

export const Report = sequelize.define('report', {
  id : {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  texto : {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  timestamps: false
});

Report.belongsTo(User, {
    foreignKey: {
        name: "user_id",
        allowNull: false
    },
    onDelete: 'CASCADE'
})

User.hasMany(Report, {
    foreignKey: "user_id"
})

Report.belongsTo(Item, {
    foreignKey: {
        name:"item_id",
        allowNull: false
    },
    onDelete: 'CASCADE'
})

Item.hasMany(Report, {
    foreignKey: "item_id"
})