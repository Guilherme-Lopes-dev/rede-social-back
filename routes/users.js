const express = require('express')
const router = express.Router()
const User = require('../models/user')

//Todos
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)

    } catch (err) {
        res.status(500).json({ message: err.message })

    }
})
//Um

router.get('/:id', getUser, (req, res) => {
    res.json(res.user)
})

//Criar um
router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        content: req.body.content,
        image: req.body.image
    })

    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })

    }
})
//Atualizar um 
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name
    }
    if (req.body.content != null) {
        res.user.content = req.body.content
    }
    if (req.body.image != null) {
        res.user.image = req.body.image
    }

    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//Deletar um
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.remove()
        res.json({ message: 'Post apagado' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }

})
//Middleware
async function getUser(req, res, next) {
    let user
    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.stats(404).json({ message: 'Post não encontrado' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.user = user
    next()

}

module.exports = router

