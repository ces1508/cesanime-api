import React, {Component} from 'react'
import api from '@/getData'
import Form from '@/components/form'
export default class EditAnimeView extends Component {
  constructor (props) {
    super(props)
    this.getAnime = this.getAnime.bind(this)
    this.state = {anime: null}
  }

  componentWillMount () {
    this.getAnime()
  }
  async getAnime () {
    let {id} = this.props.match.params
    let anime = await api.getDataAnime(id)
    this.setState({ anime: anime })
  }
  render () {
    let { anime } = this.state
   return (
     <div>
      {anime?
        <Form  anime = {this.state.anime}/>
        : null
      }
     </div>
   )
  }
}