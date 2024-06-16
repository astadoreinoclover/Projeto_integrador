import { User } from "../models/User.js"

export async function userIndex(req, res) {
  try {
    const users = await User.findAll()
    res.status(200).json(users)
  } catch (error) {
    res.status(400).send(error)
  }
}

function validaSenha(senha) {

  const mensa = []

  // .length: retorna o tamanho da string (da senha)
  if (senha.length < 8) {
    mensa.push("Erro... senha deve possuir, no mínimo, 8 caracteres")
  }

  // contadores
  let pequenas = 0
  let grandes = 0
  let numeros = 0
  let simbolos = 0

  // senha = "abc123"
  // letra = "a"

  // percorre as letras da variável senha
  for (const letra of senha) {
    // expressão regular
    if ((/[a-z]/).test(letra)) {
      pequenas++
    }
    else if ((/[A-Z]/).test(letra)) {
      grandes++
    }
    else if ((/[0-9]/).test(letra)) {
      numeros++
    } else {
      simbolos++
    }
  }

  if (pequenas == 0 || grandes == 0 || numeros == 0 || simbolos == 0) {
    mensa.push("Erro... senha deve possuir letras minúsculas, maiúsculas, números e símbolos")
  }

  return mensa
}

export async function userCreate(req, res) {
  const { nome, email, senha, cpf} = req.body

  if (!nome || !email || !senha || !cpf) {
    res.status(400).json("Erro... Informe nome, email e senha do admin")
    return
  }

  const mensagem = validaSenha(senha)
  if (mensagem.length > 0) {
    res.status(400).json({ erro: mensagem.join(', ') })
    return
  }

  try {
    const user = await User.create({
      nome, email, senha, cpf
    })
    res.status(201).json(user)
  } catch (error) {
    res.status(400).send(error)
  }
}

export async function verificarCadastro(req, res) {
  const { email } = req.body;

  try {
      const usuarioExistente = await User.findOne({ where: { email: email } });
      if (!usuarioExistente) {
        res.status(200).json({ cadastroExistente: false});
      } else {
        res.status(200).json({ cadastroExistente: true});
      }
  } catch (error) {
      console.error("Erro ao verificar o cadastro:", error);
      res.status(500).json({ erro: "Erro interno ao verificar o cadastro" });
  }
}

export async function verificarCadastro2(req, res) {
  const { cpf } = req.body;

  try {
      const usuarioExistente = await User.findOne({ where: { cpf: cpf } });
      if (!usuarioExistente) {
        res.status(200).json({ cadastroExistente: false});
      } else {
        res.status(200).json({ cadastroExistente: true});
      }
  } catch (error) {
      console.error("Erro ao verificar o cadastro:", error);
      res.status(500).json({ erro: "Erro interno ao verificar o cadastro" });
  }
}