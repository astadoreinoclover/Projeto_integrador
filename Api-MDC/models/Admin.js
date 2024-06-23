import bcrypt from 'bcrypt'
import { DataTypes } from 'sequelize';
import { sequelize } from '../database/conecta.js';

export const Admin = sequelize.define('admin', {
  id : {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING(40),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(80),
    allowNull: false
  },
  senha: {
    type: DataTypes.STRING(60),
    allowNull: false
  }
}, {
  timestamps: false
});

// Hook (gancho) do Sequelize que é executado antes da inserção
// de um novo registro. Faz a criptografia da senha 
Admin.beforeCreate(admin=> {
  const salt = bcrypt.genSaltSync(12)
  const hash = bcrypt.hashSync(admin.senha, salt)
  admin.senha = hash
})
