import { Router } from "express"
import { loginUser } from "./controllers/userLoginController.js"
import { verificaToken } from "./middlewares/verificaToken.js"
import { verificaTokenAdmin } from "./middlewares/verificaTokenAdmin.js"
import { dataDelete, itemCreate, itemIndex, itemPesquisa } from "./controllers/itemController.js"
import { userCreate, userDelete, userIndex, verificarCadastro, verificarCadastro2 } from "./controllers/userController.js"
import itensDelete, { calcTotal, colecaoCreate, colecaoIndex, itenDelete, itensDoUsuarioLogado, itensDoUsuarioLogado2, itenspelotitulo, itenspelovolume } from "./controllers/colecaoController.js"
import { loginAdmin } from "./controllers/adminLoginController.js"
import { adminCreate, adminIndex, verificarCadastroAdmin } from "./controllers/adminController.js"

const router = Router()

router.get("/item", itemIndex)
      .post("/item",  itemCreate)
      .get("/item/pesquisa/:palavra", itemPesquisa)
      .delete("/exclusao", dataDelete)

router.get('/user', userIndex)
      .post('/user', userCreate)
      .post("/verificar-cadastro", verificarCadastro)
      .post("/verificar-cadastro2", verificarCadastro2)
      .delete("/user", userDelete)

router.post("/loginUser", loginUser)     

router.get("/colecao", colecaoIndex)
      .post("/colecao", colecaoCreate)
      .post("/itensuser", itensDoUsuarioLogado)
      .post("/itensuser2", itensDoUsuarioLogado2)
      .post("/itempelotitulo", itenspelotitulo)
      .post("/volume", itenspelovolume)
      .delete("/delete", itenDelete)
      .post("/total", calcTotal)

router.post("/loginAdmin", loginAdmin)

router.get('/admin', adminIndex)
      .post('/admin', adminCreate)
      .post("/verificar-cadastro-admin", verificarCadastroAdmin)

export default router