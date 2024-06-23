// 'use client'

// import 'react-responsive-modal/styles.css'
// import { Modal } from 'react-responsive-modal'
// import { useEffect, useState } from "react"
// import Swal from 'sweetalert2'
// import Link from 'next/link'

// export interface userProps {
//   id: number
//   nome: string
//   email: string
// }

// function Users() {
//   const [user, setUser] = useState<userProps[]>([])
//   const [open, setOpen] = useState(false)

//   useEffect(() => {
//     async function getUsers() {
//       const response = await fetch("http://localhost:3004/user")
//       const dados = await response.json()
//       setUser(dados)
//     }
//     getUsers()
//   }, [])

//   const deleteUser = async (id: Number) => {
//     Swal.fire({
//       title: "Tem certeza que deseja excluir este usuário?",
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Sim",
//       cancelButtonText: "Não",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           // 1. Busca itens relacionados ao usuário
//           const responseItens = await fetch(`http://localhost:3004/itensuser`, {
//             method: "POST",
//             headers: { "Content-type": "application/json" },
//             body: JSON.stringify({
//               user_id: id
//             })
//           });

//           if (!responseItens.ok) {
//             throw new Error(`Erro ao buscar itens relacionados: ${responseItens.status}`);
//           }

//           const itens = await responseItens.json();

//           // 2. Exclui cada item relacionado
//           for (const item of itens) {
//             const exclusao = await fetch(`http://localhost:3004/delete`, {
//               method: "DELETE",
//               headers: { "Content-type": "application/json" },
//               body: JSON.stringify({
//                 id: item.id
//               })
//             });

//             if (!exclusao.ok) {
//               throw new Error(`Erro ao excluir item ${item.id}: ${exclusao.status}`);
//             }
//           }
  
//           // 3. Exclui o usuário
//           const response = await fetch(`http://localhost:3004/user`, {
//             method: "DELETE",
//             headers: { "Content-type": "application/json" },
//             body: JSON.stringify({
//                 id: id
//             })
//           });

//           if (!response.ok) {
//             throw new Error(`Erro ao excluir usuário ${id}: ${response.status}`);
//           }

//           // 4. Redireciona após exclusão bem-sucedida
//           window.location.href = '/principal/usuarios';

//         } catch (error) {
//           console.error("Erro ao remover dados:", error);
//           Swal.fire({
//             icon: 'error',
//             title: 'Oops...',
//             text: 'Ocorreu um erro ao excluir o usuário.',
//           });
//         }
//       }
//     });
//   }

//   const listaUsuarios = user.map((user: userProps) => (
//     <tr key={user.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
//       <td className="px-6 py-4">
//         {user.nome}
//       </td>
//       <td className="px-6 py-4">
//         {user.email}
//       </td>
//       <td className="px-6 py-4">
//         <button 
//           className="text-red-600 hover:text-red-900"
//           onClick={() => deleteUser(user.id)}
//         >
//           Excluir
//         </button>
//       </td>
//     </tr>
//   ))

//   const onOpenModal = () => setOpen(true)
//   const onCloseModal = () => setOpen(false)

//   return (
//     <div className='m-4'>

//       <div className='flex justify-between'>
//         <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
//           Usuarios
//         </h1>
//       </div>

//       <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
//         <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//             <tr>
//               <th scope="col" className="px-6 py-3">
//                 Nome
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Email
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Ação
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {listaUsuarios}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

// export default Users

'use client'

import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'
import { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import Link from 'next/link'

export interface userProps {
  id: number
  nome: string
  email: string
}

function Users() {
  const [user, setUser] = useState<userProps[]>([])
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    async function getUsers() {
      const response = await fetch("http://localhost:3004/user")
      const dados = await response.json()
      setUser(dados)
    }
    getUsers()
  }, [])

  const deleteUser = async (id: Number) => {
    Swal.fire({
      title: "Tem certeza que deseja excluir este usuário?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // 1. Busca itens relacionados ao usuário
          const responseItens = await fetch(`http://localhost:3004/itensuser`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              user_id: id
            })
          });

          if (!responseItens.ok) {
            throw new Error(`Erro ao buscar itens relacionados: ${responseItens.status}`);
          }

          const itens = await responseItens.json();

          // 2. Exclui cada item relacionado
          for (const item of itens) {
            const exclusao = await fetch(`http://localhost:3004/delete`, {
              method: "DELETE",
              headers: { "Content-type": "application/json" },
              body: JSON.stringify({
                id: item.id
              })
            });

            if (!exclusao.ok) {
              throw new Error(`Erro ao excluir item ${item.id}: ${exclusao.status}`);
            }
          }
  
          // 3. Exclui o usuário
          const response = await fetch(`http://localhost:3004/user`, {
            method: "DELETE",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                id: id
            })
          });

          if (!response.ok) {
            throw new Error(`Erro ao excluir usuário ${id}: ${response.status}`);
          }

          // 4. Redireciona após exclusão bem-sucedida
          window.location.href = '/principal/usuarios';

        } catch (error) {
          console.error("Erro ao remover dados:", error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ocorreu um erro ao excluir o usuário.',
          });
        }
      }
    });
  }

  const listaUsuarios = user
    .filter((user) => user.nome.toLowerCase().includes(searchTerm.toLowerCase()))
    .map((user: userProps) => (
      <tr key={user.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
        <td className="px-6 py-4">
          {user.nome}
        </td>
        <td className="px-6 py-4">
          {user.email}
        </td>
        <td className="px-6 py-4">
          <button 
            className="text-red-600 hover:text-red-900"
            onClick={() => deleteUser(user.id)}
          >
            Excluir
          </button>
        </td>
      </tr>
    ))

  const onOpenModal = () => setOpen(true)
  const onCloseModal = () => setOpen(false)

  return (
    <div className='m-4'>
      <div className='flex justify-between items-center'>
        <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          Usuários
        </h1>
        <input
          type="text"
          placeholder="Pesquisar por nome"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nome
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Ação
              </th>
            </tr>
          </thead>
          <tbody>
            {listaUsuarios}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users
