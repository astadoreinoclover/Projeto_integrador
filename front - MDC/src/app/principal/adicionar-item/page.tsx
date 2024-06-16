'use client'
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import "./adicionar.css";
import Cookies from "js-cookie";

interface Inputs {
  titulo: string;
  valor: number;
}

interface Item {
  id: number;
  titulo: string;
  foto: string;
  iten: any;
  categoria: string;
  volume: number;
  sinopse: string;
  editora: string;
  autor: string
}

export default function Adicionar() {
  const [dados, setDados] = useState<Item[]>([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [valorPago, setValorPago] = useState<string>(""); // Estado como string para permitir números decimais

  useEffect(() => {
    async function recebeDados() {
      const userId = Number(Cookies.get("admin_logado_id"));

      try {
        const response = await fetch("http://localhost:3004/item", {
          method: "GET",
          headers: { "Content-type": "application/json" },
        });

        const dados = await response.json();
        console.log(dados);

        if (Array.isArray(dados)) {
          setDados(dados);
        } else {
          console.error("A resposta da API não é um array:", dados);
        }
      } catch (error) {
        console.error("Erro ao receber dados:", error);
      }
    }

    recebeDados();
  }, []);

  // Filtrar os itens conforme o usuário digita
  const filteredItems = dados.filter(item =>
    item.titulo && item.titulo.toLowerCase().includes(search.toLowerCase())
  );

  // Abrir o modal e definir o ID do item selecionado
  const openModal = (id: number) => {
    setSelectedItemId(id);
    setIsModalOpen(true);
    setValorPago(""); // Limpar o valor pago quando abrir o modal
  };

  // Adicionar um novo item à coleção
  const handleAddItem = async () => {
    const userId = Number(Cookies.get("admin_logado_id"));
    if (selectedItemId !== null && valorPago !== "") { // Verificar se valorPago não está vazio
      try {
        const response = await fetch(`http://localhost:3004/colecao`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            user_id: userId,
            item_id: selectedItemId,
            valor: parseFloat(valorPago) // Converter valorPago de string para número antes de enviar
          }),
        });

        if (response.ok) {
          const addedItem = await response.json();
          setDados([...dados, addedItem]);
          setIsModalOpen(false); // Fechar o modal após adicionar
          toast.success('Item adicionado com sucesso!');
          window.location.href = '/principal';
        } else {
          toast.error('Erro ao adicionar item!');
        }
      } catch (error) {
        console.error("Erro ao adicionar item:", error);
        toast.error('Erro ao adicionar item!');
      }
    } else {
      toast.error('Por favor, insira um valor válido.');
    }
  };

  return (
    <main className="fundo-adicionar">
      <form className="form-adicionar">
        <input
          className="input-adicionar"
          type="text"
          placeholder="Digite para buscar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <div className="item-adicionar">
        {search && filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div className="item-id" key={item.id}>
              <div className="foto-item"><img className="item-foto" src={item.foto} alt="" /></div>
              <div className="conteudo-item">
                <div className="complementos comp-title">{item.titulo} - {item.volume}</div>
                <div className="sinopse-item">Sinopse: <br/>{item.sinopse}</div>
                <div className="complementos">Editora: {item.editora}</div>
                <div className="complementos">Autor: {item.autor}</div>
              </div>
              <button className="button-modal" onClick={() => openModal(item.id)}>Adicionar</button>
            </div>
          ))
        ) : (
          search && <p className="erro">Nenhum item encontrado.</p>
        )}
        <div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
            <h2 className="h-modal">Adicionar</h2>
            <input
              className="input-valor"
              type="text" // Alterado para text para permitir números decimais
              placeholder="Valor Pago"
              value={valorPago}
              onChange={(e) => setValorPago(e.target.value)}
            />
            <button className="button-add" onClick={handleAddItem}>Adicionar</button>
          </div>
        </div>
      )}
    </main>
  );
}



// 'use client'
// import React, { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import "./adicionar.css";
// import Cookies from "js-cookie";

// interface Inputs {
//   titulo: string;
//   valor: number;
// }

// interface Item {
//   id: number;
//   titulo: string;
//   foto: string;
//   iten: any;
//   categoria: string;
//   volume: number
// }

// export default function Adicionar() {
//   const [dados, setDados] = useState<Item[]>([]);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     async function recebeDados() {
//       const userId = Number(Cookies.get("admin_logado_id"));

//       const data = {
//         user_id: userId,
//       };

//       console.log(JSON.stringify(data));

//       try {
//         const response = await fetch("http://localhost:3004/item", {
//           method: "GET",
//           headers: { "Content-type": "application/json" },
//         });

//         const dados = await response.json();
//         console.log(dados);

//         if (Array.isArray(dados)) {
//           setDados(dados);
//         } else {
//           console.error("A resposta da API não é um array:", dados);
//         }
//       } catch (error) {
//         console.error("Erro ao receber dados:", error);
//       }
//     }

//     recebeDados();
//   }, []);

//   // Filtrar os itens conforme o usuário digita
//   const filteredItems = dados.filter(item =>
//     item.titulo.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div>
//       <form>
//         <input
//           type="text"
//           placeholder="Digite para buscar"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </form>
//       <div>
//       {search && filteredItems.length > 0 ? (
//           filteredItems.map((item) => (
//             <div key={item.id}>
//               <p>{item.titulo} - {item.volume}</p>
//             </div>
//           ))
//         ) : (
//           search && <p>Nenhum item encontrado.</p>
//         )}
//       </div>
//     </div>
//   );
// }
