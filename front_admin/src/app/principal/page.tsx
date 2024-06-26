'use client';
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './styles.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Principal() {
  const [userCount, setUserCount] = useState(null);
  const [itemCount, setItemCount] = useState(null);
  const [counts, setCounts] = useState({ manga: null, hq: null, novel: null });

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await fetch('http://localhost:3004/numeroUsuario');
        const data = await response.json();
        setUserCount(data.count);
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };

    const fetchItemCount = async () => {
      try {
        const response = await fetch('http://localhost:3004/numeroitem');
        const data = await response.json();
        setItemCount(data.count);
      } catch (error) {
        console.error('Error fetching item count:', error);
      }
    };

    const fetchCounts = async () => {
      try {
        const response = await fetch('http://localhost:3004/numerocategorias');
        const data = await response.json();
        setCounts(data);
      } catch (error) {
        console.error('Error fetching items count by category:', error);
      }
    };

    fetchUserCount();
    fetchItemCount();
    fetchCounts();
  }, []);

  const data = {
    labels: ['Manga', 'HQ', 'Novel'],
    datasets: [
      {
        label: 'Número de Itens',
        data: [counts.manga, counts.hq, counts.novel],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='tela-dash'>
      <div className="container">
        <div className="header">
          <h2>Dashboard: Dados Gerais do Sistema</h2>
        </div>
        <div className="info">
          <h1>Número de usuários cadastrados: {userCount}</h1>
          <h1>Número de itens cadastrados: {itemCount}</h1>
        </div>
        <div className="chart-container">
          <Bar data={data}/>
        </div>
      </div>
    </div>
  );
}

export default Principal;

