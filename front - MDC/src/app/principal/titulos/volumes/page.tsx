'use client'
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import "./volumes.css";
import Link from "next/link";


interface Item {
  id: number;
  titulo: string;
  foto: string;
  iten: any;
  categoria: string;
}

function Volumes() {
  const categoriaClicada = localStorage.getItem('categoriaClicada');
  const tituloClicada = localStorage.getItem('tituloClicado');
  const [dados, setDados] = useState<Item[]>([]);
  const [volumeClicado, setVolumeClicado] = useState<string | null>(null);

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
    setVolumeClicado(item.iten.volume);
    localStorage.setItem('volumeClicado', item.iten.volume);
  };

  console.log(volumeClicado);

  const listar = Array.isArray(dados)
    ? dados
        .filter(item => item.iten.categoria === categoriaClicada)
        .filter(item => item.iten.titulo === tituloClicada)
        .map((item) => (
          <div style={{marginBottom: "20px", marginRight: "25px"}} className='titulo' key={item.iten.id} onClick={() => handleItemClick(item)}>
            <Link href={{ pathname: '/principal/titulos/volumes/item-selecionado', query: { volumeClicado: item.iten.volume } }}>
              <img style={{width: "250px", borderTopLeftRadius: "15px", borderTopRightRadius: "15px"}} src={item.iten.foto} alt={`Capa ${item.iten.titulo}`} />
              <h1 style={{color: "#000", textAlign:"center", textTransform: "uppercase", fontWeight: "bold", marginTop:"15px"}}>{item.iten.titulo} - {item.iten.volume}</h1>
            </Link>
          </div>

        ))
    : null;

  return (
    <div className='tela-com'>
        <div className='title-titulos'>
            <div className='title-opacity'>
                <span className='text-title'>{tituloClicada}</span>
            </div>
        </div>
        <div style={{flexWrap: "wrap"}}  className='cards-container'>
          {listar}
        </div>
    </div>
  );
}

export default Volumes;