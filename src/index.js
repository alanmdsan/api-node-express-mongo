const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())
const port = 3000

const Film = mongoose.model('Film', {
    title: String,
    description: String,
    image_url: String,
    trailer_url: String,
    imdb_rate: Number
});

app.get('/', async(req, res) => {
    const films = await Film.find()
    return res.send(films)
})

app.delete('/:id', async(req, res) => {
    const film = await Film.findByIdAndDelete(req.params.id)
    return res.send(film)
})

app.put('/:id', async(req, res) => {
    const film = await Film.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url,
        imdb_rate: req.body.imdb_rate
    }, {
        new: true
    })
    return res.send(film)
})

app.post('/', async(req, res) => {
    const film = new Film({
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url,
        imdb_rate: req.body.imdb_rate
    })
    await film.save()
    return res.send(film)
})

app.listen(port, () => {
    mongoose.connect('mongodb+srv://shawwhip:vxNU9Ktiuyht7wYw@ams-api-node-express-mo.1or1jdz.mongodb.net/?retryWrites=true&w=majority')
    console.log(`app listening on port ${port}`)
})