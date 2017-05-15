class Api {
  async getListAnimes () {
    let request = await fetch('/animes', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
    })
    let response = await request.json()
    return response
  }

  async getDataAnime (id) {
    let request = await fetch(`/anime/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
    })
    let response = await request.json()
    return response
  }
}
let api = new Api()
export default api
