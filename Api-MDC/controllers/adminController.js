import { Admin } from "../models/Admin.js"

export async function adminIndex(req, res) {
  try {
    const admin = await Admin.findAll()
    res.status(200).json(admin)
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

export async function adminCreate(req, res) {
  const { nome, email, senha } = req.body

  if (!nome || !email || !senha) {
    res.status(400).json("Erro... Informe nome, email e senha")
    return
  }

  const mensagem = validaSenha(senha)
  if (mensagem.length > 0) {
    res.status(400).json({ erro: mensagem.join(", ") })
    return
  }

  try {
    const admin = await Admin.create({
      nome, email, senha
    })
    res.status(201).json(admin)
  } catch (error) {
    res.status(400).send(error)
  }
}

export async function verificarCadastroAdmin(req, res) {
  const { email } = req.body;

  try {
      const adminExistente = await Admin.findOne({ where: { email: email } });
      if (!adminExistente) {
        res.status(200).json({ cadastroExistente: false});
      } else {
        res.status(200).json({ cadastroExistente: true});
      }
  } catch (error) {
      console.error("Erro ao verificar o cadastro:", error);
      res.status(500).json({ erro: "Erro interno ao verificar o cadastro" });
  }
}

export async function adminDelete(req, res) {
  const { id } = req.body;
  try {
    const admin = await Admin.destroy({
      where: { 
        id: id
      }
    });

    res.status(200).json(`item deleteado: ${admin}`);
  } catch (error) {
    res.status(400).send(error);
  }
}