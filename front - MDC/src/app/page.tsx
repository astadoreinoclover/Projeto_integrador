'use client'
import { useState } from "react";
import Titulo from "./components/Titulo";
import "./inicial.css"

interface Item {
  title: string;
  image: string;
}

type Items = {
  mangas: Item[];
  novels: Item[];
  hqs: Item[];
}

type CategoriaProps = {
  categoria: string;
  items: Item[];
}

const Home: React.FC = () => {
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>("Mangas");
  const items: Items = {
    mangas: [
      { title: "Jujutsu Kaisen", image: "https://m.media-amazon.com/images/I/81s+jxE5KEL._AC_SL1500_.jpg" },
      { title: "Chainsaw Man", image: "https://img.elo7.com.br/product/zoom/46C685B/big-poster-anime-chainsaw-man-tamanho-90x90-lo04-poster-de-anime.jpg" },
      { title: "Solo Leveling", image: "https://m.media-amazon.com/images/I/6195zoYC+mL._AC_UF894,1000_QL80_.jpg" },
      { title: "One Piece", image: "https://images-cdn.ubuy.co.in/633ff1157e3fbc25557517c8-one-piece-poster-japanese-anime-posters.jpg" },
      { title: "Komi Can't Communicate", image: "https://pbs.twimg.com/media/E1GlRt5WQAAfsvr.jpg:large" },
      { title: "My Deer friend Nokotan", image: "https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=480,height=720/catalog/crunchyroll/6533e54a54f7a69c806920607bc8238e.jpg" },
      { title: "Os dias de folga do vilão", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREk13qGRTnAixZYva6AB0Req5jQqHkRoqAMw&s" },
      { title: "Black Clover", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMp46ruqZmYBLkL9HMRtGcim1zMT--FsfzHw&s" },
      { title: "Wotakoi", image: "https://br.web.img2.acsta.net/pictures/23/08/16/01/33/1295662.jpg" },
      { title: "Record of Ragnarok", image: "https://sportshub.cbsistatic.com/i/2021/09/15/dd023616-3aa8-449c-a70d-48c586f61610/record-of-ragnarok.png?auto=webp&width=994&height=1308&crop=0.76:1,smart" }
    ],
    novels: [
      { title: "No Game No Life", image: "https://m.media-amazon.com/images/I/81aP6k6h8vL._AC_UF894,1000_QL80_.jpg" },
      { title: "Solo Leveling", image: "https://d14d9vp3wdof84.cloudfront.net/image/589816272436/image_sn9hhpgvil3nd6e8bm8uv2um5e/-S897-FWEBP" },
      { title: "Mushoku Tensei", image: "https://pbs.twimg.com/media/F2TQot3WUAAXD9a.jpg:large" },
      { title: "Overlord", image: "https://img.elo7.com.br/product/zoom/1EE24D9/big-poster-do-anime-overlord-tamanho-90x-0-cm-lo002-cartaz.jpg" },
      { title: "Re:Zero", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRODoU2v2kcQy4E3NJR2gTnIjj1ozfrDHoKsg&s" },
      { title: "Toradora", image: "https://cinema10.com.br/upload/series/series_2699_tordora3.png" },
      { title: "Demon Slayer", image: "https://m.media-amazon.com/images/I/91VivF555eL._AC_SL1500_.jpg" },
      { title: "Naruto", image: "https://cdn.kobo.com/book-images/97909da3-73e0-4845-9b69-f215a3a00684/1200/1200/False/naruto-naruto-s-story-uzumaki-naruto-and-the-spiral-destiny.jpg" },
      { title: "Me Apaixonei pela Vilã", image: "https://upload.wikimedia.org/wikipedia/pt/1/18/Wataoshi_Capa.jpg" },
      { title: "Quero Comer Seu Pâncreas", image: "https://media.fstatic.com/wUpMotaLjxE9Veg3GP1dN6To1uY=/322x478/smart/filters:format(webp)/media/movies/covers/2019/04/DmDwuCOV4AAR8yu.jpg" }
    ],
    hqs: [
      { title: "Batman", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrYbDmUBT_DBqlW8Bn60UieayYWFBgrXGE_Q&s" },
      { title: "Superman", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWO0zazVF-9PcKmVnCOrnmBwAwEHwBmMc3sA&s" },
      { title: "Homem de Ferro", image: "https://i.pinimg.com/736x/7f/b2/17/7fb217e3161f906010cd53ec78410d31.jpg" },
      { title: "Homem Aranha", image: "https://m.media-amazon.com/images/I/71BL33JmfEL._AC_UF1000,1000_QL80_.jpg" },
      { title: "Guardiões da Galaxia", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRifoDyPLtwspdPlN13NQWMwzfvMF_oxJThQ&s" },
      { title: "Deadpool", image: "https://i.pinimg.com/736x/3c/8f/9b/3c8f9be6f2fa1719657b36b2ca52402d.jpg" },
      { title: "Viuva Negra", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHhSzinxzVMuMdyr5Xa_owFl9YPaK4nDwmyw&s" },
      { title: "Motoqueiro Fantasma", image: "https://m.media-amazon.com/images/I/71DFUe2qhOL._AC_UF350,350_QL50_.jpg" },
      { title: "Star Wars", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw8duBXCGWrBMmKlcNZOpvpHYaULEyokfivA&s" },
      { title: "Coringa", image: "https://cdn.ome.lt/LI35F4GldqM0hx5Vm_IQHPhUjMs=/fit-in/1070x750/smart/filer_public/aa/06/aa065f27-1532-4872-8d97-cbd44d899ce4/capas-three-jokers-3.jpg" }
    ]
  };
  
  const categorias: string[] = ["Mangas", "Novels", "HQs"];
  
  const Categoria: React.FC<CategoriaProps> = ({ categoria, items }) => {
    return (
      <div className="categoria">
        <div className="items">
          {items.map((item, index) => (
            <div className="item" key={index}>
              <img src={item.image} alt={item.title} />
              <div className="item-title">{item.title}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <Titulo/>
      <div style={{marginBottom: "40px"}} className="tela-back">
        <h1 className="inicial">Catalogue sua coleção com a gente</h1>
        <div className="categoria-menu">
          {categorias.map((categoria) => (
            <button 
              key={categoria}
              className={categoriaAtiva === categoria ? "active" : ""}
              onClick={() => setCategoriaAtiva(categoria)}
            >
              {categoria}
            </button>
          ))}
        </div>
        <Categoria categoria={categoriaAtiva} items={items[categoriaAtiva.toLowerCase() as keyof Items]} />
      </div>
    </>
  );
}

export default Home;
