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
    categoria?: "manga" | "hq" | "novel" |"";
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
    const [step, setStep] = useState<number>(1);

  useEffect(() => {
    const nome = Cookies.get("admin_logado_nome") as string
    setNomeUsuario(nome)
    const id = Cookies.get("admin_logado_id") as string
    setIdUsuario(id)
  }, [])

    async function enviaDados(data: Inputs) {
        if(data.categoria === "") {
            Swal.fire({
                title: "Selecione uma categoria",
                icon: "warning"
            });
            return
        }
        if(data.titulo === "") {
            Swal.fire({
                title: "Preencha o campo de titulo",
                icon: "warning"
            });
            return
        }
        if(data.genero === "") {
            Swal.fire({
                title: "Preencha o Genero da obra",
                icon: "warning"
            });
            return
        }
        if(data.foto === "") {
            Swal.fire({
                title: "Adicione a URL da capa",
                icon: "warning"
            });
            return
        }
        if(data.volume === "") {
            Swal.fire({
                title: "Preencha o campo de volume",
                icon: "warning"
            });
            return
        }
        if (!/^[0-9]*$/.test(data.volume)) {
            Swal.fire({
                title: "O campo volume só pode receber números",
                icon: "warning"
            });
            return;
        }
        if(data.editora === "") {
            Swal.fire({
                title: "Preencha o campo de editora",
                icon: "warning"
            });
            return
        }
        if(data.autor === "") {
            Swal.fire({
                title: "Preencha o campo de autor",
                icon: "warning"
            });
            return
        }
        if(data.valor === "") {
            Swal.fire({
                title: "Preencha o campo de valor",
                icon: "warning"
            });
            return
        }
        const valor = parseFloat(data.valor.replace(',', '.'));

        if (isNaN(valor)) {
            Swal.fire({
                title: "O campo valor só pode receber números",
                icon: "warning"
            });
            return;
        }
        if(data.sinopse === "") {
            Swal.fire({
                title: "Preencha o campo de sinopse",
                icon: "warning"
            });
            return
        }
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
                        valor: parseFloat(data.valor.replace(',', '.'))
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

    const nextStep = () => {
        setStep((prev) => prev + 1);
    };

    const prevStep = () => {
        setStep((prev) => prev - 1);
    };


    return (
        <div className="corpo-ci">
        <div className="options-c">
            <Link href="./" className="option-c">Minha Coleção</Link>
            <Link href="cadastrar-item" className="option-c">Cadastrar Item<span className="line-c"></span></Link>
            <Link href="loja" className="option-c">Loja</Link>
        </div>
        <div className="container-ci">
            <h2 className="form-de-liv-ci">Cadastro</h2>
            <div className="step-indicator">
                <span className={step === 1 ? "active" : ""}>1</span>
                <span className={step === 2 ? "active" : ""}>2</span>
                <span className={step === 3 ? "active" : ""}>3</span>
            </div>
            <form onSubmit={handleSubmit(enviaDados)}>
                {step === 1 && (
                    <div className="grid-container">
                        <div className="form-group-ci">
                            <label htmlFor="titulo">Título:</label>
                            <input className="input-campos" type="text" id="titulo" {...register("titulo")} required placeholder="Titulo da coleção"/>
                        </div>
                        <div className="form-group-ci">
                            <label htmlFor="volume">Volume:</label>
                            <input className="input-campos" type="text" id="volume" {...register("volume")} required placeholder="Apenas o número da edição"/>
                        </div>
                        <div className="form-group-ci">
                            <label htmlFor="editora">Editora:</label>
                            <input className="input-campos" type="text" id="editora" {...register("editora")} required />
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
                )}

                {step === 2 && (
                    <div className="grid-container">
                        <div className="form-group-ci">
                            <label htmlFor="foto">Capa:</label>
                            <input className="input-campos" type="text" id="foto" {...register("foto")} required placeholder="Link da Capa" />
                        </div>
                        <div className="form-group-ci">
                            <label htmlFor="valor">Valor:</label>
                            <input className="input-campos" type="text" id="valor" {...register("valor")} required placeholder="0,00" />
                        </div>
                        <div className="form-group-ci">
                            <label htmlFor="autor">Autor:</label>
                            <input className="input-campos" type="text" id="autor" {...register("autor")} required/>
                        </div>
                        <div className="form-group-ci">
                            <label htmlFor="genero">Gênero:</label>
                            <input className="input-campos" type="text" id="genero" {...register("genero")} required />
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div style={{ gridTemplateColumns: '1fr' }} className="grid-container">
                        <div className="form-group-ci">
                            <label htmlFor="sinopse">Sinopse:</label>
                            <textarea style={{width: "100%"}} className="input-campos" id="sinopse" {...register("sinopse")}></textarea>
                        </div>
                    </div>
                )}
                <div className="button-group">
                    {step === 1 && <div></div>}
                    {step > 1 && <button type="button" onClick={prevStep}>Anterior</button>}
                    {step < 3 && <button type="button" onClick={nextStep}>Próximo</button>}
                    {step === 3 && <button type="submit">Enviar</button>}
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
