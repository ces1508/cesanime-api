import express from 'express'
import bodyParser from 'body-parser'
import "babel-polyfill"
import Db from './utils/db'

const port = process.env.PORT || 3000
const app = express()
const db = new Db()
app.set('views','./source/views')
app.set('view engine', 'pug')
app.use('/statics',express.static('./statics'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/admin',  (req, res) => {
  res.render('admin')
})
app.get('/animes', async (req, res) => {
  let animes = await db.getAnimes()
  res.status(200).jsonp(animes)
})
// get an ainme by id
app.get('/anime/:id', async (req, res) => {
  let anime = await db.getAnime(req.params.id)
  if (anime === null) {
    return res.status(404).json({error: 'anime not found'})
  }
  res.status(200).json(anime)
})
//create anime in the database
app.post('/anime', async (req, res,) => {
  let anime = await db.createAnime(req.body)
  res.status(201).jsonp(anime)
})
// update anime by id

app.patch('/anime/:id', async (req, res) => {
  let id = req.params.id
  let data = req.body
  let dataChange  = {}
  if (data.name) {
    dataChange.name = data.name
  }
  if (data.thumbnail) {
    dataChange.thumbnail = data.thumbnail
  }
  if (data.categoryId) {
    dataChange.categoryId = data.categoryId
  }

  let updated = await db.updatedAnime(id, dataChange)

  if (updated.error) {
    if (updated.message.match(/anime not found/g)) {
      return res.status(404).jsonp(updated)
    }
    return res.status(500).jsonp(updated)
  }
  res.status(200).jsonp(updated)
})

app.delete('/anime/:id', async (req, res) => {
  let id = req.params.id
  let deleteAnime = await db.destroyAnime(id)
  if (deleteAnime.error) {
    if (deleteAnime.message.match(/anime not found/g)) {
      return res.status(404).jsonp(deleteAnime)
    }
    return res.status(500).jsonp(deleteAnime)
  }
  res.status(200).jsonp(deleteAnime)
})

app.get('/anime/:id/capitulos', async (req, res) => {
  let animeId = req.params.id
  let episodes = await db.getEpisodes(animeId)
  if (episodes.error) {
    if (episodes.message.match(/not found/g)) {
      return res.status(404).jsonp(episodes)
    }
    return res.status(500).jsonp(episodes)
  }
  res.status(200).jsonp(episodes.episodes)
})

app.post('/anime/:id/capitulos', async (req, res) => {
  let animeId = req.params.id
  let data = req.body
  if (!data.video) {
    return res.status(400).json({error: true, message: 'debes enviar un objecto con le uri del video'})
  }
  data.animeId = animeId

  let episode = await db.createEpisode(animeId, data)
  if (episode.error) {
   episode.message.match(/not found/g)? res.status(404).jsonp(episode): null
   episode.message.match(/already/g)? res.status(400).jsonp(episode): ''
  }
  res.status(201).jsonp(episode)
})

app.patch('/anime/:id/capitulos/:episodeId', async (req, res) => {
  let episodeId = req.params.episodeId
  let data = req.body
  let newData = {}
  data.name ? newData.name = data.name: null
  data.number? newData.number = parseInt(data.number): null
  data.video ? newData.video = data.video : null
  let updated = await db.updateEpisode(episodeId, newData)
  if (updated.error) {
   updated.message.match(/not found/g)? res.status(404).jsonp(episode): null
   return res.status(500).jsonp(updated)
  }
  res.status(204).jsonp(updated)
})

app.delete('/anime/:id/capitulos/:episodeId', async (req,res) => {
  let episodeId = req.params.episodeId
  let deleted = await db.deleteEpisode(episodeId)
  if (deleted.error) {
   deleted.message.match(/not found/g)? res.status(404).jsonp(deleted): null
   return res.status(500).jsonp(deleted)
  }
  res.status(204).jsonp(deleted)
})
app.post('/anime/:id/vote', async (req, res) => {
  let animeId = req.params.id
  let voted = await db.animeVote(animeId)
  if (voted.error) {
    voted.message.match(/not found/g)? res.status(404).jsonp(voted): null
    return res.status(500).jsonp(voted)
  }
  res.status(201).jsonp(voted)
})

app.get('/animes-top', async (req, res) => {
  let animes = await db.animesPopulares()
  res.status(200).jsonp(animes)
})
app.get('/filter-anime/:anime', async (req, res) => {
  let anime = req.params.anime
  let animes = await db.filterAnime(anime)
  if (animes.error) {
    return res.status(500).jsonp(animes)
  }
  res.status(200).jsonp(animes)
})
app.get('/category/:category', async (req, res, next) => {
  let category = req.params.category
  category = category.toUpperCase()
  if (category) {
    let animes = await db.getAnimesByCategories(category)
    if (animes.error) {
      return res.status(500).jsonp(animes)
    }
    res.status(200).jsonp(animes)
  } else {
    return res.status(500).jsonp({error: 'la categoria no puede ser nulo o vacia'})
  }
})
app.listen(port, (err) => {
  if (err) {
    console.log(err.message)
    exit(1)
  }
})