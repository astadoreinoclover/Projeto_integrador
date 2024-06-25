'use client'
import Link from "next/link"
import Cookies from "js-cookie"
import { FaUserAlt } from "react-icons/fa"
import { FaExclamationTriangle } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2";

function MenuLateral() {
  const [nomeUsuario, setNomeUsuario] = useState<string>("")

  const router = useRouter()

  useEffect(() => {
    const nome = Cookies.get("admin_logado_nome") as string
    setNomeUsuario(nome)
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
          router.replace("/")
      }
    });
  }

  return (
    <aside id="default-sidebar" className="fixed top-30 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto bg-blue-200 dark:bg-blue-600">
        <Link href="/" className="flex items-center ps-2.5 mb-5">
          <FaUserAlt className="h-6 me-3 sm:h-7 text-xl text-blue-600" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white text-blue-700">
            {nomeUsuario}
          </span>
        </Link>

        <ul className="space-y-2 font-medium">
          <li>
            <Link href="/principal" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <MdSpaceDashboard />
              <span className="ms-3">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link href="/principal/itens" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <FaBook />
              <span className="flex-1 ms-3 whitespace-nowrap">Itens</span>
            </Link>
          </li>
          <li>
            <Link href="/principal/usuarios" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <FaUsers />
              <span className="flex-1 ms-3 whitespace-nowrap">Usuarios</span>
            </Link>
          </li>
          <li>
            <Link href="/principal/denuncias" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <FaExclamationTriangle />
              <span className="flex-1 ms-3 whitespace-nowrap">Denuncias</span>
            </Link>
          </li>
        </ul>
        <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
          <li>
            <span className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group cursor-pointer"
              onClick={limpaCookies}>
              <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 17 20">
                <path d="M7.958 19.393a7.7 7.7 0 0 1-6.715-3.439c-2.868-4.832 0-9.376.944-10.654l.091-.122a3.286 3.286 0 0 0 .765-3.288A1 1 0 0 1 4.6.8c.133.1.313.212.525.347A10.451 10.451 0 0 1 10.6 9.3c.5-1.06.772-2.213.8-3.385a1 1 0 0 1 1.592-.758c1.636 1.205 4.638 6.081 2.019 10.441a8.177 8.177 0 0 1-7.053 3.795Z" />
              </svg>
              <span className="ms-3">Logout</span>
            </span>
          </li>
        </ul>
      </div>
    </aside>
  )
}

export default MenuLateral