import { Router } from "express"
import { loginUser } from "./controllers/userLoginController.js"
import { verificaToken } from "./middlewares/verificaToken.js"
import { itemCreate, itemIndex, itemPesquisa } from "./controllers/itemController.js"
import { userCreate, userIndex, verificarCadastro, verificarCadastro2 } from "./controllers/userController.js"
import { calcTotal, colecaoCreate, colecaoIndex, itenDelete, itensDoUsuarioLogado, itenspelotitulo, itenspelovolume } from "./controllers/colecaoController.js"

const router = Router()

router.get("/item", itemIndex)
      .post("/item",  itemCreate)
      .get("/item/pesquisa/:palavra", itemPesquisa)

router.get('/user', userIndex)
      .post('/user', userCreate)
      .post("/verificar-cadastro", verificarCadastro)
      .post("/verificar-cadastro2", verificarCadastro2)

router.post("/loginUser", loginUser)     

router.get("/colecao", colecaoIndex)
      .post("/colecao", colecaoCreate)
      .post("/itensuser", itensDoUsuarioLogado)
      .post("/itempelotitulo", itenspelotitulo)
      .post("/volume", itenspelovolume)
      .delete("/delete", itenDelete)
      .post("/total", calcTotal)

export default router