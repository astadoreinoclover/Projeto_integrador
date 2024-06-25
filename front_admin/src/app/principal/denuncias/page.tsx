"use client"
import { useEffect, useState } from "react";
import { toast } from 'sonner';
import Cookies from "js-cookie";

export interface reportProps {
    id: number
    texto: string
    user: {
        id: number
        nome: string
    }
    iten: {
        id: number
        titulo: string
        volume: number
    }
    status: number
}


function Reports() {
    const [reports, setReports] = useState<reportProps[]>([])
    const [searchTitle, setSearchTitle] = useState("")
    const [campoStatus, setCampoStatus] = useState("")

    useEffect(() => {
        async function getReports() {
          const response = await fetch("http://localhost:3004/report")
          const data = await response.json()
          setReports(data)
        }
        getReports()
      }, [])

    console.log(reports);

    const handleStatusChange = async (id: number) => {
      try {
          const response = await fetch(`http://localhost:3004/report`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
              },
              body: JSON.stringify({id: id, status: 1 }),
          });

          if (!response.ok) {
              throw new Error('Falha ao atualizar o status');
          }

          const updatedReports = reports.map(report =>
              report.id === id ? { ...report, status: 1 } : report
          );
          setReports(updatedReports);

          toast.success('Status atualizado com sucesso!');
      } catch (error) {
          console.error('Erro ao atualizar o status:', error);
          toast.error('Erro ao atualizar o status.');
      }
  };


    const filteredReports = reports.filter(report =>
        report.texto.toLowerCase().includes(searchTitle.toLowerCase())
    )

      const listaReports = filteredReports.map((report: reportProps) => (
        <tr key={report.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
          <td key={report.user.id} className="px-6 py-4">
            {report.user.nome}
          </td>
          <td className="px-6 py-4">
            {report.iten.titulo}
          </td>
          <td className="px-6 py-4">
            {report.iten.volume}
          </td>
          <td className="px-6 py-4">
            {report.texto}
          </td>
          <td className="px-6 py-4">
            {report.status === 0 ? "Não resolovido" : "Resolvido"}
          </td>
          <td className="px-6 py-4">
            {report.status == 0 ? 
              <button
                onClick={() => handleStatusChange(report.id)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:bg-blue-600"
              >
                Alterar status
              </button> :
              ""
          }
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
          placeholder="Buscar por palavra-chave ..."
          className="w-3/4 p-2 mb-2 border border-gray-300 rounded-lg"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Usuario
              </th>
              <th scope="col" className="px-6 py-3">
                Titulo
              </th>
              <th scope="col" className="px-6 py-3">
                Volume
              </th>
              <th scope="col" className="px-6 py-3">
                Report
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
              </th>
            </tr>
          </thead>
          <tbody>
            {listaReports}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reports;
