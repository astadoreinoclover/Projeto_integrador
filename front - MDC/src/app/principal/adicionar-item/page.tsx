// 'use client'
// import React, { useEffect, useState } from "react";
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
//   volume: number;
//   sinopse: string;
//   editora: string;
//   autor: string;
// }

// export default function Adicionar() {
//   const [dados, setDados] = useState<Item[]>([]);
//   const [search, setSearch] = useState("");
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [isReportModalOpen, setIsReportModalOpen] = useState(false);
//   const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
//   const [valorPago, setValorPago] = useState<string>(""); // Estado como string para permitir números decimais
//   const [reportText, setReportText] = useState<string>(""); // Estado para o texto do report

//   useEffect(() => {
//     async function recebeDados() {
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

//   const filteredItems = dados.filter(item =>
//     item.titulo && item.titulo.toLowerCase().includes(search.toLowerCase())
//   );

//   const openAddModal = (id: number) => {
//     setSelectedItemId(id);
//     setIsAddModalOpen(true);
//     setValorPago(""); // Limpar o valor pago quando abrir o modal
//   };

//   const openReportModal = (id: number) => {
//     setSelectedItemId(id);
//     setIsReportModalOpen(true);
//     setReportText(""); // Limpar o texto do report quando abrir o modal
//   };

//   const handleAddItem = async () => {
//     const userId = Number(Cookies.get("admin_logado_id"));
//     if (selectedItemId !== null && valorPago !== "") {
//       try {
//         const response = await fetch(`http://localhost:3004/colecao`, {
//           method: "POST",
//           headers: { "Content-type": "application/json" },
//           body: JSON.stringify({
//             user_id: userId,
//             item_id: selectedItemId,
//             valor: parseFloat(valorPago)
//           }),
//         });

//         if (response.ok) {
//           const addedItem = await response.json();
//           setDados([...dados, addedItem]);
//           setIsAddModalOpen(false); // Fechar o modal após adicionar
//           toast.success('Item adicionado com sucesso!');
//           window.location.href = '/principal';
//         } else {
//           toast.error('Erro ao adicionar item!');
//         }
//       } catch (error) {
//         console.error("Erro ao adicionar item:", error);
//         toast.error('Erro ao adicionar item!');
//       }
//     } else {
//       toast.error('Por favor, insira um valor válido.');
//     }
//   };

//   const handleReportItem = async () => {
//     const userId = Number(Cookies.get("admin_logado_id"));
//     if (selectedItemId !== null && reportText !== "") {
//       try {
//         const response = await fetch(`http://localhost:3004/report`, {
//           method: "POST",
//           headers: { "Content-type": "application/json" },
//           body: JSON.stringify({
//             user_id: userId,
//             item_id: selectedItemId,
//             texto: reportText
//           }),
//         });

//         if (response.ok) {
//           setIsReportModalOpen(false); // Fechar o modal após reportar
//           toast.success('Reclamação enviada com sucesso!');
//         } else {
//           toast.error('Erro ao enviar reclamação!');
//         }
//       } catch (error) {
//         console.error("Erro ao enviar reclamação:", error);
//         toast.error('Erro ao enviar reclamação!');
//       }
//     } else {
//       toast.error('Por favor, insira um texto válido.');
//     }
//   };

//   return (
//     <main className="fundo-adicionar">
//       <form className="form-adicionar">
//         <input
//           className="input-adicionar"
//           type="text"
//           placeholder="Digite para buscar"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </form>
//       <div className="item-adicionar">
//         {search && filteredItems.length > 0 ? (
//           filteredItems.map((item) => (
//             <div className="item-id" key={item.id}>
//               <div className="foto-item"><img className="item-foto" src={item.foto} alt="" /></div>
//               <div className="conteudo-item">
//                 <div className="complementos comp-title">{item.titulo} - {item.volume}</div>
//                 <div className="sinopse-item">Sinopse: <br/>{item.sinopse}</div>
//                 <div className="complementos">Editora: {item.editora}</div>
//                 <div className="complementos">Autor: {item.autor}</div>
//               </div>
//               <button className="button-modal" onClick={() => openAddModal(item.id)}>Adicionar</button>
//               <button className="button-modal" onClick={() => openReportModal(item.id)}>Reportar</button>
//             </div>
//           ))
//         ) : (
//           search && <p className="erro">Nenhum item encontrado.</p>
//         )}
//       </div>

//       {isAddModalOpen && (
//         <div className="modal">
//           <div className="modal-content">
//             <span className="close" onClick={() => setIsAddModalOpen(false)}>&times;</span>
//             <h2 className="h-modal">Adicionar</h2>
//             <input
//               className="input-valor"
//               type="text"
//               placeholder="Valor Pago"
//               value={valorPago}
//               onChange={(e) => setValorPago(e.target.value)}
//             />
//             <button className="button-add" onClick={handleAddItem}>Adicionar</button>
//           </div>
//         </div>
//       )}

//       {isReportModalOpen && (
//         <div className="modal">
//           <div className="modal-content">
//             <span className="close" onClick={() => setIsReportModalOpen(false)}>&times;</span>
//             <h2 className="h-modal">Reportar</h2>
//             <textarea
//               className="textarea-report"
//               placeholder="Descreva o problema"
//               value={reportText}
//               onChange={(e) => setReportText(e.target.value)}
//             />
//             <button className="button-report" onClick={handleReportItem}>Enviar</button>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// }

'use client'
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import "./adicionar.css";
import Cookies from "js-cookie";
import Link from "next/link";

interface Item {
  id: number;
  titulo: string;
  foto: string;
  categoria: string;
  volume: number;
  sinopse: string;
  editora: string;
  autor: string;
}

export default function Adicionar() {
  const [dados, setDados] = useState<Item[]>([]);
  const [search, setSearch] = useState("");
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [valorPago, setValorPago] = useState<string>("");
  const [reportText, setReportText] = useState<string>("");

  useEffect(() => {
    async function recebeDados() {
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

  const filteredItems = dados.filter(item =>
    item.titulo && item.titulo.toLowerCase().includes(search.toLowerCase())
  );

  const openViewModal = (id: number) => {
    setSelectedItemId(id);
    setIsViewModalOpen(true);
  };

  const openAddModal = (id: number) => {
    setSelectedItemId(id);
    setIsAddModalOpen(true);
    setValorPago("");
  };

  const openReportModal = (id: number) => {
    setSelectedItemId(id);
    setIsReportModalOpen(true);
    setReportText("");
  };

  const handleAddItem = async () => {
    const userId = Number(Cookies.get("admin_logado_id"));
    if (selectedItemId !== null && valorPago !== "") {
      try {
        const response = await fetch(`http://localhost:3004/colecao`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            user_id: userId,
            item_id: selectedItemId,
            valor: parseFloat(valorPago)
          }),
        });

        if (response.ok) {
          const addedItem = await response.json();
          setDados([...dados, addedItem]);
          setIsAddModalOpen(false);
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

  const handleReportItem = async () => {
    const userId = Number(Cookies.get("admin_logado_id"));
    if (selectedItemId !== null && reportText !== "") {
      try {
        const response = await fetch(`http://localhost:3004/report`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            user_id: userId,
            item_id: selectedItemId,
            texto: reportText
          }),
        });

        if (response.ok) {
          setIsReportModalOpen(false);
          toast.success('Reclamação enviada com sucesso!');
        } else {
          toast.error('Erro ao enviar reclamação!');
        }
      } catch (error) {
        console.error("Erro ao enviar reclamação:", error);
        toast.error('Erro ao enviar reclamação!');
      }
    } else {
      toast.error('Por favor, insira um texto válido.');
    }
  };

  const getItemById = (id: number) => {
    return dados.find(item => item.id === id);
  };

  const currentItem = selectedItemId !== null ? getItemById(selectedItemId) : null;

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
                <button className="button-modal" onClick={() => openViewModal(item.id)}>Ver Mais</button>
              </div>
            </div>
          ))
        ) : (
          search && <p className="erro">Nenhum item encontrado.</p>
        )}
        <Link href="./cadastrar-item" className="link-cadastro">Cadastrar Item</Link>
      </div>

      {isViewModalOpen && currentItem && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsViewModalOpen(false)}>&times;</span>
            <h2 className="h-modal">Detalhes do Item</h2>
            <p>Título: {currentItem.titulo}</p>
            <p>Volume: {currentItem.volume}</p>
            <p>Editora: {currentItem.editora}</p>
            <p>Autor: {currentItem.autor}</p>
            <p>Sinopse: {currentItem.sinopse}</p>
            <button className="button-add" onClick={() => openAddModal(currentItem.id)}>Adicionar</button>
            <button className="button-report" onClick={() => openReportModal(currentItem.id)}>Reportar</button>
          </div>
        </div>
      )}

      {isAddModalOpen && currentItem && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsAddModalOpen(false)}>&times;</span>
            <h2 className="h-modal">Adicionar</h2>
            <input
              className="input-valor"
              type="text"
              placeholder="Valor Pago"
              value={valorPago}
              onChange={(e) => setValorPago(e.target.value)}
            />
            <button className="button-add" onClick={handleAddItem}>Adicionar</button>
          </div>
        </div>
      )}

      {isReportModalOpen && currentItem && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsReportModalOpen(false)}>&times;</span>
            <h2 className="h-modal">Reportar</h2>
            <textarea
              className="textarea-report"
              placeholder="Descreva o problema"
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
            />
            <button className="button-report" onClick={handleReportItem}>Enviar</button>
          </div>
        </div>
      )}
    </main>
  );
}
