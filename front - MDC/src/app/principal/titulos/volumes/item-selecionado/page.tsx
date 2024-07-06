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
            <div className='tela-item'>
                <div className="container">
                  <img src={item.iten.foto} alt={`${item.iten.titulo} - ${item.iten.volume}`} className="book-cover"/>
                  <div className="book-info">
                      <div>
                          <label htmlFor="titulo">Título:</label>
                          <p id="titulo">{item.iten.titulo}</p>
                      </div>
                      <div>
                          <label htmlFor="volume">Volume:</label>
                          <p id="volume">{item.iten.volume}</p>
                      </div>
                      <div>
                          <label htmlFor="autor">Autor:</label>
                          <p id="autor">{item.iten.autor}</p>
                      </div>
                      <div>
                          <label htmlFor="genero">Gênero:</label>
                          <p id="genero">{item.iten.genero}</p>
                      </div>
                      <div>
                          <label htmlFor="editora">Editora:</label>
                          <p id="editora">{item.iten.editora}</p>
                      </div>
                      <div>
                          <label htmlFor="valor">Valor:</label>
                          <p id="categoria">R$ {Number(item.valor).toLocaleString("pt-br", { minimumFractionDigits: 2 })}</p>
                      </div>
                  </div>
                  <label htmlFor="sinopse">Sinopse:</label>
                  <p id="sinopse">{item.iten.sinopse}</p>
                  <button onClick={() => handleRemover(item)} className="btn-remove">Remover</button>
              </div>
            </div>

        ))
    : null;

    function goBack() {
      window.history.back();
    }

  return (
    <div className='fundo-item'>
      <button style={{color: "white", position:"absolute",left:"20px", top: "80px"}} onClick={goBack}>Voltar</button>
        {exibir}
    </div>
  );
}

export default Item;