import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'

import * as dotenv from 'dotenv'
dotenv.config()

import { User } from "../models/User.js"

export async function loginUser(req, res) {
  const { email, senha } = req.body

  const mensaErroPadrao = "Erro... Login ou Senha Inválidos"

  if (!email || !senha) {
    res.status(400).json({ erro: mensaErroPadrao })
    return
  }

  // verifica se o e-mail está cadastrado
  try {
    const user = await User.findOne({ where: { email } })

    if (user == null) {
      res.status(400).json({ erro: mensaErroPadrao })
      return
    } 

    if (bcrypt.compareSync(senha, user.senha)) {
      const token = jwt.sign({
        user_logado_id: user.id,
        user_logado_nome: user.nome
      },
        process.env.JWT_KEY,
        { expiresIn: "1h" })

      res.status(200).json({token, id: user.id, nome: user.nome })
    }
    else {
      res.status(400).json({ erro: mensaErroPadrao })
      return
    }
  } catch (error) {
    res.status(400).json(error)
  }
}