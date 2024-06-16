'use client'; // Esta diretiva deve estar no topo do arquivo
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from 'sonner';
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Cookies from 'js-cookie';
import "./cadastro.css"
import Link from "next/link";

interface Inputs {
    email: string;
    senha: string;
    nome: string;
    cpf: string;
}

function Cadastro() {
    const { register, handleSubmit } = useForm<Inputs>();
    const router = useRouter();
    const [confirmarSenha, setConfirmarSenha] = useState<string>("");

    async function enviaDados(data: Inputs) {
        try {
            if (data.senha !== confirmarSenha) {
                Swal.fire({
                    title: "As senhas não coincidem",
                    icon: "error"
                });
                return;
            }

            const verificarCadastroResponse = await fetch("http://localhost:3004/verificar-cadastro", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ email: data.email })
            });

            const verificarCadastroResponse2 = await fetch("http://localhost:3004/verificar-cadastro2", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ cpf: data.cpf })
            });

            const verificarCadastro = await verificarCadastroResponse.json();
            const verificarCadastro2 = await verificarCadastroResponse2.json();

            if (verificarCadastro.cadastroExistente || verificarCadastro2.cadastroExistente) {
                Swal.fire({
                    title: "Email ou CPF já cadastrados",
                    icon: "warning"
                });
                return;
            }

            const response = await fetch("http://localhost:3004/user", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const dados = await response.json();
                if (Number(dados.id) > 0) {
                    Cookies.set("admin_logado_id", dados.id);
                    Cookies.set("admin_logado_nome", dados.nome);
                    Cookies.set("admin_logado_token", dados.token);
                    router.push("/principal");
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
        <main className="fundo-tela">
            <div className="cadastro-logo">
                <img src="./logo.png" alt="Mundo do Colecionador"/>
            </div>
            <div className="form-cadastro">
                <div className="cadastro-fundo">
                    <h1 className="cadastro-title">Mundo do Colecionador</h1>
                    <form className="ajuste-cadastro" onSubmit={handleSubmit(enviaDados)}>
                        <div className="area-inputs">
                            <label htmlFor="nome" className="inputs-label">Nome</label>
                            <input type="text" id="nome" className="input-cadastro" required {...register("nome")} />
                        </div>
                        <div className="area-inputs">
                            <label htmlFor="cpf" className="inputs-label">CPF</label>
                            <input type="text" id="cpf" className="input-cadastro" required {...register("cpf")} />
                        </div>
                        <div className="area-inputs">
                            <label htmlFor="email" className="inputs-label">E-mail</label>
                            <input type="email" id="email" className="input-cadastro" required {...register("email")} />
                        </div>
                        <div className="area-inputs">
                            <label htmlFor="senha" className="inputs-label">Senha</label>
                            <input type="password" id="senha" className="input-cadastro" required {...register("senha")} />
                        </div>
                        <div className="area-inputs">
                            <label htmlFor="repeat_password" className="inputs-label">Confirme sua senha</label>
                            <input type="password" name="repeat_password" id="repeat_password" className="input-cadastro" onChange={(e) => setConfirmarSenha(e.target.value)} required />
                        </div>
                        <p className="">
                            <button type="submit" className="button-cadastro">Cadastrar-se</button>
                        </p>
                        <div className="pergunta-cadastro">Já possui uma conta? <Link className="resposta-cadastro" href="./login">Login</Link></div>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default Cadastro;
