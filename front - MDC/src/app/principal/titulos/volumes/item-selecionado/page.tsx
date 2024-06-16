'use client'
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import "./item.css";
import Link from "next/link";
import Swal from 'sweetalert2';


interface Item {
  valor: number;
  id: number;
  titulo: string;
  foto: string;
  iten: any;
  categoria: string;
}

function Item() {
  const categoriaClicada = localStorage.getItem('categoriaClicada');
  const tituloClicada = localStorage.getItem('tituloClicado');
  const volumeClicada = Number(localStorage.getItem('volumeClicado'));
  const [dados, setDados] = useState<Item[]>([]);


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
      const fundoitem = document.querySelector<HTMLElement>(".fundo-item");
      if (fundoitem) {
        fundoitem.style.backgroundImage = `url(/mangafund.png)`;
      }
    } else if (categoriaClicada === "hq") {
        const fundoitem = document.querySelector<HTMLElement>(".fundo-item");
        if (fundoitem) {
            fundoitem.style.backgroundImage = `url(/hqfund.png)`;
        }
    } else if (categoriaClicada === "novel") {
        const fundoitem = document.querySelector<HTMLElement>(".fundo-item");
        if (fundoitem) {
          fundoitem.style.backgroundImage = `url(/fundo.png)`;
        }
    }
  }, [categoriaClicada]);

  const handleRemover = async (item: Item) => {
    const userId = Number(Cookies.get("admin_logado_id"));

    Swal.fire({
      title: "Tem certeza que deseja excluir o item?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch("http://localhost:3004/delete", {
            method: "DELETE",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              // user_id: userId,
              // item_id: item.iten.id,
              id:item.id
            }),
          });

          const dados = await response.json();

          window.location.href = '/principal';
        } catch (error) {
          console.error("Erro ao remover dados:", error);
        }
      }
    });
  };

  const exibir = Array.isArray(dados)
    ? dados
        .filter(item => item.iten.categoria === categoriaClicada)
        .filter(item => item.iten.titulo === tituloClicada)
        .filter(item => item.iten.volume === volumeClicada)
        .map((item) => (
            <div className='area-item'>
                <div className='foto-item'>
                    <img className='img' src={item.iten.foto} alt={`${item.iten.titulo} - ${item.iten.volume}`} />
                </div>
                <div className='text-item'>
                    <h1 className='conteudo titulo-conteudo'>{item.iten.titulo} - Vol. {item.iten.volume}</h1>
                    <div className='conteudo sinopse'>Sinopse: <br/>{item.iten.sinopse}</div>
                    <div className='conteudo'>Autor: {item.iten.autor}</div>
                    <div className='conteudo'>Editora: {item.iten.editora}</div>
                    <div className='conteudo'>Gênero: {item.iten.genero}</div>
                    <div className='conteudo'> Valor: R$ {Number(item.valor).toLocaleString("pt-br", { minimumFractionDigits: 2 })}</div>
                    <button  onClick={() => handleRemover(item)} className='remover'>Remover</button>
                </div>
           </div>

        ))
    : null;

  return (
    <div className='fundo-item'>
        {exibir}
    </div>
  );
}

export default Item;