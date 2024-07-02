'use client'
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form"; 
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import "./cadastrar-item.css"
import Cookies from "js-cookie"
import { log } from "console";
import Link from "next/link";

interface Inputs {
    titulo: string;
    genero: string;
    editora: string;
    categoria?: "manga" | "hq" | "novel";
    foto: string;
    volume: string;
    valor: string;
    autor: string;
    sinopse: string;
}

function CadastrarItem() {
    const { register, handleSubmit } = useForm<Inputs>();
    const router = useRouter();
    const [nomeUsuario, setNomeUsuario] = useState<string>("")
    const[idUsuario, setIdUsuario] = useState<string>("")

  useEffect(() => {
    const nome = Cookies.get("admin_logado_nome") as string
    setNomeUsuario(nome)
    const id = Cookies.get("admin_logado_id") as string
    setIdUsuario(id)
  }, [])

    async function enviaDados(data: Inputs) {
        try {
            const response0 = await fetch("http://localhost:3004/volume", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    titulo: data.titulo,
                    volume: data.volume,
                    editora: data.editora,
                    categoria: data.categoria
                })
            });

            if(response0.ok) {
                const existe = await response0.json();
                console.log(existe);
                if(existe.length > 0) {
                    Swal.fire({
                        title: "Item já cadastrado",
                        icon: "warning"
                    });
                    return
                }
            }
            const response = await fetch("http://localhost:3004/item", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const dados = await response.json();
                if (Number(dados.id) > 0) {
                    // Cadastro do item bem sucedido
                    // Agora, vamos cadastrar na colecao
                    const colecaoData = {
                        user_id: idUsuario,
                        item_id: dados.id,
                        valor: data.valor
                    };

                    const colecaoResponse = await fetch("http://localhost:3004/colecao", {
                        method: "POST",
                        headers: { "Content-type": "application/json" },
                        body: JSON.stringify(colecaoData)
                    });

                    if (colecaoResponse.ok) {
                        // Cadastro na colecao bem sucedido
                        router.push("/principal");
                    } else {
                        toast.error("Erro ao cadastrar na colecao");
                    }
                } else {
                    toast.error("Erro! Cadastro falhou");
                }
            } else {
                Swal.fire({
                    title: "Erro ao Cadastrar",
                    icon: "warning"
                });
                throw new Error("Erro ao cadastrar. Por favor, tente novamente.");
            }
        } catch (error) {
            console.error("Erro ao processar o cadastro:", error);
            toast.error("Erro ao processar o cadastro. Por favor, tente novamente mais tarde.");
        }
    }


    return (
    <div className="corpo-ci">
        <div className="options-c">
            <Link href="./" className="option-c">Minha Coleção</Link>
            <Link href="./principal/cadastrar-item" className="option-c">Cadastrar Item<span className="line-c"></span></Link>
            <h1 className="option-c">Loja</h1>
        </div>
        <div className="container-ci">
            <h2 className="form-de-liv-ci">Cadastro</h2>
            <form onSubmit={handleSubmit(enviaDados)}>
                <div className="grid-container">
                    <div className="form-group-ci">
                        <label htmlFor="titulo">Título:</label>
                        <input className="input-campos" type="text" id="titulo" {...register("titulo")} required />
                    </div>
                    <div className="form-group-ci">
                        <label htmlFor="volume">Volume:</label>
                        <input className="input-campos" type="text" id="volume" {...register("volume")} required />
                    </div>
                    <div className="form-group-ci">
                        <label htmlFor="foto">Capa:</label>
                        <input className="input-campos" type="text" id="foto" {...register("foto")} required />
                    </div>
                    <div className="form-group-ci">
                        <label htmlFor="valor">Valor:</label>
                        <input className="input-campos" type="text" id="valor" {...register("valor")} required />
                    </div>
                    <div className="form-group-ci">
                        <label htmlFor="editora">Editora:</label>
                        <input className="input-campos" type="text" id="editora" {...register("editora")} required />
                    </div>
                    <div className="form-group-ci">
                        <label htmlFor="genero">Gênero:</label>
                        <input className="input-campos" type="text" id="genero" {...register("genero")} required />
                    </div>
                    <div className="form-group-ci">
                        <label htmlFor="autor">Autor:</label>
                        <input className="input-campos" type="text" id="autor" {...register("autor")} required/>
                    </div>
                    <div className="form-group-ci">
                        <label htmlFor="categoria">Categoria:</label>
                        <select id="categoria" className="input-campos" {...register("categoria")} required>
                            <option value="">Selecione...</option>
                            <option value="manga">Manga</option>
                            <option value="hq">HQ</option>
                            <option value="novel">Novel</option>
                        </select>
                    </div>
                </div>
                <div className="form-group-ci">
                    <label htmlFor="sinopse">Sinopse:</label>
                    <textarea className="input-campos" id="sinopse" {...register("sinopse")}></textarea>
                </div>
                <div className="form-group-ci">
                    <button type="submit">Enviar</button>
                </div>
            </form>
        </div>
    </div>
    );
}

export default CadastrarItem;

// "use client"
// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form"; 
// import Swal from "sweetalert2";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import "./cadastrar-item.css";
// import Cookies from "js-cookie";

// interface Inputs {
//     titulo: string;
//     genero: string;
//     editora: string;
//     categoria?: "manga" | "hq" | "novel";
//     foto: string;
//     volume: string;
//     valor: string;
//     autor: string;
//     sinopse: string;
// }

// function CadastrarItem() {
//     const { register, handleSubmit } = useForm<Inputs>();
//     const router = useRouter();
//     const [nomeUsuario, setNomeUsuario] = useState<string>("");
//     const [idUsuario, setIdUsuario] = useState<string>("");

//     useEffect(() => {
//         const nome = Cookies.get("admin_logado_nome") as string;
//         setNomeUsuario(nome);
//         const id = Cookies.get("admin_logado_id") as string;
//         setIdUsuario(id);
//     }, []);


//     async function enviaDados(data: Inputs) {
//         try {
//             const response0 = await fetch("http://localhost:3004/volume", {
//                 method: "POST",
//                 headers: { "Content-type": "application/json" },
//                 body: JSON.stringify({
//                     titulo: data.titulo,
//                     volume: data.volume,
//                     editora: data.editora,
//                     categoria: data.categoria
//                 })
//             });

//             if(response0.ok) {
//                 const existe = await response0.json();
//                 if(existe) {
//                     Swal.fire({
//                         title: "Item já cadastrado",
//                         icon: "warning"
//                     });
//                     return
//                 }
//             }

//             const response = await fetch("http://localhost:3004/item", {
//                 method: "POST",
//                 headers: { "Content-type": "application/json" },
//                 body: JSON.stringify(data)
//             });

//             if (response.ok) {
//                 const dados = await response.json();
//                 if (Number(dados.id) > 0) {
//                     // Cadastro do item bem sucedido
//                     // Agora, vamos cadastrar na colecao
//                     const colecaoData = {
//                         user_id: idUsuario,
//                         item_id: dados.id,
//                         valor: data.valor
//                     };

//                     const colecaoResponse = await fetch("http://localhost:3004/colecao", {
//                         method: "POST",
//                         headers: { "Content-type": "application/json" },
//                         body: JSON.stringify(colecaoData)
//                     });

//                     if (colecaoResponse.ok) {
//                         // Cadastro na colecao bem sucedido
//                         router.push("/principal");
//                     } else {
//                         toast.error("Erro ao cadastrar na colecao");
//                     }
//                 } else {
//                     toast.error("Erro! Cadastro falhou");
//                 }
//             } else {
//                 Swal.fire({
//                     title: "Erro ao Cadastrar",
//                     icon: "warning"
//                 });
//                 throw new Error("Erro ao cadastrar. Por favor, tente novamente.");
//             }
//         } catch (error) {
//             console.error("Erro ao processar o cadastro:", error);
//             toast.error("Erro ao processar o cadastro. Por favor, tente novamente mais tarde.");
//         }
//     }

//     return (
//         <div className="corpo-ci">
//             <div className="container-ci">
//                 <h2 className="form-de-liv-ci">Formulário de Livros</h2>
//                 <form onSubmit={handleSubmit(enviaDados)}>
//                     <div className="form-group-ci">
//                         <label htmlFor="titulo">Título:</label>
//                         <input className="input-campos" type="text" id="titulo" {...register("titulo")} required />
//                     </div>
//                     <div className="form-group-ci">
//                         <label htmlFor="volume">Volume:</label>
//                         <input className="input-campos" type="text" id="volume" {...register("volume")} />
//                     </div>
//                     <div className="form-group-ci">
//                         <label htmlFor="foto">Capa:</label>
//                         <input className="input-campos" type="text" id="foto" {...register("foto")} />
//                     </div>
//                     <div className="form-group-ci">
//                         <label htmlFor="valor">Valor:</label>
//                         <input className="input-campos" type="text" id="valor" {...register("valor")} required />
//                     </div>
//                     <div className="form-group-ci">
//                         <label htmlFor="editora">Editora:</label>
//                         <input className="input-campos" type="text" id="editora" {...register("editora")} />
//                     </div>
//                     <div className="form-group-ci">
//                         <label htmlFor="genero">Gênero:</label>
//                         <input className="input-campos" type="text" id="genero" {...register("genero")} />
//                     </div>
//                     <div className="form-group-ci">
//                         <label htmlFor="autor">Autor:</label>
//                         <input className="input-campos" type="text" id="autor" {...register("autor")} />
//                     </div>
//                     <div className="form-group-ci">
//                         <label htmlFor="sinopse">Sinopse:</label>
//                         <textarea className="input-campos" id="sinopse" {...register("sinopse")} />
//                     </div>
//                     <div className="form-group-ci">
//                         <label htmlFor="categoria">Categoria:</label>
//                         <select id="categoria" {...register("categoria")} required>
//                             <option value="">Selecione...</option>
//                             <option value="manga">Manga</option>
//                             <option value="hq">HQ</option>
//                             <option value="novel">Novel</option>
//                         </select>
//                     </div>
//                     <div className="form-group-ci">
//                         <button type="submit">Enviar</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default CadastrarItem;
