'use client'
import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'
import { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import Cookies from "js-cookie"
import "./items.css"

export interface itemProps {
  id: number
  titulo: string
  volume: number
  foto: string
  genero: string
  editora: string
  categoria: string
  sinopse: string
  autor: string
}

function Itens() {
  const [items, setItems] = useState<itemProps[]>([])
  const [open, setOpen] = useState(false)
  const [searchTitle, setSearchTitle] = useState("")
  const [searchVolume, setSearchVolume] = useState("")

  const [selectedItem, setSelectedItem] = useState<itemProps | null>(null)
  const [titulo, setTitulo] = useState("")
  const [genero, setGenero] = useState("")
  const [editora, setEditora] = useState("")
  const [categoria, setCategoria] = useState("mangas")
  const [foto, setFoto] = useState("")
  const [volume, setVolume] = useState(0)
  const [sinopse, setSinopse] = useState("")
  const [autor, setAutor] = useState("")

  useEffect(() => {
    async function getItems() {
      const response = await fetch("http://localhost:3004/item")
      const data = await response.json()
      setItems(data)
    }
    getItems()
  }, [])

  const deleteUser = async (id: number) => {
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
            headers: { "Content-type": "application/json"},
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
              headers: { "Content-type": "application/json"},
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
            headers: { "Content-type": "application/json",
              Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
            },
            body: JSON.stringify({
                id: id
            })
          });

          if (!response.ok) {
            throw new Error(`Erro ao excluir item ${id}: ${response.status}`);
          }

          // 4. Redireciona após exclusão bem-sucedida
          window.location.href = '/principal/itens';

        } catch (error) {
          console.error("Erro ao remover dados:", error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ocorreu um erro ao excluir o item.',
          });
        }
      }
    });
  }

  const onOpenEditModal = (item: itemProps) => {
    setSelectedItem(item)
    setTitulo(item.titulo)
    setGenero(item.genero)
    setEditora(item.editora)
    setCategoria(item.categoria)
    setFoto(item.foto)
    setVolume(item.volume)
    setSinopse(item.sinopse)
    setAutor(item.autor)
    setOpen(true)
  }

  const onCloseModal = () => setOpen(false)

  const handleUpdate = async () => {
    if (!selectedItem) return

    const updatedItem = {
      id: selectedItem.id,
      titulo,
      genero,
      editora,
      categoria,
      foto,
      volume,
      sinopse,
      autor
    }

    try {
      const response = await fetch('http://localhost:3004/item-up', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json',  Authorization: "Bearer " + Cookies.get("admin_logado_token") as string },
        body: JSON.stringify(updatedItem)
      })

      if (response.ok) {
        const updatedItems = items.map(item =>
          item.id === selectedItem.id ? updatedItem : item
        )
        setItems(updatedItems)
        setOpen(false)
        Swal.fire("Sucesso", "Item atualizado com sucesso", "success")
      } else {
        throw new Error('Erro ao atualizar item')
      }
      window.location.href = '/principal/itens';
    } catch (error) {
      Swal.fire("Erro", "error")
    }
  }

  const filteredItems = items.filter(item =>
    item.titulo.toLowerCase().includes(searchTitle.toLowerCase()) &&
    item.volume.toString().includes(searchVolume)
  )

  const listaUsuarios = filteredItems.map((item: itemProps) => (
    <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <img src={item.foto} alt="Capa do Filme" style={{width:"100px"}} />
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
      <td className="px-6 py-4">
        <button
          className="text-blue-600 hover:text-blue-900"
          onClick={() => onOpenEditModal(item)}
        >
          Editar
        </button>
      </td>
    </tr>
  ))

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
              <th scope="col" className="px-6 py-3">
              </th>
            </tr>
          </thead>
          <tbody>
            {listaUsuarios}
          </tbody>
        </table>
      </div>

      <Modal open={open} onClose={onCloseModal} center>
        <div className="modal-content">
          <h2 className="modal-title">Editar Item</h2>
          <form>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="titulo" className="form-label">Título:</label>
                <input type="text" id="titulo" className="form-input" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="genero" className="form-label">Gênero:</label>
                <input type="text" id="genero" className="form-input" value={genero} onChange={(e) => setGenero(e.target.value)} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="editora" className="form-label">Editora:</label>
                <input type="text" id="editora" className="form-input" value={editora} onChange={(e) => setEditora(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="categoria" className="form-label">Categoria:</label>
                <select id="categoria" className="form-input" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                  <option value="manga">Mangá</option>
                  <option value="hq">HQ</option>
                  <option value="novel">Novel</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="volume" className="form-label">Volume:</label>
                <input type="number" id="volume" className="form-input" value={volume} onChange={(e) => setVolume(Number(e.target.value))} />
              </div>
              <div className="form-group">
                <label htmlFor="autor" className="form-label">Autor:</label>
                <input type="text" id="autor" className="form-input" value={autor} onChange={(e) => setAutor(e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="foto" className="form-label">URL da Foto:</label>
              <input type="text" id="foto" className="form-input" value={foto} onChange={(e) => setFoto(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="sinopse" className="form-label">Sinopse:</label>
              <textarea id="sinopse" className="form-textarea" value={sinopse} onChange={(e) => setSinopse(e.target.value)}></textarea>
            </div>
            <button type="button" className="btn-save" onClick={handleUpdate}>Salvar</button>
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default Itens