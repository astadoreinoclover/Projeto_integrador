import express from 'express'
import cors from "cors"
import { sequelize } from './database/conecta.js'
import { Admin } from './models/Admin.js';
import { User } from './models/User.js';
import { Item } from './models/Item.js';
import { Colecao } from './models/Colecao.js';
import routes from './routes.js'


const app = express()
const port = 3004

app.use(express.json())
app.use(cors())
app.use(routes)

app.get('/', (req, res) => {
  res.send('Sistema de Controle de Coleções')
})

async function conecta_db() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com Banco de Dados realizada com Sucesso');
    // await Filme.sync({alter: true})      // indica uma alteração (sem remover os registros)
    // await Filme.sync({force: true})      // recria a tabela (limpa, remove todos os registros)
    await Admin.sync()      // cria a tabela no banco (se não existir)
    console.log("Tabela de Admins: Ok")
    await User.sync()      // cria a tabela no banco (se não existir)
    console.log("Tabela de Usuarios: Ok")
    await Item.sync()      // cria a tabela no banco (se não existir)
    console.log("Tabela de Itens: Ok")
    await Colecao.sync()      // cria a tabela no banco (se não existir)
    console.log("Tabela de Coleções: Ok")
  } catch (error) {
    console.error('Erro ao conectar o banco de dados:', error);
  }  
}
conecta_db()

app.listen(port, () => {
  console.log(`API de Coleções Rodando na Porta: ${port}`)
})