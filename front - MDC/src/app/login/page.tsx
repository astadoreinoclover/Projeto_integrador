'use client'
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Toaster, toast } from 'sonner'
import { useRouter } from "next/navigation"
import "./login.css"
import Cookies from 'js-cookie'
import Link from "next/link"

type Inputs = {
  email: string
  senha: string
}

export default function Home() {
  const { register, handleSubmit, reset, setFocus } = useForm<Inputs>()
  const router = useRouter()

  async function verificaLogin(data: Inputs) {
    // console.log(data)
    const response = await fetch("http://localhost:3004/loginUser", {
      method: "POST",
      headers: {"Content-type": "Application/json"},
      body: JSON.stringify({email: data.email, senha: data.senha})
    })

    // console.log(response.status)

    if (response.status == 200) {
//      toast.success("Ok! Bem-vindo ao sistema de administração do Cineclube")
      const admin = await response.json()

      Cookies.set("admin_logado_id", admin.id)
      Cookies.set("admin_logado_nome", admin.nome)
      Cookies.set("admin_logado_token", admin.token)

      const response2 = await fetch("http://localhost:3004/userid", {
        method: "POST",
        headers: {"Content-type": "Application/json"},
        body: JSON.stringify({ id:admin.id })
      })
      const user = await response2.json()
      Cookies.set("admin_logado_userName", user.cpf);
      Cookies.set("admin_logado_email",user.email)


      router.push("/principal")      
    } else if (response.status == 400) {
//      alert("Erro... Login ou senha incorretos")
      toast.error("Erro... Login ou senha incorretos")
    } 

  }

  // ocorre quando o componente é renderizado
  useEffect(() => {
    setFocus("email")
  }, [])

  function goBack() {
    window.history.back();
  }

  return (
    <main className="tela-login">
      <div className="tela-logo">
        <img src="./logo.png" alt="Mundo do Colecionador"/>
      </div>
      <div className="form-login">
        <button style={{color: "white", position:"absolute",left:"20px", top: "50px"}} onClick={goBack}>Voltar</button>
        <div className="login-fundo">
          <h1 className="form-title">Mundo do Colecionador</h1>
          <form className="ajustes" onSubmit={handleSubmit(verificaLogin)}>
            <div className="area-email">
              <label htmlFor="email" className="label-email">
                E-mail de Acesso
              </label>
              <input type="email" id="email" className="campo-email"
                required {...register("email")} />
            </div>
            <div className="area-senha">
              <label htmlFor="password" className="label-senha">
                Senha
              </label>
              <input type="password" id="password" className="campo-senha" 
                required {...register("senha")} />
            </div>
            <button type="submit" className="button-login">
              Entrar
            </button>
          </form>
          <div className="pergunta">Não possui conta? <Link className="resposta" href="./cadastro">Cadastrar-se</Link></div>
        </div>
      </div>
      <Toaster richColors position="top-right" />
    </main>
  );
}
