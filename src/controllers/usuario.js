const { error } = require('node:console')
const con = require('../db')

const listar = (req, res) => {
    const query = 'select * from usuario'

    con.query(query, (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Erro ao buscar usuário' })
        } else {
            res.send(result)
        }

    })
}

const cadastrar = (req, res) =>{
    const {nome, email, senha} = req.body
    try{
    const query = 'insert into usuario (nome, email, senha) values (?, ?, SHA2(?,256))'
    con.query(query, [nome, email, senha], (err, result) => {
        if(err){
            console.error(err)
            res.status(500).json({ error: 'Erro ao cadastrar usuário' })
        }else{
            const novoUsuario = req.body
            res.status(201).json('Usuário cadastrado com sucesso')
        }
    })
    }catch (error){
        console.error(error)
        res.status(400).json({ error: 'Erro ao cadastrar usuário', details: 'Informe { nome, email, senha }' })
    }
}

module.exports = { listar, cadastrar }