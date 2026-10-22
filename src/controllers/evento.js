const con = require('../db')

const listar = (req, res) => {
    const query = 'select * from evento'

    con.query(query, (err, result) => {
        if(err){
            console.log(err)
            res.status(500).json({error: 'Erro ao listar o usuário'})
        }else{
            res.send(result)
        }
    })
}

const cadastrar = (req, res) => {
    const {usuarioId, cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto} = req.body

    try{
        const query = 'insert into evento (usuarioId, cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto) values (?,?,?,?,?,?)'
        con.query(query, [usuarioId, cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto], (err, result) => {
            if(err){
            console.log(err)
            res.status(500).json({error: 'Erro ao cadastrar o usuário'})
        }else{
            res.send('Cadastrado com sucesso')
        }
        })
    }catch (error){
        console.error(error)
        res.status(400).json({ error: 'Erro ao cadastrar usuário', details: 'Informe {usuarioId, cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto}' })
    }
}

module.exports = {listar, cadastrar}