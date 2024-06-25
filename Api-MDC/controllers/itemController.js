import { Op } from "sequelize"
import { Item } from "../models/Item.js"

export async function itemIndex(req, res) {
  try {
    const item = await Item.findAll()
    res.status(200).json(item)
  } catch (error) {
    res.status(400).send(error)
  }
}

export async function itemCreate(req, res) {
  const { titulo, genero, editora, categoria, foto, volume, sinopse, autor} = req.body

  if (!titulo || !genero || !editora || !categoria || !foto || !volume || !sinopse || !autor) {
    res.status(400).json("Erro... Informe os dados ")
    return
  }

  try {
    const item = await Item.create({
      titulo, genero, editora, categoria, foto, volume, sinopse, autor
    })
    res.status(201).json(item)
  } catch (error) {
    res.status(400).send(error)
  }
}

export async function dataDelete(req, res) {
  const { id } = req.body;
  try {
    const item = await Item.destroy({
      where: { 
        id: id
      }
    });

    res.status(200).json(`item deleteado: ${item}`);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function itemUpdate(req, res) {
  const { id, titulo, genero, editora, categoria, foto, volume, sinopse, autor } = req.body;

  if (!id || !titulo || !genero || !editora || !categoria || !foto || !volume || !sinopse || !autor) {
    res.status(400).json("Erro... Informe os dados");
    return;
  }

  try {
    const item = await Item.findByPk(id);

    if (!item) {
      res.status(404).json("Erro... Item não encontrado");
      return;
    }

    item.titulo = titulo;
    item.genero = genero;
    item.editora = editora;
    item.categoria = categoria;
    item.foto = foto;
    item.volume = volume;
    item.sinopse = sinopse;
    item.autor = autor;

    await item.save();

    res.status(200).json(item);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function itemPesquisa(req, res) {
  const { palavra } = req.params

  try {
    const filmes = await Filme.findAll({
      where: { titulo: {
        [Op.like]: '%'+palavra+'%'
      }},
      order: [['id', 'desc']]
    })
    res.status(200).json(filmes)
  } catch (error) {
    res.status(400).send(error)
  }
}
