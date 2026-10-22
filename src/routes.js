const express = require("express")
const router = express.Router()
const Usuario = require('./controllers/usuario')
const Evento = require('./controllers/evento')

const rotaInicial = (req, res) => {
    res.json("Back-end respondendo")
}

router.get('/', rotaInicial)
router.get('/usuarios', Usuario.listar)
router.post('/usuarios', Usuario.cadastrar)
router.get('/eventos', Evento.listar)
router.post('/eventos', Evento.cadastrar)

module.exports = router