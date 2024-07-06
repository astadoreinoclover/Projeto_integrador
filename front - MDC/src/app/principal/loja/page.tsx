import Link from "next/link";
import "./loja.css";
import React from 'react';
import Image from 'next/image';
import pagdesImage from './gif-pagina-em-desenvolvimento.gif';
function Loja() {

return (
    <div className="tela-l">
      <div className="container-l">
        <div className="options-l">
          <Link href="./" className="option-l">Minha Coleção</Link>
          <Link href="cadastrar-item" className="option-l">Cadastrar Item</Link>
          <Link href="loja" className="option-l">Loja<span className="line-l"></span></Link>
        </div>
        <Image style={{width: "80%", margin: "auto", marginTop: "50px"}} src={pagdesImage} alt="Descrição da imagem" className="image-l" />
      </div>
    </div>
  );
};

export default Loja;