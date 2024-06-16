// 'use client'
// import Link from "next/link"
// import "./principal.css"
// import { useEffect, useState } from 'react';
// import ReactDOM from "react-dom";
// import React from "react";
// import Cookies from "js-cookie"
// import { useRouter } from "next/navigation"

// export interface itemProps {
//   item: any;
//   categoria: string
//   titulo: string
// }

// function Principal() {

//   const [dados, setDados] = useState([])
//   const [totalGasto, setTotalGasto] = useState(0);

//   useEffect(() => {
//     async function recebeDados() {

//       const data = {
//         user_id: Number((Cookies.get("admin_logado_id")))
//       };
      
//       console.log(JSON.stringify(data))
//       try {
//         const response = await fetch("http://localhost:3004/itensuser", {
//           method: "POST",
//           headers: { "Content-type": "application/json" },
//           body: JSON.stringify(data.user_id)
//         });

//         const response2 = await fetch("http://localhost:3004/total", {
//           method: "POST",
//           headers: { "Content-type": "application/json" },
//           body: JSON.stringify(data.user_id)
//         });

//         const dados = await response.json();
//         console.log(dados);
//         console.log("*************");

//         const dados2 = await response2.json();
//         console.log(dados2);

//         setDados(dados)
//         setTotalGasto(dados2.total_gasto);
//       } catch (error) {
//         console.error("Erro ao receber dados:", error);
//       }
//     }
//     recebeDados()

//   }, [])

//   const [itemClicado, setItemClicado] = useState<itemProps | null>(null);

//   const handleItemClick = (item: itemProps) => {
//     setItemClicado(item);
//   };
//   localStorage.setItem('itemClicado', JSON.stringify(itemClicado));

//   console.log(itemClicado)

//   const listar = dados.map((item: itemProps) => (
//       <div className="card-i" key={item.categoria} onClick={() => handleItemClick(item)}>
//         <Link href={{ pathname: '/titulos', query: { itemClicado: JSON.stringify(item) } }}>
//           {item.categoria === "manga" && (
//             <div>
//               <img src="manga.jpg" alt="Manga" className="card-img-top-i" />
//               <h1>Manga</h1>
//             </div>
//           )}
//           {item.categoria === "hq" && (
//             <div>
//               <img src="hq.jpg" alt="HQ" className="card-img-top-i" />
//               <h1>HQ</h1>
//             </div>
//           )}
//           {item.categoria === "importado" && (
//             <div>
//               <img src="importado.jpg" alt="Importado" className="card-img-top-i" />
//               <h1>Importados</h1>
//             </div>
//           )}
//         </Link>
//       </div>
//   ));

//   return (
//     <div className="tela-i">
//       <div className="container-i">
//         <div className="options-i">
//           <Link href="./principal" className="option-i">Minha Coleção<span className="line-i"></span></Link>
//           <Link href="./principal/cadastrar-item" className="option-i">Cadastrar Item</Link>
//           <h1 className="option-i">Loja</h1>
//         </div>
//         <div className="cards-i">{listar}</div>
//       </div>
//       <div className="footer-i">
//         <div className="total-spent-i">
//           Total Gasto: R$ {totalGasto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
//         </div>
//         <Link href="/cadastrar-item" className="add-button-i">Adicionar Item</Link>
//       </div>
//     </div>
//   )
// }

// export default Principal

'use client'
import Link from "next/link";
import "./principal.css";
import { useEffect, useState } from 'react';
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export interface ItemProps {
  iten: any;
  item: any;
  categoria: string;
  titulo: string;
}

const Principal: React.FC = () => {
  const [dados, setDados] = useState<ItemProps[]>([]);
  const [totalGasto, setTotalGasto] = useState<number>(0);
  const [categoriaClicada, setCategoriaClicada] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const recebeDados = async () => {
      const userId = Number(Cookies.get("admin_logado_id"));

      try {
        const [response, response2] = await Promise.all([
          fetch("http://localhost:3004/itensuser", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ user_id: userId }),
          }),
          fetch("http://localhost:3004/total", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ user_id: userId }),
          }),
        ]);

        const dadosResponse = await response.json();
        const totalResponse = await response2.json();

        setDados(Array.isArray(dadosResponse) ? dadosResponse : []);
        setTotalGasto(totalResponse.total_gasto || 0);
      } catch (error) {
        console.error("Erro ao receber dados:", error);
      }
    };

    recebeDados();
  }, []);

  useEffect(() => {
    if (categoriaClicada) {
      localStorage.setItem('categoriaClicada', categoriaClicada);
    }
  }, [categoriaClicada]);

  const handleItemClick = (categoria: string) => {
    setCategoriaClicada(categoria);
  };

  const categoriasExibidas: { [key: string]: boolean } = {};
  const listar = dados.filter(item => {
    if (categoriasExibidas[item.iten.categoria]) {
      return false;
    } else {
      categoriasExibidas[item.iten.categoria] = true;
      return true;
    }
  }).map((item: ItemProps) => (
    <div className="card-i" key={item.iten.id} onClick={() => handleItemClick(item.iten.categoria)}>
      <Link href={{ pathname: '/principal/titulos', query: { itemClicado: item.iten.categoria } }}>
        {item.iten.categoria === "manga" && (
          <div>
            <img src="manga.jpg" alt="Manga" className="card-img-top-i" />
            <h1>Manga</h1>
          </div>
        )}
        {item.iten.categoria === "hq" && (
          <div>
            <img src="hq.jpg" alt="HQ" className="card-img-top-i" />
            <h1>HQ</h1>
          </div>
        )}
        {item.iten.categoria === "novel" && (
          <div>
            <img src="novel.png" alt="Novel" className="card-img-top-i" />
            <h1>Novel</h1>
          </div>
        )}
      </Link>
    </div>
  ));

  return (
    <div className="tela-i">
      <div className="container-i">
        <div className="options-i">
          <Link href="./principal" className="option-i">Minha Coleção<span className="line-i"></span></Link>
          <Link href="./principal/cadastrar-item" className="option-i">Cadastrar Item</Link>
          <h1 className="option-i">Loja</h1>
        </div>
        <div className="cards-i">{listar}</div>
      </div>
      <div className="footer-i">
        <div className="total-spent-i">
          Total Gasto: R$ {totalGasto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </div>
        <Link href="/principal/adicionar-item" className="add-button-i">Adicionar Item</Link>
      </div>
    </div>
  );
};

export default Principal;