import React, {Component} from 'react'
import api from '../../getData'
import uuid from 'uuid-base62'
import Anime from './anime'
import styles from './styles.css'
// export default function List () {
//   return (<div>
//     listado de todos los animes
//    </div>
//   )
// }

export default class List extends Component {
  constructor () {
  super()
  this.state = {animes: [], request: false}
  this.getData = this.getData.bind(this)
}

  componentWillMount () {
    this.getData()
  }

  async getData () {
    let data = await api.getListAnimes()
    this.setState({ animes: data, request: true})
  }



  render () {
    let {animes, request} = this.state
    if (request === true) {
      if (animes.length > 0 ) {
        return (
          <div className = {styles.list}>
            {animes.map((anime, index) => {
              return <Anime key = {anime.id} anime =  {anime}/>
            }
            )}
          </div>
        )
      } else {
        return <p> no hay animes que mostrar</p>
      }
    } else {
      return <p> error al cargar la data, intenta mas tarde </p>
    }
  }
}