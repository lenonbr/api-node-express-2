import {livros} from "../models/index.js";

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const livrosResultado = await livros.find()
        .populate("autor")
        .exec();

      res.status(200).json(livrosResultado);
    } catch (erro) {
      next(erro);
    }
  }

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultados = await livros.findById(id)
        .populate("autor", "nome")
        .exec();

      res.status(200).send(livroResultados);
    } catch (erro) {
      next(erro);
    }
  }

  static cadastrarLivro = async (req, res) => {
    try {
      let livro = new livros(req.body);

      const livroResultado = await livro.save();

      res.status(201).send(livroResultado.toJSON());
    } catch (erro) {
      res.status(500).send({message: `${erro.message} - falha ao cadastrar livro.`});
    }
  }

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      await livros.findByIdAndUpdate(id, {$set: req.body});

      res.status(200).send({message: "Livro atualizado com sucesso"});
    } catch (erro) {
      next(erro);
    }
  }

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      await livros.findByIdAndDelete(id);

      res.status(200).send({message: "Livro removido com sucesso"});
    } catch (erro) {
      next(erro);
    }
  }

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const {editora, titulo } = req.query;

      // const regex = new RegExp(titulo, "i");

      const busca = {};
      if(editora) busca.editora = editora;
      if(titulo) busca.titulo = { $regex: titulo, $options: "i"}; //ou regex;

      const livrosResultado = await livros.find(busca);

      res.status(200).send(livrosResultado);
    } catch (erro) {
      next(erro);
    }
  }



}

export default LivroController