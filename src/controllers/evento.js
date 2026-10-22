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

const atualizar = (req, res) => {
    const { id } = req.params

    const {
        usuarioId,
        cidade,
        tipoEvento,
        temperaturaMaxima,
        data,
        nivelImpacto
    } = req.body

    const query = `
        UPDATE evento
        SET usuarioId = ?,
            cidade = ?,
            tipoEvento = ?,
            temperaturaMaxima = ?,
            data = ?,
            nivelImpacto = ?
        WHERE id = ?
    `

    con.query(
        query,
        [
            usuarioId,
            cidade,
            tipoEvento,
            temperaturaMaxima,
            data,
            nivelImpacto,
            id
        ],
        (err, result) => {
            if (err) {
                console.error(err)
                return res.status(500).json({
                    erro: "Erro ao atualizar evento"
                })
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    erro: "Evento não encontrado"
                })
            }

            res.json({
                mensagem: "Evento atualizado com sucesso"
            })
        }
    )
}

const excluir = (req, res) => {
    const { id } = req.params

    const query = "DELETE FROM evento WHERE id = ?"

    con.query(query, [id], (err, result) => {
        if (err) {
            console.error(err)
            return res.status(500).json({
                erro: "Erro ao excluir evento"
            })
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                erro: "Evento não encontrado"
            })
        }

        res.json({
            mensagem: "Evento excluído com sucesso"
        })
    })
}

module.exports = {
    listar,
    cadastrar,
    atualizar,
    excluir
}