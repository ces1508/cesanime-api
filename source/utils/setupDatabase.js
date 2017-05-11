require("babel-polyfill")
const connection = {
  host: process.env.HOST_DATABASE || '45.55.147.2',
  port: process.env.HOST_DATABASE || 28015,
  db: 'cesanime'
}
const r = require('rethinkdbdash')(connection)
async function setup () {
  // await r.dbCreate('cesanime')
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
      console.log(`error creating table categories: ${e.message}`)
    }
  }
  if (tableList.indexOf('episodes') === -1) {
    try {
      await r.tableCreate('episodes')
      console.log('table episodes created')
    } catch (e) {
      console.log(`error creating table episodes: ${e.message}`)
    }
  }
  console.log('creating index ...')
  try {
    await r.table('animes').indexCreate('categoryId')
    await r.table('animes').indexCreate('name')
    await r.table('episodes').indexCreate('animeId')
    await r.table('episodes').indexCreate('name')
    await r.table('animes').indexWait()
    await r.table('episodes').indexWait()
    await r.table('categories').indexWait()
  } catch (e) {
    console.log(`error ${e.message}`)
  }
}
setup()