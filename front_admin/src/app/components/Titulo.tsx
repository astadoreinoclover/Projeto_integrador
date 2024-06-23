'use client'
import Link from "next/link"
import Cookies from "js-cookie"
import { FaUserAlt } from "react-icons/fa"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import "./Titulo.css";

function Titulo() {

  return (
    <nav className="cab">
      <div className="cont-cab">
        <div className="cont-cab-itens">
          <div className="imagem-logo">
            <img className="logo-img" src="./logo.png" alt="" />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Titulo