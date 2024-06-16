'use client'
import Link from "next/link"
import Cookies from "js-cookie"
import { FaUserAlt } from "react-icons/fa"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import "./Titulo.css";

function Titulo() {

  // const [nomeUsuario, setNomeUsuario] = useState<string>("")

  // const router = useRouter()

  // useEffect(() => {
  //   const nome = Cookies.get("user_logado_nome") as string
  //   setNomeUsuario(nome)
  // }, [])

  const [nomeUsuario, setNomeUsuario] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const nome = Cookies.get("user_logado_nome");
    if (nome) {
      setNomeUsuario(nome);
    }
  }, []);

  function limpaCookies() {
    Swal.fire({
      title: "Confirma saída do sistema?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
      }).then((result: { isConfirmed: any }) => {
      if (result.isConfirmed) {
          Cookies.remove("user_logado_id")
          Cookies.remove("user_logado_nome")
          Cookies.remove("user_logado_token")
          router.replace("/")
      }
    });
  }
  

  return (
    <nav className="cab">
      <div className="cont-cab">
        <div className="cont-cab-itens">
          <div className="imagem-logo">
            <img className="logo-img" src="./logo.png" alt="" />
          </div>
          <div style={{display: 'flex', color: 'white'}}>
            <div style={{ marginRight: '10px'}}>
              <Link href="./login">
                Entrar
              </Link>
            </div>
            <div>
              <Link className="titulolink" href="./cadastro">
                Cadastrar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Titulo