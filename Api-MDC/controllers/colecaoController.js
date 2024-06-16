import { Item } from "../models/Item.js"
import { Colecao } from "../models/Colecao.js" 
import { User } from "../models/User.js"

export async function colecaoIndex(req, res) {
  try {
    const colecao = await Colecao.findAll({
        include: [{ model: User}, {model: Item}]
    })
    res.status(200).json(colecao)
  } catch (error) {
    res.status(400).send(error)
  }
}

export async function colecaoCreate(req, res) {
  const { user_id, valor, item_id } = req.body

  if (!user_id || !valor || !item_id) {
    res.status(400).json("Erro... Informe os dados ")
    return
  }

  try {
    const colecao = await Colecao.create({
        user_id, valor, item_id
    })
    res.status(201).json(colecao)
  } catch (error) {
    res.status(400).send(error)
  }
}

export async function itensDoUsuarioLogado(req, res) {
  const { user_id } = req.body
  try {
    const colecao = await Colecao.findAll({
      where: { user_id: user_id},
      include: [{ model: Item }]
    });

    // const dados = new Set()
    // for (const item of colecao) {
    //   dados.add(item.item.categoria)
    // }
    // console.log(dados)

    // const myIterator = dados.values();

    // const lista = []
    // for (const entry of myIterator) {
    //   lista.push({categoria: entry})
    // }

//    res.status(200).send(text);
    res.status(200).json(colecao);
    //res.status(200).json({dados});
  } catch (error) {
    res.status(400).send(error);
  }
}

// export async function itensDoUsuarioLogado2(req, res) {
//   const { user_id } = req.body;
//   try {
//     const colecao = await Colecao.findAll({
//       where: { user_id: user_id },
//       include: [{ model: Item }]
//     });

//     const tituloCapaMap = new Map();

//     for (const item of colecao) {
//       if (item.item.categoria === categoria) {
//         const titulo = item.item.titulo;
//         const capa = item.item.foto;


//         if (!tituloCapaMap.has(titulo)) {

//           tituloCapaMap.set(titulo, foto);
//         }
//       }
//     }

//     const lista = Array.from(tituloCapaMap, ([titulo, foto]) => ({ titulo, foto }));

//     res.status(200).json(colecao);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// }

export async function itenspelotitulo(req, res) {
  const { usuario_id, titulo, categoria } = req.body;
  try {
    const colecao = await Colecao.findAll({
      where: { 
        usuario_id: usuario_id 
      },
      include: [{ 
        model: Item,
        where: { 
          titulo: titulo,
          categoria: categoria
        }
      }]
    });

    res.status(200).json(colecao);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function itenspelovolume(req, res) {
  const { titulo, volume, categoria, editora } = req.body;
  try {
    const item = await Item.findAll({
        where: { 
          titulo: titulo ,
          volume: volume,
          categoria: categoria,
          editora: editora
        }
    });

    res.status(200).json(item);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function itenDelete(req, res) {
  const { id } = req.body;
  try {
    const colecao = await Colecao.destroy({
      where: { 
        id: id
      }
    });

    res.status(200).json(`item deleteado: ${colecao}`);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function calcTotal(req, res) {
  const { user_id } = req.body;
  try {
    const itemsUsuario = await Colecao.findAll({
      where: { user_id: user_id }
    });

    let totalGasto = 0;
    itemsUsuario.forEach(item => {
      totalGasto += item.valor;
    });

    res.status(200).json({ user_id: user_id, total_gasto: totalGasto });
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function calcTotalCateg(req, res) {
  const { usuario_id, categoria } = req.body;
  try {
    const itemsUsuario = await Colecao.findAll({
      where: { usuario_id: usuario_id },
      include: [{ 
        model: Item,
        where: {
          categoria: categoria
        }
    }]
    });

    let totalGasto = 0;
    itemsUsuario.forEach(item => {
      totalGasto += item.valor;
    });

    res.status(200).json({ usuario_id: usuario_id, total_gasto: totalGasto });
  } catch (error) {
    res.status(400).send(error);
  }
}