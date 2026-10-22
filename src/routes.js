const express = require("express")
const router = express.Router()
const Usuario = require("./controllers/usuario")
const Evento = require("./controllers/evento")
const rotaInicial = (req, res) => {
    res.json("Back-end respondendo")
}

router.get("/", rotaInicial)

router.get("/usuarios", Usuario.listar)
router.post("/usuarios", Usuario.cadastrar)
router.put("/usuarios/:id", Usuario.atualizar)
router.delete("/usuarios/:id", Usuario.excluir)
router.get("/eventos", Evento.listar)
router.post("/eventos", Evento.cadastrar)
router.put("/eventos/:id", Evento.atualizar)
router.delete("/eventos/:id", Evento.excluir)

module.exports = router