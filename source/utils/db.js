const connection = {
  host: process.env.HOST_DATABASE || 'localhost',
  port: process.env.HOST_DATABASE || 28015,
  db: 'cesanime'
}
const  r =  require('rethinkdbdash')(connection)

export default class Db {
  async createAnime (data) {
    try {
      let getAnime = await r.table('animes').getAll(data.name, {index: 'name'}).count()
      if (getAnime < 1) {
        let anime =  await r.table('animes').insert(data)
        anime = await r.table('animes').get(anime.generated_keys[0])
        return {error: false, anime}
      }
      return {error: 'anime already exists'}
    } catch (e) {
      return {error: true, message: e.message}
    }
  }
  async getAnimes () {
    try {
      let animes = await r.table('animes').orderBy({index: 'name'})
      return animes
    } catch (e) {
      return {error:true, message: e.message}
    }
  }
  async getAnime (id) {
    try {
      let anime = await r.table('animes').get(id)
      return anime
    } catch (e) {
      return {error:true, message: e.message}
    }
  }
  async updatedAnime (id, data) {
    try {
      let anime = await r.table('animes').get(id)
      if (anime) {
         anime = await r.table('animes').get(id).update(data)
        return {error: false, changed: true}
      }
      return {error: true, message: 'anime not found'}
    } catch (e) {
      return {error:true, message: e.message}
    }
  }
  async destroyAnime (id) {
    try {
      let anime = await r.table('animes').get(id)
      if (anime) {
          anime = await r.table('animes').get(id).delete()
        return {error: false, delete: true}
      }
      return  {error: true, message: 'anime not found'}
    } catch (e) {
      return {error: true, message: e.message}
    }
  }
  async createEpisode (animeId, data) {
    try {
       let anime = await this.getAnime(animeId)
       if (anime) {
        let episode = await r.table('episodes').getAll(data.name, {index: 'name'}).count()
        if (episode > 1) {
          return {error: true, message: 'episode already in database'}
        }
        await r.table('episodes').insert(data)
        return {error: false, created: true}
      }
      return  {error: true, message: 'anime not found'}
    } catch (e) {
      return {error: true, message: e.message}
    }
  }
  async getEpisodes (animeId) {
    try {
      let anime = await this.getAnime(animeId)
      if (anime) {
        let episodes = await r.table('episodes').getAll(animeId, {index: 'animeId'}).orderBy(r.asc('number'))
        return {error: false, episodes}
       }
       return {error: true, message: 'anime not found'}
    } catch (e) {
      return {error: true, message: e.message}
    }
  }
  async getEpisode (episodeId) {
    try {
      let episode = await r.table('episodes').get(episodeId)
      return episode
    } catch (e) {
      return {error: true, message: e.message}
    }
  }
  async updateEpisode (episodeId, data) {
    try {
      let episode =  await this.getEpisode(episodeId)
      if (episode) {
        let updated = await r.table('episodes').get(episodeId).update(data)
        return {error: false, upadted: true}
      }
      return {error: true, message: 'episode not found'}
    } catch (e) {
      return {error: true, message: e.message}
    }
  }
  async deleteEpisode (episodeId) {
    try {
      let episode = await this.getEpisode(episodeId)
      if (episode) {
        await r.table('episodes').get(episode.id).delete()
        return {error: false, deleted: true}
      }
      return {error: true, message: 'episode not found'}
    } catch (e) {
      return {error: true, message: e.message}
    }
  }
  async animeVote (animeId) {
    try {
      let anime = await this.getAnime(animeId)
      if (anime) {
        await r.table('animes').get(anime.id).update({
          votes: r.row('votes').add(1)
        })
        return {error: false, voted: true}
      }
      return {error: true, message: 'anime not found'}
    } catch (e) {
      return {error: true, message: e.message}
    }
  }

  async animesPopulares () {
    try {
      let animes = await r.table('animes').orderBy(r.desc('votes')).limit(10)
      return animes
    } catch (e) {
      return {error: true, message: e.message}
    }
  }

  async filterAnime (name) {
    try {
      let animes = await r.db('cesanime').table('animes').filter(r.row('name').match(`(?i)${name}`))
      return animes
    } catch (e) {
      return {error: true, message: e.message}
    }
  }

  async getAnimesByCategories (category) {
    try {
      let animes = await r.db('cesanime').table('animes').filter(r.row("categories").contains(category))
      return animes
    } catch (e) {
      return {error: true, message: e.message}
    }
  }
}