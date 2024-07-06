'use client'
import Link from "next/link"
import Cookies from "js-cookie"
import { FaUserAlt } from "react-icons/fa"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import "./titulo.css";

function Titulo2() {

  const [nomeUsuario, setNomeUsuario] = useState<string>("")
  const [userName, setUserName] = useState<string>("")

  const router = useRouter()

  useEffect(() => {
    const nome = Cookies.get("admin_logado_nome") as string
    setNomeUsuario(nome)
    const userName = Cookies.get("admin_logado_userName") as string
    setUserName(userName)
  }, [])


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
          Cookies.remove("admin_logado_id")
          Cookies.remove("admin_logado_nome")
          Cookies.remove("admin_logado_token")
          Cookies.remove("admin_logado_userName");
          Cookies.remove("admin_logado_email")
          router.replace("/")
      }
    });
  }

  return (
    <nav className="cab">
      <div className="cont-cab">
        <div className="cont-cab-itens">
          <div className="imagem-logo">
            <img className="logo-img" src="../logo.png" alt="" />
          </div>
          <div style={{display: 'flex', color: 'white'}}>
            <div style={{ marginRight: '10px'}}>
              <Link href="../../../principal/perfil" style={{cursor: 'pointer', fontSize: '17.5px'}} className="titulolink">{userName}   |</Link>
            </div>
            <div>
                <Link style={{color: "#ff5f5f"}} href="#" className="titulolink" onClick={limpaCookies}>
                    Sign out
                </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Titulo2