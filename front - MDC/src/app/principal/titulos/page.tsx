// 'use client'
// import { useRouter } from 'next/navigation';
// import { useEffect, useState, useContext } from 'react';
// import { ClienteContext } from "../context/ClienteContext"
// import "./titulo.css"
// import Link from "next/link"
// import Cabecario from '../components/Cabecario';

// function Titulos() {
//   const { idClienteLogado } = useContext(ClienteContext)
//   const itemClicadoJSON = localStorage.getItem('itemClicado');
//   const itemClicado = JSON.parse(itemClicadoJSON);

//   const [dados, setDados] = useState([])

//   useEffect(() => {
//     async function recebeDados() {

//       const data = {
//         usuario_id: idClienteLogado,
//         categoria: itemClicado.categoria
//       };

//       console.log(JSON.stringify(data))

//       try {
//         const response = await fetch("http://localhost:3004/itensuser2", {
//           method: "POST",
//           headers: { "Content-type": "application/json" },
//           body: JSON.stringify(data)
//         });

//         const dados = await response.json();
//         setDados(dados)
//         console.log(dados);
//       } catch (error) {
//         console.error("Erro ao receber dados:", error);
//       }
//     }
//     recebeDados()

//     if(itemClicado.categoria == "manga") {
//       document.querySelector(".cards-container").style.backgroundImage = `url(mangafund.png)`
//       document.querySelector(".title-titulos").style.backgroundImage = `url(titlemanga.png)`
//     }

//   }, [])

//   const [tituloClicado, setTituloClicado] = useState(null);

//   const handleItemClick = (item) => {
//     setTituloClicado(item.titulo);
//   };
//   localStorage.setItem('tituloClicado', JSON.stringify(tituloClicado));

//   console.log(tituloClicado);

//   const listar = dados.map((item) =>(
//     <div className="card" onClick={() => handleItemClick(item)}>
//         <Link href={{ pathname: '/itens', query: { itemClicado: JSON.stringify(item.titulo) } }}>
//           <img src={item.capa} alt= "Capa ${item.titulo}" />
//           <h1>{item.titulo}</h1>
//         </Link>
//       </div>
//   ))

//   return (
//     <div>
//       <Cabecario/>
//       <div className='cards-container'>
//         <span className='title-titulos'>{itemClicado.categoria}</span>
//         {listar}
//       </div>
//     </div>
//   );
// }

// export default Titulos;

'use client'
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import "./titulos.css";
import Link from "next/link";


interface Item {
  id: number;
  titulo: string;
  foto: string;
  iten: any;
  categoria: string;
}

function Titulos() {
  const categoriaClicada = localStorage.getItem('categoriaClicada');
  const [dados, setDados] = useState<Item[]>([]);
  const [tituloClicado, setTituloClicado] = useState<string | null>(null);

  useEffect(() => {
    async function recebeDados() {
      const userId = Number(Cookies.get("admin_logado_id"));

      const data = {
        user_id: userId,
      };

      console.log(JSON.stringify(data));

      try {
        const response = await fetch("http://localhost:3004/itensuser", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(data)
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

    if (categoriaClicada === "manga") {
      const titleTitulos = document.querySelector<HTMLElement>(".title-titulos");
      if (titleTitulos) {
        titleTitulos.style.backgroundImage = `url(/mangafund.png)`;
      }
    } else if (categoriaClicada === "hq") {
        const titleTitulos = document.querySelector<HTMLElement>(".title-titulos");
        if (titleTitulos) {
          titleTitulos.style.backgroundImage = `url(/titlehq.png)`;
        }
    } else if (categoriaClicada === "novel") {
        const titleTitulos = document.querySelector<HTMLElement>(".title-titulos");
        if (titleTitulos) {
          titleTitulos.style.backgroundImage = `url(/novelfund.png)`;
        }
    }
  }, [categoriaClicada]);

  const handleItemClick = (item: Item) => {
    setTituloClicado(item.titulo);
    localStorage.setItem('tituloClicado', item.iten.titulo);
  };

  console.log(tituloClicado);

  const titulosExibidos: { [key: string]: boolean } = {};
  const listar = Array.isArray(dados)
    ? dados
        .filter(item => item.iten.categoria === categoriaClicada)
        .filter(item => {
          if (titulosExibidos[item.iten.titulo]) {
            return false;
          } else {
            titulosExibidos[item.iten.titulo] = true;
            return true;
          }
        })
        .map((item) => (
          <div style={{marginBottom: "20px", height: "auto"}} className='titulo' key={item.iten.id} onClick={() => handleItemClick(item)}>
            <Link href={{ pathname: '/principal/titulos/volumes', query: { itemClicado: item.iten.titulo } }}>
              <img style={{width: "250px", borderTopLeftRadius: "15px", borderTopRightRadius: "15px"}} src={item.iten.foto} alt={`Capa ${item.iten.titulo}`} />
              <h1 style={{color: "#000", textAlign:"center", textTransform: "uppercase", fontWeight: "bold", marginTop:"15px"}}>{item.iten.titulo}</h1>
            </Link>
          </div>

        ))
    : null;

  return (
    <div className='tela-comp'>
        <div className='title-titulos'>
            <div className='title-opacity'>
                <span className='text-title'>{categoriaClicada}</span>
            </div>
        </div>
        <div style={{flexWrap: "wrap"}}  className='cards-container'>
          {listar}
        </div>
    </div>
  );
}

export default Titulos;
