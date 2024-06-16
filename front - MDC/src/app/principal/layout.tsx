'use client'
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import MenuLateral from "../components/MenuLateral";
import Titulo2 from "./components/Titulo2";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const router = useRouter()
  const [logado, setLogado] = useState<boolean>(false)

  useEffect(() => {
    if (Cookies.get("admin_logado_id")) {
      setLogado(true)
    } else {
      router.replace("/")
    }
  }, [])

  return (
    <>
      {logado &&
        <div>
          <Titulo2/>
          {children}
        </div>
      }
    </>
  )
}