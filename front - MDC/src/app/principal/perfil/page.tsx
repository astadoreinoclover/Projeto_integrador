'use client'
import React, { useEffect, useState } from 'react';
import "./perfil.css";
import Cookies from "js-cookie";
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

interface ItemProps {
  valor: number;
  id: number;
  titulo: string;
  foto: string;
  iten: {
    categoria: string;
    editora: string;
  };
  categoria: string;
  editora: string;
}

const Perfil = () => {
  const [nomeUsuario, setNomeUsuario] = useState<string>("");
  const [emailUsuario, setEmailUsuario] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [dados, setDados] = useState<ItemProps[]>([]);
  const [totalGasto, setTotalGasto] = useState<number>(0);
  const [dadosCategoria, setDadosCategoria] = useState<{ categoria: string; quantidade: number; gasto: number; }[]>([]);
  const [dadosEditora, setDadosEditora] = useState<{ editora: string; quantidade: number; gasto: number; }[]>([]);
  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar');
  const [viewType, setViewType] = useState<'categoria' | 'editora'>('categoria');
  const [dataType, setDataType] = useState<'quantidade' | 'gasto'>('quantidade');

  useEffect(() => {
    const fetchUserInfo = () => {
      const nome = Cookies.get("admin_logado_nome") as string;
      setNomeUsuario(nome);
      const email = Cookies.get("admin_logado_email") as string;
      setEmailUsuario(email);
      const userName = Cookies.get("admin_logado_userName") as string;
      setUserName(userName);
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
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
        setTotalGasto(totalResponse.total_gasto);
      } catch (error) {
        console.error("Erro ao receber dados:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const categoryCounts: { [key: string]: { quantidade: number, gasto: number } } = {};
    const publisherCounts: { [key: string]: { quantidade: number, gasto: number } } = {};

    for (let i = 0; i < dados.length; i++) {
      const { categoria, editora } = dados[i].iten;
      const { valor } = dados[i];

      if (categoryCounts[categoria]) {
        categoryCounts[categoria].quantidade += 1;
        categoryCounts[categoria].gasto += valor;
      } else {
        categoryCounts[categoria] = { quantidade: 1, gasto: valor };
      }

      if (publisherCounts[editora]) {
        publisherCounts[editora].quantidade += 1;
        publisherCounts[editora].gasto += valor;
      } else {
        publisherCounts[editora] = { quantidade: 1, gasto: valor };
      }
    }

    const formattedCategoryData = Object.keys(categoryCounts).map(key => ({
      categoria: key,
      quantidade: categoryCounts[key].quantidade,
      gasto: categoryCounts[key].gasto
    }));

    const formattedPublisherData = Object.keys(publisherCounts).map(key => ({
      editora: key,
      quantidade: publisherCounts[key].quantidade,
      gasto: publisherCounts[key].gasto
    }));

    setDadosCategoria(formattedCategoryData);
    setDadosEditora(formattedPublisherData);
  }, [dados]);

  const user = {
    name: nomeUsuario,
    username: userName,
    email: emailUsuario,
  };

  const goBack = () => {
    window.history.back();
  };

  const colors = [
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)'
  ];

  const borderColors = [
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)'
  ];

  const chartData = {
    labels: (viewType === 'categoria' ? dadosCategoria : dadosEditora).map(item => viewType === 'categoria' ? item.categoria : item.editora),
    datasets: [
      {
        label: dataType === 'quantidade' ? 'Quantidade' : 'Gasto (R$)',
        data: (viewType === 'categoria' ? dadosCategoria : dadosEditora).map(item => dataType === 'quantidade' ? item.quantidade : item.gasto),
        backgroundColor: colors,
        borderColor: borderColors,
        borderWidth: 1,
      }
    ],
  };

  const currencyFormat = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className='tela-p'>
    <div className='profile-container'>
      <button className="back-button" onClick={goBack}>Voltar</button>
      <h1 className='header'>Perfil do Usuário</h1>
      <div className='section'>
        <h2>Informações do Usuário</h2>
        <p><strong>Nome:</strong> {user.name}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <div className='section'>
        <h2>Total gasto</h2>
        <p className="total-gasto">{currencyFormat(totalGasto)}</p>
      </div>
      <div className='section'>
        <h2>Visualização dos Dados</h2>
        <div className='buttons-container'>
          <div className='button-group'>
            <button className={`button ${viewType === 'categoria' ? 'active' : ''}`} onClick={() => setViewType('categoria')}>Por Categoria</button>
            <button className={`button ${viewType === 'editora' ? 'active' : ''}`} onClick={() => setViewType('editora')}>Por Editora</button>
          </div>
          <div className='button-group'>
            <button className={`button ${dataType === 'quantidade' ? 'active' : ''}`} onClick={() => setDataType('quantidade')}>Número de Itens</button>
            <button className={`button ${dataType === 'gasto' ? 'active' : ''}`} onClick={() => setDataType('gasto')}>Valor Gasto</button>
          </div>
          <div className='button-group'>
            <button className={`button ${chartType === 'bar' ? 'active' : ''}`} onClick={() => setChartType('bar')}>Gráfico de Barras</button>
            <button className={`button ${chartType === 'pie' ? 'active' : ''}`} onClick={() => setChartType('pie')}>Gráfico de Pizza</button>
          </div>
        </div>
        <div className='chart-container'>
          {chartType === 'bar' ? (
            <Bar data={chartData} />
          ) : (
            <Pie data={chartData} />
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Perfil;
