'use client'
import Cookies from "js-cookie"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Titulo from "../components/Titulo"
import MenuLateral from "../components/MenuLateral"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const router = useRouter()

  useEffect(() => {
    if (!Cookies.get("admin_logado_id")) {
      router.replace("/")
    }
  }, [])

  return (
    <>
      <Titulo/>
      <MenuLateral/>
      <div className="p-4 sm:ml-64">
        {children}
      </div>
    </>
  )
}