const connection = {
  host: process.env.HOST_DATABASE || 'localhost',
  port: process.env.HOST_DATABASE || 28015,
  db: 'cesanime'
}
const r = require('rethinkdbdash')(connection)
require("babel-polyfill")
async function setup () {
  let tableList = await r.tableList()
  if (tableList.indexOf('animes') === -1) {
    try {
      await r.tableCreate('animes')
      console.log('table animes created')
    } catch (e) {
      console.log(`error creating table animes: ${err.message}`)
    }
  }
  if (tableList.indexOf('categories') === -1) {
    try {
      await r.tableCreate('categories')
      console.log('table categories created')
    } catch (e) {
      console.log(`error creating table categories: ${err.message}`)
    }
  }
  if (tableList.indexOf('episodes') === -1) {
    try {
      await r.ta('episodes')
      console.log('table episodes created')
    } catch (e) {
      console.log(`error creating table episodes: ${err.message}`)
    }
  }
  console.log('creating index ...')
  try {
    // await r.table('animes').indexCreate('categoryId')
    // await r.table('animes').indexCreate('name')
    await r.table('episodes').indexCreate('animeId')
    await r.table('episodes').indexCreate('name')
    await r.table('animes').indexWait()
    await r.table('episodes').indexWait()
    await r.table('categories').indexWait()
  } catch (e) {
    console.log(`error ${e.message}`)
  }
}
setup().then( (data) => {
  console.log(data)
})
.catch( err => {
  console.log(err.message)
})