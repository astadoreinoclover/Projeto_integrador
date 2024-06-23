// 'use client'

// import 'react-responsive-modal/styles.css'
// import { Modal } from 'react-responsive-modal'
// import { useEffect, useState } from "react"
// import Swal from 'sweetalert2'

// export interface itemProps {
//   id: number
//   titulo: string
//   volume: number
//   foto: string
// }

// function Users() {
//   const [item, setItens] = useState<itemProps[]>([])
//   const [open, setOpen] = useState(false)

//   useEffect(() => {
//     async function getItens() {
//       const response = await fetch("http://localhost:3004/item")
//       const dados = await response.json()
//       setItens(dados)
//     }
//     getItens()
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
//           const responseItens = await fetch(`http://localhost:3004/itensuser2`, {
//             method: "POST",
//             headers: { "Content-type": "application/json" },
//             body: JSON.stringify({
//               item_id: id
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
//           const response = await fetch(`http://localhost:3004/exclusao`, {
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
//           window.location.href = '/principal/itens';

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

//   const listaUsuarios = item.map((item: itemProps) => (
//     <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
//       <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//         <img src={item.foto} alt="Capa do Filme"
//           className="foto-filme" />
//       </th>
//       <td className="px-6 py-4">
//         {item.titulo}
//       </td>
//       <td className="px-6 py-4">
//         {item.volume}
//       </td>
//       <td className="px-6 py-4">
//         <button 
//           className="text-red-600 hover:text-red-900"
//           onClick={() => deleteUser(item.id)}
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
//         <button type="button" 
//           className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
//           onClick={onOpenModal}>
//           Novo Item
//         </button>
//       </div>

//       <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
//         <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//             <tr>
//               <th scope="col" className="px-6 py-3">
//                 Capa
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Titulo
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Volume
//               </th>
//               <th scope="col" className="px-6 py-3">
                
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

export interface itemProps {
  id: number
  titulo: string
  volume: number
  foto: string
}

function Itens() {
  const [items, setItems] = useState<itemProps[]>([])
  const [open, setOpen] = useState(false)
  const [searchTitle, setSearchTitle] = useState("")
  const [searchVolume, setSearchVolume] = useState("")

  useEffect(() => {
    async function getItems() {
      const response = await fetch("http://localhost:3004/item")
      const data = await response.json()
      setItems(data)
    }
    getItems()
  }, [])

  const deleteUser = async (id: Number) => {
    Swal.fire({
      title: "Tem certeza que deseja excluir este Item?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const responseItems = await fetch(`http://localhost:3004/itensuser2`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              item_id: id
            })
          });

          if (!responseItems.ok) {
            throw new Error(`Erro ao buscar itens relacionados: ${responseItems.status}`);
          }

          const items = await responseItems.json();

          for (const item of items) {
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
          const response = await fetch(`http://localhost:3004/exclusao`, {
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
          window.location.href = '/principal/itens';

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

  const filteredItems = items.filter(item =>
    item.titulo.toLowerCase().includes(searchTitle.toLowerCase()) &&
    item.volume.toString().includes(searchVolume)
  )

  const listaUsuarios = filteredItems.map((item: itemProps) => (
    <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <img src={item.foto} alt="Capa do Filme"
          style={{width:"100px"}} />
      </th>
      <td className="px-6 py-4">
        {item.titulo}
      </td>
      <td className="px-6 py-4">
        {item.volume}
      </td>
      <td className="px-6 py-4">
        <button 
          className="text-red-600 hover:text-red-900"
          onClick={() => deleteUser(item.id)}
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

      <div className='flex justify-between mb-4'>
        <h1 className="text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          Itens
        </h1>
      </div>

      <div className='mb-4 flex'>
        <input 
          type="text"
          placeholder="Buscar por título..."
          className="w-3/4 p-2 mb-2 border border-gray-300 rounded-lg"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <input 
          type="text"
          placeholder="Buscar por volume..."
          className="w-1/4 p-2 mb-2 border border-gray-300 rounded-lg"
          value={searchVolume}
          onChange={(e) => setSearchVolume(e.target.value)}
        />
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Capa
              </th>
              <th scope="col" className="px-6 py-3">
                Titulo
              </th>
              <th scope="col" className="px-6 py-3">
                Volume
              </th>
              <th scope="col" className="px-6 py-3">

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

export default Itens

